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

## Despliegue

El destino es Netlify. Conecta este repositorio y configura `NEXT_PUBLIC_API_URL` con la URL HTTPS de Cloud Run. La API debe incluir el dominio de Netlify en `CORS_ORIGINS`.
