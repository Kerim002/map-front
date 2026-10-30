# Markets Map

A modern geographic data mapping and management application built with React 19, Vite, and Tailwind CSS 4. The project follows the **Feature-Sliced Design (FSD)** architecture for scalability and maintainability.

## 🚀 Features

- **Interactive Map Visualization**: Leveraging Leaflet and React-Leaflet for geographic data display.
- **Entity Management**: Comprehensive management of various entities including Authorities, Buildings, Companies, Employees, Facilities, and Regions.
- **Multilingual Support**: Internationalization through `i18next`.
- **Responsive UI**: Glassmorphic and modern UI design using Tailwind CSS 4 and Lucide icons.
- **Data Analytics**: Visual data representation using Recharts.
- **Dynamic Forms**: Robust form handling with `react-hook-form` and `zod` validation.
- **Advanced State Management**: Efficient data fetching with TanStack Query and global state management with Zustand.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4, Radix UI (Primitives)
- **Mapping**: Leaflet, React-Leaflet
- **State Management**: Zustand, TanStack Query (v5)
- **Forms & Validation**: React Hook Form, Zod
- **Routing**: React Router 7
- **Internationalization**: i18next
- **Charts**: Recharts
- **Icons**: Lucide React

## 📂 Project Architecture

The project follows the [Feature-Sliced Design (FSD)](https://feature-sliced.design/) methodology:

- `src/app`: Initializing logic, providers, and global styles.
- `src/pages`: Composition of pages from widgets and features.
- `src/widgets`: Large architectural components (e.g., Sidebar, Navbar).
- `src/features`: User interactions with business value (e.g., forms, search).
- `src/entities`: Business entities (e.g., Building, Employee) and their local logic/UI.
- `src/shared`: Reusable components, hooks, api-logic, and utilities.

## ⚙️ Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd markets-map

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### Building

```bash
npm run build
```

## 🐳 Deployment

### Docker Build

1. Build the React application:
   ```bash
   npm run build
   ```
2. Build the Docker image:
   ```bash
   docker build -t map-front .
   ```

### Manual Server Deployment

1. Save the image as a tar file:
   ```bash
   docker save -o map-front.tar map-front
   ```
2. Send the tar file to the server:
   ```bash
   scp .\map-front.tar ubuntu@<server-ip>:/home/ubuntu/map-front
   ```
3. On the server terminal:
   ```bash
   # Load image
   sudo docker load -i map-front.tar

   # Stop and remove old container if exists
   sudo docker stop <container-id>
   sudo docker rm <container-id>

   # Run new container
   sudo docker run -d -p 5173:80 map-front
   ```

## 🗺️ Environment Configuration

All variables are Vite client-side vars, so they **must** be prefixed with `VITE_` to be exposed to the app. Copy `.env.example` to the file matching your build mode and fill in the values.

### Variables

| Variable | Required | What it does | Used in |
| --- | --- | --- | --- |
| `VITE_API_URL` | ✅ | Base URL of the backend REST API. In development it's set to `/api` so Vite's dev-server proxy can forward requests to the backend (see `vite.config.ts`); in other modes it's the absolute API origin. Consumed by the single fetch wrapper `apiInstance`. | `src/shared/config/url.ts` |
| `VITE_API_VERSION` | ✅ | API version path segment appended after `VITE_API_URL` (e.g. `/v0`). | `src/shared/config/url.ts` |
| `VITE_MAP_URL` | ✅ | Tile-server URL for the Leaflet map layer. | `src/entities/facility/ui/map-view.tsx` |
| `VITE_MINIO_URL` | ✅ | Base URL of the MinIO / S3 object store; used to build public URLs for uploaded images and files. | `src/shared/lib/storage-url-create.ts` |

### Build modes & their env files

Each build script loads one env file by Vite `--mode`:

| File | Loaded by | Purpose |
| --- | --- | --- |
| `.env.development` | `npm run dev` | Local dev. `VITE_API_URL=/api` routes through the `vite.config.ts` proxy (currently targeting `https://api.tmsoft12.cloud`), avoiding CORS. |
| `.env.staging` | `npm run build:dev` (`--mode staging`) | Staging build; points at the staging API host. |
| `.env.production` | `npm run build:prod` (`--mode production`) | Production build; points at the production API host. |
| `.env.inside` | `npm run build:inside` (`--mode inside`) | Internal / on-prem (LAN) build; all URLs point at private `192.168.x.x` hosts. |
| `.env.example` | — | Template listing the required keys. Not loaded by any build; copy it to create the files above. |

> **Note:** `.env.development`'s `VITE_API_URL` is a relative path (`/api`) on purpose — the dev proxy rewrites it. All other modes use absolute URLs. If you change the dev backend target, edit the `proxy` block in `vite.config.ts`.

---
Development Team