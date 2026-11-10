# Hackerland-Desk — Contexto del proyecto

> Archivo de memoria del proyecto. Resume **qué es, qué se decidió, bajo qué
> reglas y en qué punto vamos**, para dar contexto rápido al abrir una nueva
> sesión. Mantener breve y factual. Última actualización: 2026-11-09 (noche)

## Qué es
Panel de administración para una empresa de **telecomunicaciones** (ISP en Honduras). Incluye
gestión de clientes, mesa de trabajo (helpdesk) y control de suscripciones/pagos
del servicio. Plataforma dedicada a revisión de problemas de internet de los clientes y de
los equipos propios (red basada en **MikroTik**; integración/reportería más adelante).
Pensado para crecer: a futuro aceptará imágenes/adjuntos y descargas (PDF). Se permiten
elementos alusivos a telecom (íconos de señal, etc.). Casi todo lo ingresa el admin.

## Stack (decidido)
- **Framework:** Next.js 16.4.5 (App Router), React 19.3
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS (v4 — se configura desde `globals.css`, no hay archivo `tailwind.config`)
- **Linter:** ESLint
- **Base de datos:** PostgreSQL en **Neon** (región AWS US East, conexión con `-pooler`)
- **ORM:** Drizzle — `drizzle-orm` 0.45 + `pg` (driver TCP estándar) + `drizzle-kit` 0.31
- **Validación:** Zod **en el servidor** (dentro de Server Actions); en el cliente solo HTML (`required`, `type="email"`). Esquemas generados desde Drizzle (`drizzle-zod` con Drizzle 0.x).
- **Mutaciones:** Server Actions. Lecturas: directo con Drizzle en componentes de servidor.
- **Autenticación:** Better Auth 1.7 + adaptador Drizzle + plugin `username` (usuario y contraseña al inicio; correo/verificación después) + plugin `admin` (roles: admin, técnico, soporte) + `nextCookies`.
- **Hosting app (inicial):** Vercel ✅ desplegado
- **Archivos (futuro):** object storage (ej. Cloudflare R2), NUNCA en la base
- **Tema claro/oscuro:** `next-themes` ✅ en uso

## Convenciones y restricciones
- **Idioma de la app:** español (`lang="es"`).
- **Estructura:** sin carpeta `src/`; el código vive en la raíz (`app/`, `components/`, `db/`, `lib/`).
- **Alias de imports:** `@/` apunta a la raíz (ej. `@/components/Logo`, `@/db`, `@/lib/auth`).
- **Componentes reutilizables** en `components/` (raíz). Regla: lo que se repite y es fijo (logo, barra) → `layout.tsx` o componente; lo único de una pantalla → su `page.tsx`.
- **Interactividad:** todo componente con estado/clics necesita `"use client"` al inicio (por defecto los componentes corren en el servidor).
- **Metadata solo en componentes de servidor:** `page.tsx`/`layout.tsx` sin `"use client"`; lo interactivo va en componentes aparte.
- **Un solo `<main>` por página:** lo pone el layout del grupo (`<main className="flex flex-1 flex-col">`); las páginas usan `<section className="flex flex-1 ...">`, no `min-h-screen`.
- **Imágenes:** fotos/raster en `public/images/` (nombres en minúsculas, sin espacios; Vercel distingue mayúsculas). Logos/íconos SVG → componentes en `components/`. Favicon → `app/icon.svg`.
- **Portabilidad (importante):** debe ser fácil migrar de Vercel/Neon a un VPS.
  - Config sensible en variables de entorno, nada hardcodeado. En Vercel se cargan en *Settings → Environment Variables* (aplican solo a despliegues nuevos → si se cambia una variable sin cambiar código: *Deployments → ⋯ → Redeploy*).
  - Usar el **driver TCP estándar de Postgres (`pg`)**, NO el driver serverless de Neon (evita lock-in).
  - Evitar funciones exclusivas de Vercel. Next corre con `next start` como server Node normal.
  - Deploy a VPS (futuro): vía Docker. **Kubernetes NO** (sobredimensionado).
