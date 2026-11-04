# Hackerland-Desk — Contexto del proyecto

> Archivo de memoria del proyecto. Resume **qué es, qué se decidió, bajo qué
> reglas y en qué punto vamos**, para dar contexto rápido al abrir una nueva
> sesión. Mantener breve y factual. Última actualización: 2026-11-04 (tarde)

## Qué es
Panel de administración para una empresa de **telecomunicaciones**. Incluye
gestión de clientes, mesa de trabajo (helpdesk) y control de suscripciones/pagos
del servicio. Pensado para crecer: a futuro aceptará imágenes/adjuntos y
descargas (PDF). Se permiten elementos alusivos a telecom (íconos de señal, etc.).

## Stack (decidido)
- **Framework:** Next.js 16 (App Router), React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS (v4 — se configura desde `globals.css`, no hay archivo `tailwind.config`)
- **Linter:** ESLint
- **Base de datos:** PostgreSQL
- **ORM:** Drizzle
- **Hosting app (inicial):** Vercel ✅ desplegado
- **Base en la nube (inicial):** Neon
- **Archivos (futuro):** object storage (ej. Cloudflare R2), NUNCA en la base
- **Tema claro/oscuro:** `next-themes` ✅ en uso

## Convenciones y restricciones
- **Idioma de la app:** español (`lang="es"`).
- **Estructura:** sin carpeta `src/`; el código vive en la raíz (`app/`, `components/`).
- **Alias de imports:** `@/` apunta a la raíz (ej. `@/components/Logo`).
- **Componentes reutilizables** en `components/` (raíz). Regla: lo que se repite y es fijo (logo, barra) → `layout.tsx` o componente; lo único de una pantalla → su `page.tsx`.
- **Interactividad:** todo componente con estado/clics necesita `"use client"` al inicio (por defecto los componentes corren en el servidor).
- **Metadata solo en componentes de servidor:** `page.tsx`/`layout.tsx` sin `"use client"`; lo interactivo va en componentes aparte.
- **Un solo `<main>` por página:** lo pone el layout del grupo (`<main className="flex flex-1 flex-col">`); las páginas usan `<section className="flex flex-1 ...">`, no `min-h-screen`.
- **Portabilidad (importante):** debe ser fácil migrar de Vercel/Neon a un VPS.
  - Config sensible en variables de entorno (`DATABASE_URL`), nada hardcodeado. En Vercel se cargan en *Settings → Environment Variables*.
  - Usar el **driver TCP estándar de Postgres**, NO el driver serverless de Neon (evita lock-in).
  - Evitar funciones exclusivas de Vercel. Next corre con `next start` como server Node normal.
  - Deploy a VPS (futuro): vía Docker. **Kubernetes NO** (sobredimensionado).
- **Archivos binarios:** nunca en la base; solo URL + metadatos.
- **Cuentas de plataformas de desarrollo** (Vercel, Neon, etc.): entrar siempre con **GitHub**.

## Colores en uso (elegidos por el dueño)
- Fondo claro: `#e5e5e5` · texto `#171717` (`:root` en `globals.css`)
- Fondo oscuro: `#747474` · texto `#FFFFFF` (`.dark`) — provisional, se ajustará
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

## Modelo mental de Next (App Router) ya entendido
- Carpeta dentro de `app/` = ruta/URL. Archivo `page.tsx` = página visible de esa ruta.
- `layout.tsx` = plantilla que envuelve su página y todo lo anidado debajo; recibe la página en la prop `children`.
- El nombre de la función es libre; obligatorio: `export default` y que el archivo se llame `page.tsx`/`layout.tsx`.
- React da las piezas (componentes, props, children); Next da las reglas (rutas por carpeta, page/layout).
- `npm run build` genera la versión de producción en `.next` (no se sube a Git; Vercel hace su propio build).
- **Route groups** `(nombre)`: agrupan rutas con su propio layout sin aparecer en la URL. Una carpeta **sin** paréntesis sí aparece en la URL (ej. `auth/login` → `/auth/login`).
- Archivos especiales en `app/`: `icon.svg` = favicon (Next lo detecta por su nombre).
- Providers de cliente (ThemeProvider) envuelven `children` en el layout raíz.
- Props con valor por defecto (`showLogin = true`) y render condicional (`{showLogin && (...)}`).

