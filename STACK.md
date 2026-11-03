# Hackerland-Desk — Contexto del proyecto

> Archivo de memoria. Resume **qué es el proyecto, qué se decidió y bajo qué
> reglas** para dar contexto rápido al abrir nuevas secciones o sesiones.
> Mantener breve y factual. Última actualización: 2026-11-03

## Qué es
Panel de administración con gestión de clientes, mesa de trabajo (helpdesk) y
suscripciones (control de pagos del servicio). Pensado para crecer: a futuro
aceptará imágenes/adjuntos y descargas (PDF).

## Stack (decidido)
- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Linter:** ESLint
- **Base de datos:** PostgreSQL
- **ORM:** Drizzle
- **Hosting app (inicial):** Vercel
- **Base en la nube (inicial):** Neon
- **Archivos (futuro):** object storage (ej. Cloudflare R2), NO en la base

## Pendientes por decidir
- [ ] Autenticación (solución y estrategia)
- [ ] Modelo multi-cliente / multitenancy
- [ ] Librería de componentes UI
- [ ] Manejo de pagos / suscripciones
- [ ] Storage concreto para adjuntos

## Convenciones y restricciones
- **Idioma de la app:** español (`lang="es"`).
- **Estructura:** sin carpeta `src/`; el código vive en la raíz (`app/`).
- **Portabilidad (importante):** debe ser fácil migrar de Vercel/Neon a un VPS.
  - Toda config sensible va en variables de entorno (ej. `DATABASE_URL`), nada hardcodeado.
  - Usar el **driver TCP estándar de Postgres** (no el driver serverless de Neon) para no quedar atado al proveedor.
  - Evitar funciones exclusivas de Vercel. Next corre con `next start` como server Node normal.
- **Archivos binarios:** nunca en la base de datos; solo se guarda URL + metadatos.
- **Deploy a VPS (futuro):** vía contenedor Docker. Kubernetes NO se usará (sobredimensionado para esta app).

## Estado actual
- Proyecto creado y corriendo en local (`npm run dev`).
- En proceso: personalización inicial (nombre + tema oscuro).

## Modo de trabajo
- El asistente **orienta y explica**; el dueño hace todos los cambios de código a mano.
