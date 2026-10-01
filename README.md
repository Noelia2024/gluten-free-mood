<div align="center">

# ðŸŒ¾ Gluten-Free-Mood

**PanaderÃ­a artesanal, segura y 100% libre de gluten.**

E-commerce en React para una panaderÃ­a sin gluten. CatÃ¡logo y carrito conectados a Firestore,
carrito persistido en el navegador y diseÃ±o con paleta de marca propia en modo claro y oscuro.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![MUI](https://img.shields.io/badge/MUI-7.3-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com)
[![Firebase](https://img.shields.io/badge/Firebase-12.18-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![React%20Router](https://img.shields.io/badge/React_Router-7.15-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## ðŸ“‹ Ãndice

- [Stack](#-stack)
- [Requisitos](#-requisitos)
- [Puesta en marcha](#-puesta-en-marcha)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Rutas](#-rutas)
- [Modelo de datos en Firestore](#-modelo-de-datos-en-firestore)
- [Persistencia del carrito](#-persistencia-del-carrito)
- [Tema y tokens de diseÃ±o](#-tema-y-tokens-de-diseÃ±o)
- [Despliegue en Vercel](#-despliegue-en-vercel)
- [Flujo de trabajo con Git](#-flujo-de-trabajo-con-git)
- [Deuda tÃ©cnica conocida](#-deuda-tÃ©cnica-conocida)

---

## ðŸ§± Stack

| Capa | TecnologÃ­a | VersiÃ³n |
| --- | --- | --- |
| UI | React / React DOM | `^19.2.6` |
| Build | Vite | `^8.0.12` |
| Estilos | MUI + Emotion | `^7.3.11` / `^11.14` |
| Routing | React Router | `^7.15.1` |
| Datos | Firebase / Firestore | `^12.18.0` |
| Deploy | Vercel | â€” |

> **Nota:** el `name` en `package.json` es `e-commere-gluten-free-mood`. La errata estÃ¡ en el nombre
> real del paquete y no afecta al build. No lo cambies sin motivo: `package.json` no es copy del sitio.

---

## âš™ï¸ Requisitos

- **Node.js** 20.19 o superior
- **pnpm** 11 o superior â€” este proyecto usa pnpm, no npm
- Un proyecto de **Firebase** con Firestore habilitado

> El package manager estÃ¡ fijado en `package.json` con `"packageManager": "pnpm@11.3.0"`, asÃ­ que
> Corepack y Vercel lo detectan solos. El lockfile es **`pnpm-lock.yaml`** y estÃ¡ commiteado: las
> versiones exactas son reproducibles. Con npm no hay guarantee de resolver lo mismo.

---

## ðŸš€ Puesta en marcha

```bash
# clonar
git clone https://github.com/Noelia2024/gluten-free-mood.git
cd gluten-free-mood

# instalar dependencias (usa el lockfile, no los rangos)
pnpm install

# crear el archivo de variables de entorno
cp .env.example .env      # en Windows: copy .env.example .env

# completar VITE_FIREBASE_* con los datos de tu proyecto Firebase

# levantar el servidor de desarrollo
pnpm dev
```

La app queda disponible en `http://localhost:5173`.

> âš ï¸ **No uses `npm install`.** Resuelve versiones distintas a las del lockfile porque todos los
> rangos de `package.json` son `^`. Para forzar las versiones exactas en un clon nuevo:
> `pnpm install --frozen-lockfile`.

---

## ðŸ” Variables de entorno

Todas se leen desde `src/fireStore.config.js` y desde el footer. Vite **hornea** estos valores dentro
del bundle en tiempo de build.

| Variable | Para quÃ© se usa |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Clave de la API de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de autenticaciÃ³n |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de almacenamiento |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID de mensajerÃ­a |
| `VITE_FIREBASE_APP_ID` | ID de la app web |
| `VITE_WHATSAPP_NUMBER` | NÃºmero de WhatsApp del footer. **Si falta, el botÃ³n de contacto queda deshabilitado y se muestra un aviso.** |

> âš ï¸ **Falla silenciosa.** Si estas variables no existen en el entorno donde se construye, **el build
> termina bien** y la app se despliega, pero con `undefined` en esos campos. El sÃ­ntoma es
> `/productos` quedÃ¡ndose en *"Cargando productos..."* para siempre, sin error visible en consola.
> VerificÃ¡ siempre que existan en el entorno de producciÃ³n **antes** de mergear.

---

## ðŸ“œ Scripts disponibles

| Comando | QuÃ© hace |
| --- | --- |
| `pnpm dev` | Levanta el servidor de desarrollo con HMR |
| `pnpm build` | Compila a `dist/` |
| `pnpm lint` | Corre ESLint sobre todo el proyecto |
| `pnpm preview` | Sirve localmente el resultado de `build` |

No hay runner de tests configurado. La verificaciÃ³n hoy es `lint` + `build` + revisiÃ³n visual.

---

## ðŸ“ Estructura del proyecto

```
src/
â”œâ”€â”€ main.jsx                    # Punto de entrada. Monta los providers y el router
â”œâ”€â”€ App.jsx                     # Solo delega en Router
â”œâ”€â”€ fireStore.config.js         # Inicializa Firebase y exporta la instancia de Firestore
â”‚
â”œâ”€â”€ routes/
â”‚   â””â”€â”€ Router.jsx              # Mapa de rutas de la aplicaciÃ³n
â”‚
â”œâ”€â”€ views/                      # PÃ¡ginas, una por ruta
â”‚   â”œâ”€â”€ Home.jsx                # Hero + secciones del inicio
â”‚   â”œâ”€â”€ Products.jsx            # CatÃ¡logo. Ãšnica vista que lee de Firestore
â”‚   â””â”€â”€ Cart.jsx                # Carrito
â”‚
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ Layout.jsx              # Header + Outlet + Footer
â”‚   â”œâ”€â”€ Header.jsx              # Barra de navegaciÃ³n + toggle de tema
â”‚   â”œâ”€â”€ Hero.jsx                # Cabecera de la home
â”‚   â”œâ”€â”€ Footer.jsx              # Pie con datos de contacto
â”‚   â””â”€â”€ NotFound.jsx            # Ruta 404
â”‚
â”œâ”€â”€ context/
â”‚   â”œâ”€â”€ ThemeContext.jsx        # Paleta de marca y tipografÃ­a (MUI)
â”‚   â””â”€â”€ CartContext.jsx         # Estado y persistencia del carrito
â”‚
â””â”€â”€ assets/
    â”œâ”€â”€ hero-pan-cutout.webp    # Foto del hero, recorte con alfa
    â””â”€â”€ logo-header.jpg         # Logo de la barra de navegaciÃ³n
```

`public/` contiene los Ã­conos estÃ¡ticos: `favicon.svg` e `icons.svg`.

---

## ðŸ—ºï¸ Rutas

| Ruta | Componente | QuÃ© muestra |
| --- | --- | --- |
| `/` | `Home` | Hero y contenido del inicio |
| `/productos` | `Products` | CatÃ¡logo leÃ­do de Firestore |
| `/carrito` | `Cart` | Contenido del carrito |
| `*` | `NotFound` | 404 |

Todas las rutas cuelgan de `Layout`. Los imports son **directos, no `React.lazy`**.

> â„¹ï¸ No existe una vista de detalle de producto. Cualquier URL bajo `/producto/...` cae en el `NotFound`.
> Cuando se implemente, hay que registrar la ruta **y** volver clicable la tarjeta del catÃ¡logo: registrar
> la ruta sola no la hace alcanzable.

---

## ðŸ”¥ Modelo de datos en Firestore

### ColecciÃ³n

Una Ãºnica colecciÃ³n: **`Productos`** (con P mayÃºscula).

Se lee en `src/views/Products.jsx` con `getDocs`. **La aplicaciÃ³n nunca escribe en Firestore**: no hay
`addDoc`, `setDoc`, `updateDoc` ni `deleteDoc` en el proyecto. El alta y la ediciÃ³n de productos se
hacen desde la consola de Firebase.

### Campos

| Campo | Tipo | Obligatorio | DÃ³nde se usa |
| --- | --- | --- | --- |
| `Nombre` | string | No | `Products.jsx` â€” tÃ­tulo de la tarjeta. Si falta, muestra *"Producto sin nombre"* |
| `Precio` | number \| string | No | `Products.jsx` â€” precio visible. La tarjeta lo oculta si es falsy |
| `Imagen` | string (URL) | No | `Products.jsx` â€” imagen de la tarjeta. Si falla la carga, se oculta el `img` |

El `id` del documento **no** es un campo: es el identificador de Firestore y se agrega al objeto al mapear.

> ðŸ’¡ `Precio` admite nÃºmero o string. El carrito normaliza con `Number(item.Precio)` en un Ãºnico punto
> (`lineTotal` en `CartContext.jsx`); si el valor no es convertible, la lÃ­nea vale `0` en vez de romper.

### Ejemplo de documento

```json
{
  "Nombre": "Pan de Familiar",
  "Precio": 3500,
  "Imagen": "https://firebasestorage.googleapis.com/..."
}
```

> âš ï¸ Los nombres de campo son **capitalizados y en espaÃ±ol**. Son las claves que lee el cÃ³digo, no
> etiquetas de una interfaz. Renombrarlas rompe la vista sin avisar.

---

## ðŸ›’ Persistencia del carrito

El carrito **no vive en Firestore**. Se guarda en `localStorage` bajo la clave:

```
gluten-free-mood:cart
```

Cada lÃ­nea guarda un snapshot `{ id, Nombre, Precio, Imagen, qty }`. Si el producto ya estÃ¡ en el
carrito, agregar de nuevo **sobrescribe los datos frescos del catÃ¡logo** y suma `qty`. Es decir: si
cambiaste un precio en Firebase, el carrito existente se actualiza la prÃ³xima vez que el cliente
vuelva a agregar ese producto.

**No renombres esta clave** salvo que quieras invalidar todos los carritos guardados. Quien tenga el
sitio en una pestaÃ±a abierta perderÃ­a su carrito.

---

## ðŸŽ¨ Tema y tokens de diseÃ±o

La paleta estÃ¡ centralizada en `src/context/ThemeContext.jsx`. **UsÃ¡ los tokens, no literales de color.**

### Modo claro â˜€ï¸

| Token | Valor |
| --- | --- |
| `primary.main` | `deepOrange[400]` â€” `#FF7043` |
| `primary.contrastText` | `blueGrey[900]` |
| `secondary.main` | `deepOrange[900]` |
| `background.default` | `deepOrange[200]` |
| `text.primary` | `blueGrey[900]` |
| `text.secondary` | `blueGrey[700]` |

### Modo oscuro ðŸŒ™

| Token | Valor |
| --- | --- |
| `primary.main` | `deepOrange[300]` â€” `#FF8A65` |
| `primary.contrastText` | `blueGrey[900]` |
| `secondary.main` | `deepOrange[400]` |
| `background.default` | `#121212` |
| `background.paper` | `#1e1e1e` |
| `text.primary` | `grey[50]` |
| `text.secondary` | `blueGrey[200]` |

### TipografÃ­a

- **Signika** â€” cuerpo de texto
- **Amaranth** â€” display, solo para `h1` y `h2`, pesos 400 y 700

Se cargan desde `index.html` con `preconnect` a Google Fonts. Solo las dos familias que el tema usa.

### Contraste

Los valores de `contrastText` no son decorativos: estÃ¡n calculados para cumplir WCAG AA.

- `blueGrey[900]` sobre `deepOrange[400]` â†’ **4.79:1** âœ…
- `common.white` sobre `deepOrange[400]` â†’ **2.74:1** âŒ falla AA

Si alguna vez necesitÃ¡s texto sobre `primary.main`, usÃ¡ `primary.contrastText`. **No uses `common.white`.**

---

## ðŸš€ Despliegue en Vercel

### 1. `vercel.json`

Sin este archivo, recargar `/productos` o `/carrito` devuelve **404**, porque la app es una SPA y
todas las rutas tienen que resolver a `index.html`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 2. Variables de entorno

En **Settings â†’ Environment Variables**, cargÃ¡ las siete de la
[secciÃ³n de arriba](#-variables-de-entorno). MarcÃ¡ **Production**, **Preview** y **Development**
para que los previews de PR tambiÃ©n funcionen.

### 3. Rama de producciÃ³n

Vercel construye la rama de producciÃ³n en cada push. apuntala a **`main`**.

### Checklist antes de mergear

- [ ] Las siete variables existen en el entorno de producciÃ³n
- [ ] `vercel.json` estÃ¡ commiteado
- [ ] El build local pasÃ³: `pnpm lint && pnpm build`

---

## ðŸŒ¿ Flujo de trabajo con Git

Proyecto de **una sola persona**. Flujo simplificado, sin rama `develop`:

```
main â—„â”€â”€ PR â—„â”€â”€ rama-de-feature/*
```

1. CreÃ¡s una rama con prefijo `feature/` o `fix/`
2. CommiteÃ¡s por trabajounits con mensajes [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
3. AbrÃ­s un PR contra **`main`** desde el navegador
4. MergeÃ¡s

**Los PRs se abren contra `main`, nunca contra la rama base.** GitHub ofrece `main` por defecto porque
es la rama por defecto del repo: revisÃ¡ el campo *base* antes de crear el PR.

> **Por quÃ© no hay `develop`.** Ese paso viene del modelo git-flow y existe para equipos: varias personas,
> varias ramas en vuelo, y la necesidad de que nadie escriba directo en producciÃ³n. En un proyecto de
> una persona no aporta nada y agrega un paso manual que puede olvidarse sin que nada avise.
> Si el proyecto crece y aparece un segundoendedor, tiene sentido volver a evaluarlo.

---

## ðŸ§¹ Deuda tÃ©cnica conocida

| # | QuÃ© | DÃ³nde |
| --- | --- | --- |
| 1 | **5 errores de ESLint** en baseline (`react-refresh/only-export-components`) | Todo el proyecto |
| 2 | **Dependencias muertas:** `axios` y `sweetalert2` estÃ¡n instaladas pero no se usan en ningÃºn archivo | `package.json` |
| 3 | **Ãconos muertos:** `react.svg` y `vite.svg` quedaron del template | `src/assets/` |
| 4 | **Sin tests.** No hay runner configurado | â€” |
| 5 | `console.error` sin retire | `src/views/Products.jsx` |
| 6 | **Las tarjetas del catÃ¡logo no son clicables.** No hay vista de detalle todavÃ­a | `src/views/Products.jsx` |

---

<div align="center">

**Hecho con â˜• por [Noelia Lucero](https://github.com/Noelia2024)**

</div>