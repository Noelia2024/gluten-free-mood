import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../fireStore.config';

const CART_STORAGE_KEY = 'gluten-free-mood:cart';

// Testigo ÚNICO de conversión de Precio (string | number → number; NaN → 0).
// Los consumidores nunca castean: usan lineTotal() para subtotales y totales.
// Firma intacta: sigue leyendo item.Precio, que ahora es el precio EN VIVO que
// inyecta la resolución de items, nunca un precio congelado en localStorage.
export const lineTotal = (item) => {
  const n = Number(item.Precio);
  return Number.isFinite(n) ? n * item.qty : 0;
};

// Migración de carritos ya persistidos. Se RECONSTRUYE el item con una lista
// blanca de campos en vez de borrar claves: así ningún Precio guardado por una
// versión anterior sobrevive a este fix, aunque se guardara con otro nombre.
const sanitizarItem = (item) => ({
  id: item.id,
  qty: item.qty,
  Nombre: item.Nombre,
  Imagen: item.Imagen,
});

// Lectura inicial: payload ausente o corrupto → carrito vacío.
const leerCarritoGuardado = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((i) => i && typeof i === 'object' && i.id).map(sanitizarItem);
  } catch {
    return [];
  }
};

export const CartContext = createContext({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  productos: [],
  catalogoCargando: true,
  catalogoError: false,
  addItem: () => {},
  increment: () => {},
  decrement: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  // Estado PERSISTIDO: solo {id, qty, Nombre, Imagen}. El precio no entra acá,
  // es un valor derivado y se resuelve contra Firestore en cada render.
  const [itemsGuardados, setItemsGuardados] = useState(leerCarritoGuardado);

  // Catálogo vivo: única fuente de precio de la app. Products.jsx consume esto
  // en lugar de su propio getDocs, así catálogo y carrito no pueden discrepar.
  const [productos, setProductos] = useState([]);
  const [catalogoCargando, setCatalogoCargando] = useState(true);
  const [catalogoError, setCatalogoError] = useState(false);

  // Camino único de fallo: lo usan tanto el error asíncrono de onSnapshot como
  // el throw sincrónico al montar el listener. Sin catálogo no hay precio
  // confiable, así que se vacía y se marca el error, pero el carrito sigue
  // utilizable en memoria: nunca queda una UI atada sin explicación.
  const registrarErrorCatalogo = useCallback((error) => {
    console.error('Error al escuchar productos:', error);
    setProductos([]);
    setCatalogoCargando(false);
    setCatalogoError(error?.message || 'No se pudo cargar el catálogo');
  }, []);

  useEffect(() => {
    try {
      // onSnapshot devuelve el unsubscribe: se devuelve desde el efecto para
      // que el listener muera al desmontar (o en el doble-mount de StrictMode).
      return onSnapshot(
        collection(db, 'Productos'),
        (snapshot) => {
          setProductos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setCatalogoCargando(false);
          setCatalogoError(false);
        },
        registrarErrorCatalogo
      );
    } catch (error) {
      // El listener nunca llegó a activarse, así que no existe evento síncrono
      // que reportar: el aviso se emite en el canal asíncrono, igual que los
      // callbacks de onSnapshot, y no en el cuerpo del efecto.
      queueMicrotask(() => registrarErrorCatalogo(error));
      return undefined;
    }
  }, [registrarErrorCatalogo]);

  // Persistencia en cada mutación: se escribe la forma guardada, nunca la resuelta.
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itemsGuardados));
    } catch {
      // Cuota/privacidad: el carrito sigue vivo en memoria
    }
  }, [itemsGuardados]);

  // Catálogo indexado por id para resolver cada línea del carrito en O(1).
  const catalogoPorId = useMemo(() => {
    const mapa = new Map();
    for (const prod of productos) mapa.set(prod.id, prod);
    return mapa;
  }, [productos]);

  // items RESUELTOS = item guardado + datos EN VIVO del catálogo.
  // available=false → el documento ya no existe en Firestore: no se cobra.
  const items = useMemo(
    () =>
      itemsGuardados.map((item) => {
        const doc = catalogoPorId.get(item.id);
        if (!doc) return { ...item, Precio: null, available: false };
        return {
          ...item,
          Nombre: doc.Nombre ?? item.Nombre,
          Imagen: doc.Imagen ?? item.Imagen,
          Precio: doc.Precio,
          available: true,
        };
      }),
    [itemsGuardados, catalogoPorId]
  );

  // Snapshot {id, Nombre, Imagen, qty}: id existente → refresca los datos de
  // display y suma 1 a qty. Ya NO se sobrescribe el precio al agregar: el
  // precio viene del catálogo vivo, no hace falta congelarlo acá.
  const addItem = useCallback((prod) => {
    if (!prod || !prod.id) return;
    setItemsGuardados((prev) => {
      const existing = prev.find((i) => i.id === prod.id);
      if (existing) {
        return prev.map((i) =>
          i.id === prod.id
            ? {
                ...i,
                Nombre: prod.Nombre ?? i.Nombre,
                Imagen: prod.Imagen ?? i.Imagen,
                qty: i.qty + 1,
              }
            : i
        );
      }
      return [
        ...prev,
        {
          id: prod.id,
          Nombre: prod.Nombre,
          Imagen: prod.Imagen,
          qty: 1,
        },
      ];
    });
  }, []);

  const increment = useCallback((id) => {
    setItemsGuardados((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  }, []);

  // Mínimo 1: nunca baja de 1 ni elimina la línea
  const decrement = useCallback((id) => {
    setItemsGuardados((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));
  }, []);

  const removeItem = useCallback((id) => {
    setItemsGuardados((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItemsGuardados([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((acc, i) => acc + i.qty, 0),
      // Solo se cobra lo que está disponible: un producto borrado de Firestore
      // nunca puede entrar al total.
      totalPrice: items.reduce((acc, i) => (i.available ? acc + lineTotal(i) : acc), 0),
      productos,
      catalogoCargando,
      catalogoError,
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
    }),
    [
      items,
      productos,
      catalogoCargando,
      catalogoError,
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);