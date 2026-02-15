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

Refer to `.env.example` for required environment variables.
- `.env.development`: API proxying is configured in `vite.config.ts`.
- `.env.production`: Used for production builds.

---
Development Team