## Arquitectura de layouts
```
app/
├─ layout.tsx               ← raíz: <html suppressHydrationWarning>, ThemeProvider, metadata
├─ icon.svg                 ← favicon (copia del logo)
├─ globals.css
├─ (public)/
│  ├─ layout.tsx            ← NavigationGuest (con botón "Iniciar sesión")
│  └─ page.tsx              → /
├─ auth/                    ← SIN paréntesis (igual que en meeti-next)
│  ├─ layout.tsx            ← NavigationGuest showLogin={false}
│  ├─ login/page.tsx        → /auth/login
│  └─ forgot-password/page.tsx → /auth/forgot-password
└─ dashboard/page.tsx       → /dashboard  (pendiente moverlo a un grupo (app) con panel lateral)
```
- La barra NO va en el layout raíz: cada grupo decide su barra (público, auth, panel).
- Todo lo nuevo de autenticación (ej. `reset-password`) va dentro de `app/auth/` y hereda su layout.

## Estado actual de los archivos
- `app/layout.tsx` → metadata `title: { template: "Hackerland - %s", default: "Hackerland" }`, description "Panel de administración de Hackerland-Desk". `lang="es"`, `suppressHydrationWarning`, `<ThemeProvider>{children}</ThemeProvider>`.
- `app/globals.css` → `@custom-variant dark (&:where(.dark, .dark *));`, `:root` (claro) y `.dark` (oscuro), sin `@media`.
- `app/(public)/layout.tsx` → `<NavigationGuest />` + `<main className="flex flex-1 flex-col">`.
- `app/(public)/page.tsx` → `<section>` centrado con "Hackerland-Desk". **Futuro:** irá una imagen PNG de la empresa (en `public/`, con `next/image`).
- `app/auth/layout.tsx` → `<NavigationGuest showLogin={false} />` + `<main>` flex.
- `app/auth/login/page.tsx` → metadata "Iniciar sesión"; Logo 64 + título; inputs correo/contraseña; botón azul (sin lógica); enlace a `/auth/forgot-password`.
- `app/auth/forgot-password/page.tsx` → metadata "Recuperar contraseña"; Logo + texto; input correo; botón "Enviar enlace" (sin lógica); enlace "Volver a iniciar sesión".
- `app/dashboard/page.tsx` → placeholder con `metadata.title = "Tablero de mando"`.
- `app/icon.svg` → favicon con el logo (se borró `favicon.ico`).
- `components/Logo.tsx` → SVG multicolor (viewBox "140 85 800 800"), `width/height={size}` (default 48).
- `components/NavigationGuest.tsx` → prop `showLogin` (default `true`). Izquierda: Logo 28 + "Hackerland-Desk" → `/`. Derecha: botón "Iniciar sesión" (`/auth/login`, azul) si `showLogin`, y `<ThemeToggle />`.
- `components/ThemeProvider.tsx` → `"use client"`, `attribute="class" defaultTheme="light" enableSystem={false}`.
- `components/ThemeToggle.tsx` → `"use client"`, `useTheme`, guard `mounted` con `useSyncExternalStore`; luna en modo claro, sol en modo oscuro.

## Hecho (2026-11-04)
- ✅ Barra superior (NavigationGuest) con logo, "Iniciar sesión" y luna/sol.
- ✅ Modo oscuro funcionando con `next-themes`.
- ✅ Favicon propio (`app/icon.svg`).
- ✅ Grupo `auth` con login rediseñado y página de recuperar contraseña.

## Próximo paso
1. Grupo `(app)` con panel lateral y mover `dashboard` ahí.
2. Ajustar la paleta del modo oscuro.
3. Imagen de la empresa en la home.
4. (Opcional) Sacar inputs y botones repetidos a componentes `Input` y `Button`.

## Pendientes por decidir / hacer
- [ ] Autenticación (solución y estrategia) — conectar login y recuperar contraseña
- [ ] Modelo multi-cliente / multitenancy
- [ ] Librería de componentes UI
- [ ] Manejo de pagos / suscripciones
- [ ] Storage concreto para adjuntos
- [ ] Dónde vive Postgres en desarrollo (Docker local vs. Neon directo)
- [ ] Favicon simplificado (el logo tiene mucho detalle a 16 px) — opcional
- [ ] Activar verificación en dos pasos en GitHub
- [ ] Reescribir `README.md` (aún es el de create-next-app) en español
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
- Explicaciones cortas (~5 líneas), salvo que se pida profundizar.
- No dar recomendaciones de colores salvo que se pidan. No dar sugerencias de Git.
- VS Code: los avisos en `globals.css` sobre `@custom-variant`/`@theme` no son errores (se quitan con la extensión Tailwind CSS IntelliSense).