- **Archivos binarios:** nunca en la base; solo URL + metadatos.
- **Cuentas de plataformas de desarrollo** (Vercel, Neon, etc.): entrar siempre con **GitHub**.

## Variables de entorno (`.env` en la raíz, ignorado por `.gitignore`)
- `DATABASE_URL` → URL de Neon con `-pooler`, sin comillas, terminando en `?sslmode=verify-full&channel_binding=require` (se cambió de `require` a `verify-full` para quitar el aviso de seguridad de `pg`).
- `BETTER_AUTH_SECRET` → ⚠️ **de momento es un valor provisional** (`better-auth-secret`). Antes de producción: generar uno real con `openssl rand -base64 32` y usar otro distinto en Vercel.
- `BETTER_AUTH_URL` → `http://localhost:3000` en local; en Vercel será `https://hackerland-desk.vercel.app`.
- Pendiente: cargar las tres en Vercel antes de subir código que use la base.

## Colores en uso (elegidos por el dueño)
- Fondo claro: `#FFFFFF` · texto `#171717` (`:root` en `globals.css`)
- Fondo oscuro: `#222222` · texto `#FFFFFF` (`.dark`)
- Barra (estilo GitHub): `--nav` claro `#f0f2f5` / oscuro `#161b22`; `--nav-border` claro `#59636e` / oscuro `#9198a1` (registradas en `@theme` como `bg-nav`, `border-nav-border`)
- Azul de marca ("-Desk", foco de inputs): `#11B6F0`
- Botón principal: `#005595` con texto blanco, hover `#004477`
- Inputs: fondo blanco, texto `neutral-900`, borde `neutral-300`

## Deploy y Git
- Repo: `github.com/owensinuhe/hackerland-desk` (privado). Rama `main`.
- Vercel: workspace `owensinuhe` (plan Hobby). URL: https://hackerland-desk.vercel.app/
- La app de Vercel en GitHub tiene acceso solo a este repo.
- **Cada `git push` a `main` redespliega solo.** Si el build falla en Vercel, sigue en línea la última versión buena.
- Alias `git subir "mensaje"` (add + commit + push): ✅ funciona y es la forma habitual de guardar y subir.
- El dueño maneja Git por su cuenta: **no darle sugerencias de Git**.
- Avisos CRLF→LF de Git en Windows: normales, ignorar.
- Error `EPERM` al renombrar carpetas en VS Code: detener `npm run dev` (Ctrl + C) y reintentar.

## Modelo mental ya entendido
### Next (App Router)
- Carpeta dentro de `app/` = ruta/URL. Archivo `page.tsx` = página visible de esa ruta.
- `layout.tsx` = plantilla que envuelve su página y todo lo anidado debajo; recibe la página en la prop `children`.
- El nombre de la función es libre; obligatorio: `export default` y que el archivo se llame `page.tsx`/`layout.tsx`.
- React da las piezas (componentes, props, children); Next da las reglas (rutas por carpeta, page/layout).
- `npm run build` genera la versión de producción en `.next` (no se sube a Git; Vercel hace su propio build).
- **Route groups** `(nombre)`: agrupan rutas con su propio layout sin aparecer en la URL. Una carpeta **sin** paréntesis sí aparece en la URL (ej. `auth/login` → `/auth/login`).
- Archivos especiales en `app/`: `icon.svg` = favicon (Next lo detecta por su nombre).
- Providers de cliente (ThemeProvider) envuelven `children` en el layout raíz.
- Props con valor por defecto (`showLogin = true`) y render condicional (`{showLogin && (...)}`).

