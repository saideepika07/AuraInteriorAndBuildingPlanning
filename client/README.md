# AURA Spaces — Frontend Client

This is the client-side single-page application built with:
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Vite**

## Architecture

The client application communicates with the Express REST API located in `../server/` via the unified service client:
- `src/services/api.ts` -> Express REST API endpoints (`/api/auth`, `/api/plans`, `/api/architects`, `/api/workers`, `/api/bookings`, `/api/projects`, `/api/ai`, `/api/upload`)
- `src/services/firebase.ts` -> Firebase Authentication (Email/Google) and Cloud Image Storage
- `src/services/gemini.ts` -> Express AI Gateway integration with client-side fallback

## Development

```bash
# Start the Vite client dev server (port 8443)
npm run dev

# Start the Express backend server (port 5000)
npm run server
```
