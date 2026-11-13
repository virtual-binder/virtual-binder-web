# Virtual Binder Web

Aplicación web de Virtual Binder construida con Next.js, React, TypeScript y Tailwind CSS.

## Desarrollo local

```bash
npm install
cp .env.example .env
npm run dev
```

Abre `http://localhost:3000`. La página comprueba la API en `NEXT_PUBLIC_API_URL`, cuyo valor local predeterminado es `http://localhost:8000`.

Para levantar simultáneamente API, PostgreSQL, web y Expo, usa `make dev` desde el repositorio hermano `virtual-binder-infra`.

## Colección pública

`/[username]` muestra la colección pública de un usuario; la ruta de demostración es `/erwin`. Incluye tres niveles de zoom, precios en CLP definidos por el vendedor, contacto individual y selección de lotes.

Los datos demostrativos están en `src/lib/collection.ts`. Cuando la API disponga de perfiles e inventario, esa capa debe reemplazarse por la consulta correspondiente. El formulario actual abre el cliente de correo mediante `mailto:`; no envía mensajes por la plataforma ni procesa pagos.

## Comprobaciones

```bash
npm run lint
npm run build
```

## Despliegue en Netlify

`netlify.toml` define el build de Next.js y una versión LTS de Node.js. Netlify detecta Next.js mediante su adaptador OpenNext.

```bash
netlify login
netlify init
```

Después de desplegar la API, configura la variable pública de producción:

```bash
netlify env:set NEXT_PUBLIC_API_URL https://URL-DE-CLOUD-RUN --context production
```

La API debe incluir el dominio de Netlify en `CORS_ORIGINS`. No uses la URL local de desarrollo para producción.