### Base de datos
- Dos "mundos": **la app** usa `db/index.ts` (en cada request); **drizzle-kit** usa `drizzle.config.ts` (solo al crear/cambiar tablas, desde la terminal).
- `Pool` de `pg` = conexiones reutilizables. El truco de `globalThis` evita abrir un pool nuevo en cada recarga de `npm run dev`.
- Flujo de cambios en tablas: editar `db/schema/*.ts` → `npm run db:generate` (crea `drizzle/000X_*.sql`) → `npm run db:migrate` (lo aplica en Neon). Ver datos: `npm run db:studio`.
- La carpeta `drizzle/` (migraciones) es parte del proyecto: es el historial para recrear la base en otro servidor. Neon guarda qué migraciones se aplicaron en el esquema `drizzle`, tabla `__drizzle_migrations`.

## Arquitectura de carpetas
```
hackerland-desk/
├─ app/
│  ├─ layout.tsx               ← raíz: <html suppressHydrationWarning>, ThemeProvider, metadata
│  ├─ icon.svg                 ← favicon (copia del logo)
│  ├─ globals.css
│  ├─ (public)/
│  │  ├─ layout.tsx            ← NavigationGuest (con botón "Iniciar sesión")
│  │  └─ page.tsx              → /   (renderiza <Hero />)
│  ├─ auth/                    ← SIN paréntesis
│  │  ├─ layout.tsx            ← NavigationGuest showLogin={false}
│  │  ├─ login/page.tsx        → /auth/login
│  │  └─ forgot-password/page.tsx → /auth/forgot-password
│  └─ dashboard/page.tsx       → /dashboard  (pendiente moverlo a un grupo (app) con panel lateral)
├─ components/                 ← Logo, NavigationGuest, Hero, ThemeProvider, ThemeToggle
├─ db/
│  ├─ index.ts                 ← conexión (Pool pg + drizzle) → `import { db } from "@/db"`
│  └─ schema/
│     └─ locations.ts          ← departments, municipalities
├─ drizzle/                    ← migraciones generadas (0000_lazy_psynapse.sql + meta/)
├─ lib/
│  └─ auth.ts                  ← configuración de Better Auth
├─ public/images/              ← hero.jpg
├─ drizzle.config.ts
└─ .env
```
- La barra NO va en el layout raíz: cada grupo decide su barra (público, auth, panel).
- Todo lo nuevo de autenticación (ej. `reset-password`) va dentro de `app/auth/` y hereda su layout.

## Estado actual de los archivos
- `app/layout.tsx` → metadata `title: { template: "Hackerland - %s", default: "Hackerland" }`, `lang="es"`, `suppressHydrationWarning`, `<ThemeProvider>{children}</ThemeProvider>`.
- `app/globals.css` → `@custom-variant dark`, `:root` y `.dark` con `--background`, `--foreground`, `--nav`, `--nav-border`.
- `app/(public)/page.tsx` → `return <Hero />`.
- `components/Hero.tsx` → `<section relative flex-1>` + `next/image` (`/images/hero.jpg`, `fill`, `object-cover`, `loading="eager"`, `fetchPriority="high"`) + capa `bg-black/50` + título y subtítulo. Imagen original muy pesada (18.8 MB, vertical) → pendiente optimizar a ~1920×1080 y renombrar a `hero.jpg`.
- `components/NavigationGuest.tsx` → `<header className="border-b border-nav-border bg-nav">`, `<nav>` `h-16` ancho completo `px-4 sm:px-6`. Logo + "Hackerland-Desk" → `/`; botón "Iniciar sesión" si `showLogin`; `<ThemeToggle />`.
- `app/auth/login`, `app/auth/forgot-password` → formularios sin lógica.
- `app/dashboard/page.tsx` → placeholder "Tablero de mando".
- `db/index.ts` → `new Pool({ connectionString: process.env.DATABASE_URL })` guardado en `globalThis` en desarrollo; `export const db = drizzle(pool)` (todavía **sin** pasarle `schema`).
- `db/schema/locations.ts` → `departments` (PK `code` char(2), `name`) y `municipalities` (PK `code` char(4), `department_code` FK → departments, `name`). ✅ Migradas a Neon (vacías).
- `drizzle.config.ts` → `loadEnvConfig` de `@next/env` (carga `.env` sin instalar dotenv); `schema: "./db/schema"`, `out: "./drizzle"`, `dialect: "postgresql"`.
- `package.json` → scripts `db:generate`, `db:migrate`, `db:studio`.
- `lib/auth.ts` → `betterAuth({ database: drizzleAdapter(db, { provider: "pg" }), emailAndPassword: { enabled: true, disableSignUp: true }, plugins: [username(), admin(), nextCookies()] })`. `nextCookies()` siempre al final. **Aún no funciona**: faltan las tablas de Better Auth.

