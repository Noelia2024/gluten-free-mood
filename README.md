<div align="center">

# 🌾 Gluten-Free-Mood

**Panadería artesanal, segura y 100% libre de gluten.**

E-commerce en React para una panadería sin gluten. Catálogo y carrito conectados a Firestore,
carrito persistido en el navegador y diseño con paleta de marca propia en modo claro y oscuro.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![MUI](https://img.shields.io/badge/MUI-7.3-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com)
[![Firebase](https://img.shields.io/badge/Firebase-12.18-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![React%20Router](https://img.shields.io/badge/React_Router-7.15-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## 📋 Índice

- [Stack](#-stack)
- [Requisitos](#-requisitos)
- [Puesta en marcha](#-puesta-en-marcha)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Rutas](#-rutas)
- [Modelo de datos en Firestore](#-modelo-de-datos-en-firestore)
- [Persistencia del carrito](#-persistencia-del-carrito)
- [Tema y tokens de diseño](#-tema-y-tokens-de-diseño)
- [Despliegue en Vercel](#-despliegue-en-vercel)
- [Flujo de trabajo con Git](#-flujo-de-trabajo-con-git)
- [Deuda técnica conocida](#-deuda-técnica-conocida)

---

## 🧱 Stack

| Capa | Tecnología | Versión |
| --- | --- | --- |
| UI | React / React DOM | `^19.2.6` |
| Build | Vite | `^8.0.12` |
| Estilos | MUI + Emotion | `^7.3.11` / `^11.14` |
| Routing | React Router | `^7.15.1` |
| Datos | Firebase / Firestore | `^12.18.0` |
| Deploy | Vercel | — |

> **Nota:** el `name` en `package.json` es `e-commere-gluten-free-mood`. La errata está en el nombre
> real del paquete y no afecta al build. No lo cambies sin motivo: `package.json` no es copy del sitio.

---

## ⚙️ Requisitos

- **Node.js** 20 o superior
- **npm** 10 o superior
- Un proyecto de **Firebase** con Firestore habilitado

---

## 🚀 Puesta en marcha

```bash
# clonar
git clone https://github.com/Noelia2024/gluten-free-mood.git
cd gluten-free-mood

# instalar dependencias
npm install

# crear el archivo de variables de entorno
cp .env.example .env      # en Windows: copy .env.example .env

# completar VITE_FIREBASE_* con los datos de tu proyecto Firebase

# levantar el servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

---

## 🔐 Variables de entorno

Todas se leen desde `src/fireStore.config.js` y desde el footer. Vite **hornea** estos valores dentro
del bundle en tiempo de build.

| Variable | Para qué se usa |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Clave de la API de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de autenticación |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de almacenamiento |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID de mensajería |
| `VITE_FIREBASE_APP_ID` | ID de la app web |
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp del footer. **Si falta, el botón de contacto queda deshabilitado y se muestra un aviso.** |

> ⚠️ **Falla silenciosa.** Si estas variables no existen en el entorno donde se construye, **el build
> termina bien** y la app se despliega, pero con `undefined` en esos campos. El síntoma es
> `/productos` quedándose en *"Cargando productos..."* para siempre, sin error visible en consola.
> Verificá siempre que existan en el entorno de producción **antes** de mergear.

---

## 📜 Scripts disponibles

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Levanta el servidor de desarrollo con HMR |
| `npm run build` | Compila a `dist/` |
| `npm run lint` | Corre ESLint sobre todo el proyecto |
| `npm run preview` | Sirve localmente el resultado de `build` |

No hay runner de tests configurado. La verificación hoy es `lint` + `build` + revisión visual.

---

## 📁 Estructura del proyecto

```
src/
├── main.jsx                    # Punto de entrada. Monta los providers y el router
├── App.jsx                     # Solo delega en Router
├── fireStore.config.js         # Inicializa Firebase y exporta la instancia de Firestore
│
├── routes/
│   └── Router.jsx              # Mapa de rutas de la aplicación
│
├── views/                      # Páginas, una por ruta
│   ├── Home.jsx                # Hero + secciones del inicio
│   ├── Products.jsx            # Catálogo. Única vista que lee de Firestore
│   └── Cart.jsx                # Carrito
│
├── components/
│   ├── Layout.jsx              # Header + Outlet + Footer
│   ├── Header.jsx              # Barra de navegación + toggle de tema
│   ├── Hero.jsx                # Cabecera de la home
│   ├── Footer.jsx              # Pie con datos de contacto
│   └── NotFound.jsx            # Ruta 404
│
├── context/
│   ├── ThemeContext.jsx        # Paleta de marca y tipografía (MUI)
│   └── CartContext.jsx         # Estado y persistencia del carrito
│
└── assets/
    ├── hero-pan-cutout.webp    # Foto del hero, recorte con alfa
    └── logo-header.jpg         # Logo de la barra de navegación
```

`public/` contiene los íconos estáticos: `favicon.svg` e `icons.svg`.

---

## 🗺️ Rutas

| Ruta | Componente | Qué muestra |
| --- | --- | --- |
| `/` | `Home` | Hero y contenido del inicio |
| `/productos` | `Products` | Catálogo leído de Firestore |
| `/carrito` | `Cart` | Contenido del carrito |
| `*` | `NotFound` | 404 |

Todas las rutas cuelgan de `Layout`. Los imports son **directos, no `React.lazy`**.

> ℹ️ No existe una vista de detalle de producto. Cualquier URL bajo `/producto/...` cae en el `NotFound`.
> Cuando se implemente, hay que registrar la ruta **y** volver clicable la tarjeta del catálogo: registrar
> la ruta sola no la hace alcanzable.

---

## 🔥 Modelo de datos en Firestore

### Colección

Una única colección: **`Productos`** (con P mayúscula).

Se lee en `src/views/Products.jsx` con `getDocs`. **La aplicación nunca escribe en Firestore**: no hay
`addDoc`, `setDoc`, `updateDoc` ni `deleteDoc` en el proyecto. El alta y la edición de productos se
hacen desde la consola de Firebase.

### Campos

| Campo | Tipo | Obligatorio | Dónde se usa |
| --- | --- | --- | --- |
| `Nombre` | string | No | `Products.jsx` — título de la tarjeta. Si falta, muestra *"Producto sin nombre"* |
| `Precio` | number \| string | No | `Products.jsx` — precio visible. La tarjeta lo oculta si es falsy |
| `Imagen` | string (URL) | No | `Products.jsx` — imagen de la tarjeta. Si falla la carga, se oculta el `img` |

El `id` del documento **no** es un campo: es el identificador de Firestore y se agrega al objeto al mapear.

> 💡 `Precio` admite número o string. El carrito normaliza con `Number(item.Precio)` en un único punto
> (`lineTotal` en `CartContext.jsx`); si el valor no es convertible, la línea vale `0` en vez de romper.

### Ejemplo de documento

```json
{
  "Nombre": "Pan de Familiar",
  "Precio": 3500,
  "Imagen": "https://firebasestorage.googleapis.com/..."
}
```

> ⚠️ Los nombres de campo son **capitalizados y en español**. Son las claves que lee el código, no
> etiquetas de una interfaz. Renombrarlas rompe la vista sin avisar.

---

## 🛒 Persistencia del carrito

El carrito **no vive en Firestore**. Se guarda en `localStorage` bajo la clave:

```
gluten-free-mood:cart
```

Cada línea guarda un snapshot `{ id, Nombre, Precio, Imagen, qty }`. Si el producto ya está en el
carrito, agregar de nuevo **sobrescribe los datos frescos del catálogo** y suma `qty`. Es decir: si
cambiaste un precio en Firebase, el carrito existente se actualiza la próxima vez que el cliente
vuelva a agregar ese producto.

**No renombres esta clave** salvo que quieras invalidar todos los carritos guardados. Quien tenga el
sitio en una pestaña abierta perdería su carrito.

---

## 🎨 Tema y tokens de diseño

La paleta está centralizada en `src/context/ThemeContext.jsx`. **Usá los tokens, no literales de color.**

### Modo claro ☀️

| Token | Valor |
| --- | --- |
| `primary.main` | `deepOrange[400]` — `#FF7043` |
| `primary.contrastText` | `blueGrey[900]` |
| `secondary.main` | `deepOrange[900]` |
| `background.default` | `deepOrange[200]` |
| `text.primary` | `blueGrey[900]` |
| `text.secondary` | `blueGrey[700]` |

### Modo oscuro 🌙

| Token | Valor |
| --- | --- |
| `primary.main` | `deepOrange[300]` — `#FF8A65` |
| `primary.contrastText` | `blueGrey[900]` |
| `secondary.main` | `deepOrange[400]` |
| `background.default` | `#121212` |
| `background.paper` | `#1e1e1e` |
| `text.primary` | `grey[50]` |
| `text.secondary` | `blueGrey[200]` |

### Tipografía

- **Signika** — cuerpo de texto
- **Amaranth** — display, solo para `h1` y `h2`, pesos 400 y 700

Se cargan desde `index.html` con `preconnect` a Google Fonts. Solo las dos familias que el tema usa.

### Contraste

Los valores de `contrastText` no son decorativos: están calculados para cumplir WCAG AA.

- `blueGrey[900]` sobre `deepOrange[400]` → **4.79:1** ✅
- `common.white` sobre `deepOrange[400]` → **2.74:1** ❌ falla AA

Si alguna vez necesitás texto sobre `primary.main`, usá `primary.contrastText`. **No uses `common.white`.**

---

## 🚀 Despliegue en Vercel

### 1. `vercel.json`

Sin este archivo, recargar `/productos` o `/carrito` devuelve **404**, porque la app es una SPA y
todas las rutas tienen que resolver a `index.html`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 2. Variables de entorno

En **Settings → Environment Variables**, cargá las siete de la
[sección de arriba](#-variables-de-entorno). Marcá **Production**, **Preview** y **Development**
para que los previews de PR también funcionen.

### 3. Rama de producción

Vercel construye la rama de producción en cada push. apuntala a **`main`**.

### Checklist antes de mergear

- [ ] Las siete variables existen en el entorno de producción
- [ ] `vercel.json` está commiteado
- [ ] El build local pasó: `npm run lint && npm run build`

---

## 🌿 Flujo de trabajo con Git

Proyecto de **una sola persona**. Flujo simplificado, sin rama `develop`:

```
main ◄── PR ◄── rama-de-feature/*
```

1. Creás una rama con prefijo `feature/` o `fix/`
2. Commiteás por trabajounits con mensajes [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
3. Abrís un PR contra **`main`** desde el navegador
4. Mergeás

**Los PRs se abren contra `main`, nunca contra la rama base.** GitHub ofrece `main` por defecto porque
es la rama por defecto del repo: revisá el campo *base* antes de crear el PR.

> **Por qué no hay `develop`.** Ese paso viene del modelo git-flow y existe para equipos: varias personas,
> varias ramas en vuelo, y la necesidad de que nadie escriba directo en producción. En un proyecto de
> una persona no aporta nada y agrega un paso manual que puede olvidarse sin que nada avise.
> Si el proyecto crece y aparece un segundoendedor, tiene sentido volver a evaluarlo.

---

## 🧹 Deuda técnica conocida

| # | Qué | Dónde |
| --- | --- | --- |
| 1 | **5 errores de ESLint** en baseline (`react-refresh/only-export-components`) | Todo el proyecto |
| 2 | **Dependencias muertas:** `axios` y `sweetalert2` están instaladas pero no se usan en ningún archivo | `package.json` |
| 3 | **Íconos muertos:** `react.svg` y `vite.svg` quedaron del template | `src/assets/` |
| 4 | **Sin tests.** No hay runner configurado | — |
| 5 | `console.error` sin retire | `src/views/Products.jsx` |
| 6 | **Las tarjetas del catálogo no son clicables.** No hay vista de detalle todavía | `src/views/Products.jsx` |

---

<div align="center">

**Hecho con ☕ por [Noelia Lucero](https://github.com/Noelia2024)**

</div>