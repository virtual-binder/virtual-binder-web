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
