import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';

const CART_STORAGE_KEY = 'gluten-free-mood:cart';

// Testigo ÚNICO de conversión de Precio (string | number → number; NaN → 0).
// Los consumidores nunca castean: usan lineTotal() para subtotales y totales.
export const lineTotal = (item) => {
  const n = Number(item.Precio);
  return Number.isFinite(n) ? n * item.qty : 0;
};

export const CartContext = createContext({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: () => {},
  increment: () => {},
  decrement: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  // Init lazy desde localStorage: payload ausente o corrupto → carrito vacío
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistencia en cada mutación
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Cuota/privacidad: el carrito sigue vivo en memoria
    }
  }, [items]);

  // Snapshot {id, Nombre, Precio, Imagen, qty} con refresh-on-add:
  // id existente → sobrescribe datos frescos del catálogo y suma 1 a qty
  const addItem = useCallback((prod) => {
    if (!prod || !prod.id) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === prod.id);
      if (existing) {
        return prev.map((i) =>
          i.id === prod.id
            ? {
                ...i,
                Nombre: prod.Nombre,
                Precio: prod.Precio,
                Imagen: prod.Imagen,
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
          Precio: prod.Precio,
          Imagen: prod.Imagen,
          qty: 1,
        },
      ];
    });
  }, []);

  const increment = useCallback((id) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  }, []);

  // Mínimo 1: nunca baja de 1 ni elimina la línea
  const decrement = useCallback((id) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((acc, i) => acc + i.qty, 0),
      totalPrice: items.reduce((acc, i) => acc + lineTotal(i), 0),
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
    }),
    [items, addItem, increment, decrement, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);