# Cart: precios en vivo desde Firestore

## Objetivo

Que el carrito nunca pueda mostrar ni cobrar un precio viejo. El precio se resuelve
siempre contra Firestore en el momento de renderizar, no desde una copia congelada
en `localStorage`.

## Problema

`CartContext.addItem` copia el precio del producto dentro del item del carrito y lo
persiste en `localStorage` (`gluten-free-mood:cart`). Ese snapshot es la única fuente
de precio para el carrito.

Consecuencia: si se sube un precio en Firebase, cualquier cliente que ya tenga ese
producto en el carrito sigue viendo y pagando el precio anterior, indefinidamente,
porque el carrito es persistente.

El impacto comercial es directo: `Cart.jsx` arma el mensaje de WhatsApp con
`lineTotal(i)` y `totalPrice` (`Cart.jsx:33`, `Cart.jsx:35`). El precio viejo no solo
se muestra en pantalla — llega al mensaje que recibe la vendedora y se puede cobrar de menos.

## Decisión de diseño

Escucha en vivo con `onSnapshot` a la colección `Productos`, no consulta única.

Motivo: la vendedora cambia precios seguido y vende por WhatsApp. Con escucha en vivo,
el carrito del cliente se actualiza en el momento y el precio viejo deja de ser posible
por construcción. Una colección de 5-20 documentos no genera costo relevante.

Fuente única de verdad: `CartProvider` (montado en `main.jsx:14`, raíz de la app, vivo
durante toda la sesión) es el único que lee productos. `Products.jsx` deja de hacer su
propio `getDocs` y consume el catálogo del contexto. Así el catálogo y el carrito nunca
pueden discrepar.

## Tasks

- [ ] **T1** — `CartContext.jsx`:_owned listener `onSnapshot` a `Productos`, construir
      mapa `id -> producto`. Guardar en `localStorage` solo `{id, qty, Nombre, Imagen}`.
      Exponer `items` resueltos (snapshot + `Precio` del catálogo + flag `available`).
      `lineTotal` mantiene su firma actual.
- [ ] **T2** — `CartContext.jsx`: migrar carritos ya persistidos. Al leer de
      `localStorage`, descartar cualquier `Precio` guardado, para que un carrito con
      precio viejo no sobreviva al fix.
- [ ] **T3** — `Cart.jsx`: manejar producto no disponible. Si el `id` ya no existe en
      Firestore, marcar la línea, excluirla del total y bloquear el checkout indicando
      que hay que quitarla. No bajo-cobrar en silencio.
- [ ] **T4** — `Products.jsx`: consumir el catálogo desde el contexto en lugar de su
      propio `getDocs`. Elimina la lectura duplicada a Firestore.

## Fuera de alcance

- No cambiar la collection ni los nombres de campo (`Productos`, `Nombre`, `Precio`, `Imagen`).
- No agregar suite de tests: el proyecto no tiene runner configurado.
- No tocar `Header.jsx` (solo usa `totalItems`, no precio).

## Criterios de aceptacion

1. El carrito no persiste `Precio` en `localStorage`.
2. Un carrito existente con `Precio` guardado deja de usarlo tras cargar la app.
3. Cambiar `Precio` en Firestore actualiza el carrito abierto, sin recargar.
4. `lineTotal` y `totalPrice` siguen funcionando con la misma firma.
5. Un producto borrado de Firestore no se cobra: se avisa y se bloquea el checkout.
6. La UI sigue mostrando el precio en catálogo, carrito y mensaje de WhatsApp.

## Verificacion

- `pnpm lint` debe pasar sin errores ni warnings nuevos.
- Readback estructural: confirmar que `Precio` no aparece en la escritura a `localStorage`
  y que `onSnapshot` está montado.
- **No ejecutar build** (regla del proyecto: nunca buildear despues de cambios).

## Notas

- Comentarios y copy en español, igual que el resto del código del proyecto.
- `VITE_WHATSAPP_NUMBER` sigue siendo la unica fuente del numero de WhatsApp
  (`Cart.jsx:24`), nunca hardcodeado.
