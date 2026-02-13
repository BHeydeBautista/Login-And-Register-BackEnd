# nestjs-backend (Login/Register)

Backend en NestJS con autenticación JWT y PostgreSQL (TypeORM). Incluye endpoints de auth, guard de autorización y un módulo de usuarios.

## Tecnologías

- NestJS 11 + TypeScript
- PostgreSQL + TypeORM
- JWT (`@nestjs/jwt`)
- Validaciones con `class-validator` + `ValidationPipe`
- Seguridad básica con `helmet`
- Documentación/Interfaz de API con Swagger UI

## Arranque rápido

### Con npm

```bash
npm install
npm run start:dev
```

Servidor: `http://localhost:3000`

### Con Docker (Windows / Linux / macOS)

Requisitos (Windows): Docker Desktop con WSL2.

```bash
docker compose up --build
```

Servidor: `http://localhost:3000`

## Interfaz para ver rutas (Swagger UI)

Al levantar el backend, abre:

- Swagger UI: `http://localhost:3000/docs`

Por defecto Swagger está habilitado en desarrollo. En producción se deshabilita salvo que setees `SWAGGER_ENABLED=true`.

## Variables de entorno

El proyecto soporta dos formas de configurar DB:

### Opción A: una sola URL

- `DATABASE_URL`: cadena de conexión Postgres (ej: `postgres://user:pass@host:5432/db`)

### Opción B: variables separadas

- `DB_HOST` (default: `localhost`)
- `DB_PORT` (default: `5432`)
- `DB_USER` (default: `postgres`)
- `DB_PASSWORD` (default: `postgres`)
- `DB_NAME` (default: `app`)

### Auth / JWT

- `JWT_SECRET`: secreto para firmar tokens (en `development` hay fallback, en `production` es obligatorio)
- `JWT_EXPIRES_IN`: expiración (default: `1d`)

### HTTP / CORS / Docs

- `PORT` (default: `3000`)
- `CORS_ORIGIN`: lista separada por comas (ej: `http://localhost:5173,http://localhost:3001`)
- `SWAGGER_ENABLED`: `true|false` (si `NODE_ENV=production`, por defecto queda apagado)

## Rutas disponibles

Base URL: `http://localhost:3000`

### Auth

- `POST /auth/register` (público)
  - body: `{ name, email, password }`
- `POST /auth/login` (público)
  - body: `{ email, password }`
  - response: `{ token, user }`
- `GET /auth/profile` (protegido)
  - header: `Authorization: Bearer <token>`
  - response: payload del JWT (se setea en `req.user` en el guard)

### Users (todas protegidas con JWT)

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

Nota: actualmente `findAll/findOne/update/remove` en el servicio están como placeholders (devuelven strings). El `create` sí persiste con TypeORM.

## Ejemplo rápido (cURL)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

Luego usar el token:

```bash
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <TOKEN>"
```

## Scripts

```bash
npm run build
npm run lint
npm run test
```