## Base de datos — modelo ✅ aprobado por el dueño (2026-11-09)
**Auth (Better Auth crea):** `user` (personal del panel, con rol), `session`, `account` (credenciales), `verification`.
→ Por eso los clientes del ISP se llaman **`customers`**, no `accounts`. Los clientes NO inician sesión.
→ Better Auth **exige email en cada usuario** aunque se entre con username. Admin = correo del dueño; técnicos sin correo → uno interno (ej. `tecnico1@hackerland.local`) hasta activar verificación por correo.

**Catálogos fijos (seed desde Excel del dueño — se verá después):**
- `departments` — PK = código oficial de 2 dígitos (ej. `05` Cortés), nombre. 18 registros. ✅ tabla creada
- `municipalities` — PK = código de 4 dígitos (ej. `0501` San Pedro Sula = depto `05` + municipio `01`), department_code FK, nombre. 298 registros. ✅ tabla creada
- Seed inicial también del usuario admin (correo del dueño, fijo).

**Clientes:**
- `customers` — first_name, last_name, phone, phone2, email, (DNI opcional). Sin IP (la IP es de la conexión, no de la persona).
- `addresses` — customer_id, municipality_code, sector, neighborhood, referencia, (lat/lng opcional). Un cliente puede tener varias.

**Red e infraestructura:**
- `sites` (nodos/torres/puntos de enlace propios) — nombre, municipio, ubicación. Los equipos WAN cuelgan de aquí. Permite saber qué clientes se afectan si cae un nodo.
- `equipment_models` — type (`lan` = equipo del cliente en su casa, `tv` = caja de TV, `wan` = infraestructura propia: Starlink, antenas, etc.), marca, modelo.
- `devices` (aparato físico, **una sola tabla** para lan/tv/wan) — model_id, **código interno** (identificador que el dueño ya usa en su Excel), **MAC (`macaddr`, única)** para vincular con MikroTik y sacar reportería, status (bodega/instalado/dañado), y ubicación: `service_id` (si es LAN/TV de cliente) **o** `site_id` (si es WAN).
- Los datos de telecom (MAC, IP) ya están validados en el MikroTik principal y en Excel del dueño.

**Planes y servicios:**
- `plans` — nombre, precio, megas_bajada, megas_subida, activo.
- `plan_equipment` — plan_id, type, cantidad incluida.
- `services` (contrato/enlace, centro del modelo) — customer_id, plan_id, address_id, **site_id** (de qué nodo se alimenta), **ip (`inet`)**, status (activo/suspendido/cancelado), precio_pactado (para que cambiar el precio del plan no altere contratos viejos), fecha_instalación.
- Cardinalidad: un cliente → varios servicios/enlaces (2, 3…); un servicio → varios equipos (ej. 5 cajas TV). Pagos se colgarán de `services`.

**Helpdesk:**
- `tickets` (incidencia = ticket, **una sola tabla**; no separar WAN/LAN en tablas distintas) — código visible (HD-00123), category (wan/lan/tv/otro), service_id (opcional, falla de un cliente), site_id (opcional, falla de infraestructura que afecta a muchos), device_id (opcional), priority, status, assigned_to → user, created_by, fechas.
- `ticket_events` (registro de etapas, solo inserción) — ticket_id, user_id, tipo (comentario/cambio de estado/reasignación/visita), estado_anterior, estado_nuevo, nota, fecha.
- Futuro: `ticket_attachments` (URL a R2).

**Orden de implementación:** 1) Drizzle + conexión Neon ✅ → 2) Better Auth (username + admin) + seed admin ⏳ en curso → 3) seed departamentos/municipios → 4) customers + addresses → 5) sites + equipos + planes → 6) services → 7) tickets + eventos.

## Hecho
- 2026-11-04: barra superior, modo oscuro, favicon, grupo `auth` con login y recuperar contraseña.
- 2026-11-09: Hero en la home; barra estilo GitHub; modelo de datos aprobado; Neon creado; Drizzle instalado y conectado (`db/index.ts`, `drizzle.config.ts`, scripts); primera migración aplicada (`departments`, `municipalities`); Better Auth instalado y `lib/auth.ts` creado.

## Próximo paso (retomar aquí)
Continuar con Better Auth, un paso a la vez:
1. **Paso 5:** generar el esquema de Better Auth con su CLI hacia `db/schema/auth.ts` (tablas `user`, `session`, `account`, `verification` + campos de `username` y `admin`). Pasar el `schema` a `drizzle(pool, { schema })` en `db/index.ts` y al `drizzleAdapter`. Luego `npm run db:generate` + `npm run db:migrate`.
2. **Paso 6:** ruta de la API de auth: `app/api/auth/[...all]/route.ts` con `toNextJsHandler(auth)`.
3. **Paso 7:** seed del usuario admin (rol `admin`, username + email del dueño) con `auth.api.createUser` del plugin admin (el registro público está desactivado).
4. **Paso 8:** conectar el formulario de `/auth/login` con una Server Action (usuario + contraseña) y proteger `/dashboard`.

Después: grupo `(app)` con panel lateral y mover `dashboard` ahí; optimizar imagen del hero; (opcional) componentes `Input` y `Button`.

## Pendientes por decidir / hacer
- [ ] Reemplazar `BETTER_AUTH_SECRET` provisional por uno real antes de producción
- [ ] Cargar `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` en Vercel
- [ ] Seed de departamentos y municipios desde el Excel del dueño
- [ ] Integración con MikroTik (lectura de MAC/IP, reportería)
- [ ] Modelo multi-cliente / multitenancy
- [ ] Librería de componentes UI
- [ ] Manejo de pagos / suscripciones
- [ ] Storage concreto para adjuntos
- [ ] Dónde vive Postgres en desarrollo (de momento: Neon directo; opción futura: rama de Neon o Docker local)
- [ ] Favicon simplificado — opcional
- [ ] Activar verificación en dos pasos en GitHub
- [ ] Reescribir `README.md` en español
- [ ] Más adelante: aprender ramas de Git

## Archivos de instrucciones (AGENTS.md / CLAUDE.md)
- Claude Code lee `AGENTS.md` de forma nativa (desde v2.1.277).
- Si existen `AGENTS.md` y `CLAUDE.md`, por defecto gana CLAUDE.md e ignora AGENTS.md.
- **Decisión:** mantener todo en `AGENTS.md` y NO crear `CLAUDE.md`. Si se necesita, que `CLAUDE.md` sea solo la línea `@AGENTS.md`.
- `AGENTS.md` debería referenciar este `STACK.md` como contexto de decisiones.

## Modo de trabajo
- El asistente **orienta, da código y sugerencias**; el dueño hace los cambios de código a mano.
- **Un paso a la vez:** dar un paso, esperar "sigamos" y continuar. No soltar varios pasos juntos.
- Cuando se arregla algo, dar la solución correcta y completa de una vez (sin idas y vueltas).
- Terminal: **Git Bash** (MINGW64).
- Explicaciones cortas (~5 líneas), salvo que se pida profundizar (el dueño a veces pide explicación más extensa de qué hace cada archivo).
- No dar recomendaciones de colores salvo que se pidan. No dar sugerencias de Git.
- VS Code: los avisos en `globals.css` sobre `@custom-variant`/`@theme` no son errores (se quitan con la extensión Tailwind CSS IntelliSense).