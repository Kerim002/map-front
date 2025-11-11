import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RightClickHandler() {
  useMapEvents({
    contextmenu(e) {
      console.log("Right-click coordinates:", [e.latlng.lat, e.latlng.lng]);
    },
  });
  return null; // no rendering, only event listener
}

// fix default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "marker-icon-2x.png",
  iconUrl: "marker-icon.png",
  shadowUrl: "marker-shadow.png",
});

export default function LocalTileMap() {
  const position: [number, number] = [37.96001338978151, 58.32140564918519];
  const pathCoords: [number, number][] = [
    [37.96001338978151, 58.32140564918519],
    [37.95868953715448, 58.32383036613465],
    [37.95976807703848, 58.32482814788819],
    [37.95962427263574, 58.32505345344544],
    [37.95984420866711, 58.325278759002686],
    [37.959632731726046, 58.32553625106812],
    [37.95939587682911, 58.325938582420356],
    [37.96085928950751, 58.32742989063264],
    [37.96085928950751, 58.32742989063264],
    [37.96093964947474, 58.327252864837654],
  ];
  return (
    <div className="h-screen w-full rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          // ✅ point this to your own TileServer GL endpoint
          url="http://localhost:8080/styles/test-style/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>Ashgabat🌍</Popup>
        </Marker>
        <Marker position={[37.96093964947474, 58.327252864837654]}>
          <Popup>Ashgabat🌍</Popup>
        </Marker>

        <Polyline
          positions={pathCoords}
          pathOptions={{
            color: "blue", // Change this to 'red', 'green', 'purple', etc.
            weight: 5,
            opacity: 0.8,
          }}
        />
        <RightClickHandler />
      </MapContainer>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   useMapEvents,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // -------------------------------------------------------------
// // Markets Map System - Single-file React component (TypeScript)
// // - Map with markers
// // - Right-side sliding sheet (drawer) that opens on marker click
// // - Drawer contains tabs: Overview (images + info), Products (prices), Documents
// // - Uses Tailwind CSS utility classes for styling
// // - Replace TileLayer url with your tileserver or use a public provider
// // -------------------------------------------------------------

// // Fix default marker icon when using CRA/Vite/Next
// // (Leaflet expects image assets next to the bundle; easiest is to point to CDN)
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// type Market = {
//   id: string;
//   name: string;
//   position: [number, number];
//   images: string[]; // image URLs
//   description?: string;
//   products: { id: string; name: string; price: number; unit?: string }[];
//   documents: { id: string; name: string; url: string }[];
// };

// const SAMPLE_MARKETS: Market[] = [
//   {
//     id: "m1",
//     name: "Aşgabat Central Market",
//     position: [37.95, 58.3833],
//     images: [
//       "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=60",
//       "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=800&q=60",
//     ],
//     description: "Large central market with fresh produce and groceries.",
//     products: [
//       { id: "p1", name: "Tomatoes", price: 1.2, unit: "kg" },
//       { id: "p2", name: "Bread (loaf)", price: 0.5 },
//       { id: "p3", name: "Milk (1L)", price: 0.9 },
//     ],
//     documents: [
//       { id: "d1", name: "Price List (Aug 2025)", url: "#" },
//       { id: "d2", name: "Market Rules", url: "#" },
//     ],
//   },
//   {
//     id: "m2",
//     name: "Archabil Avenue Market",
//     position: [37.945, 58.37],
//     images: [
//       "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=60",
//     ],
//     description: "Small street market along Archabil Avenue.",
//     products: [
//       { id: "p4", name: "Apples", price: 1.5, unit: "kg" },
//       { id: "p5", name: "Eggs (10)", price: 1.8 },
//     ],
//     documents: [{ id: "d3", name: "Vendor Permit", url: "#" }],
//   },
// ];

// // Simple drawer component (right sheet)
// function Drawer({
//   open,
//   onClose,
//   children,
// }: {
//   open: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full md:w-1/3 lg:w-1/4 bg-white shadow-2xl transform transition-transform duration-300 z-[999] ${
//         open ? "translate-x-0" : "translate-x-full"
//       }`}
//       aria-hidden={!open}
//     >
//       <div className="p-4 h-full overflow-y-auto">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold">Market Details</h3>
//           <button
//             onClick={onClose}
//             className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
//           >
//             Close
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

// // Tabs
// function Tabs({
//   tabs,
//   active,
//   onChange,
// }: {
//   tabs: string[];
//   active: number;
//   onChange: (i: number) => void;
// }) {
//   return (
//     <div>
//       <div className="flex gap-2 mb-3">
//         {tabs.map((t, i) => (
//           <button
//             key={t}
//             onClick={() => onChange(i)}
//             className={`px-3 py-1 rounded-t-lg border-b-2 ${
//               active === i
//                 ? "border-blue-600 bg-blue-50"
//                 : "border-transparent hover:bg-gray-50"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function MarketsMapSystem() {
//   const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   function openMarket(m: Market) {
//     setSelectedMarket(m);
//     setActiveTab(0);
//     setDrawerOpen(true);
//   }

//   function closeDrawer() {
//     setDrawerOpen(false);
//     setTimeout(() => setSelectedMarket(null), 300);
//   }

//   // Optional: allow right-click to add a temporary marker or log coords
//   function RightClickLogger() {
//     useMapEvents({
//       contextmenu(e) {
//         console.log("Right-click coords:", e.latlng);
//       },
//     });
//     return null;
//   }

//   // Example polyline (a short path inside Ashgabat)
//   // const pathCoords: [number, number][] = [
//   //   [37.9487, 58.372],
//   //   [37.9495, 58.376],
//   //   [37.951, 58.379],
//   // ];

//   return (
//     <div className="relative h-screen w-full bg-gray-50">
//       <div className="h-full w-full rounded-lg overflow-hidden">
//         <MapContainer
//           center={[37.95, 58.38]}
//           zoom={13}
//           scrollWheelZoom={true}
//           className="h-full w-full"
//         >
//           <TileLayer
//             // change to your tileserver or use a public provider
//             url="http://localhost:8080/styles/test-style/{z}/{x}/{y}.png"
//           />

//           {SAMPLE_MARKETS.map((m) => (
//             <Marker
//               key={m.id}
//               position={m.position}
//               eventHandlers={{
//                 click: () => openMarket(m),
//               }}
//             >
//               <Popup>
//                 {m.name}
//                 <br />
//                 <button
//                   className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-sm"
//                   onClick={() => openMarket(m)}
//                 >
//                   Open
//                 </button>
//               </Popup>
//             </Marker>
//           ))}

//           {/* <Polyline
//             positions={pathCoords}
//             pathOptions={{ color: "#1e40af", weight: 5, opacity: 0.85 }}
//           /> */}

//           <RightClickLogger />
//         </MapContainer>
//       </div>

//       {/* Drawer (sheet) */}
//       <Drawer open={drawerOpen} onClose={closeDrawer}>
//         {!selectedMarket ? (
//           <div className="text-sm text-gray-500">No market selected.</div>
//         ) : (
//           <div>
//             <h2 className="text-xl font-bold mb-1">{selectedMarket.name}</h2>
//             <p className="text-sm text-gray-600 mb-3">
//               {selectedMarket.description}
//             </p>

//             <Tabs
//               tabs={["Overview", "Products", "Documents"]}
//               active={activeTab}
//               onChange={setActiveTab}
//             />

//             <div>
//               {activeTab === 0 && (
//                 <div>
//                   {/* Image gallery */}
//                   <div className="grid grid-cols-1 gap-2 mb-4">
//                     {selectedMarket.images.map((src, i) => (
//                       <img
//                         key={i}
//                         src={src}
//                         alt={`${selectedMarket.name} ${i}`}
//                         className="w-full h-40 object-cover rounded"
//                       />
//                     ))}
//                   </div>

//                   {/* Basic info */}
//                   <div className="text-sm">
//                     <p>
//                       <strong>Location:</strong> {selectedMarket.position[0]},{" "}
//                       {selectedMarket.position[1]}
//                     </p>
//                     <p className="mt-2">
//                       <strong>Items:</strong> {selectedMarket.products.length}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 1 && (
//                 <div>
//                   <ul className="space-y-2">
//                     {selectedMarket.products.map((p) => (
//                       <li
//                         key={p.id}
//                         className="flex items-center justify-between p-2 rounded border"
//                       >
//                         <div>
//                           <div className="font-medium">{p.name}</div>
//                           <div className="text-xs text-gray-500">{p.unit}</div>
//                         </div>
//                         <div className="font-semibold">{p.price} USD</div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {activeTab === 2 && (
//                 <div>
//                   <ul className="space-y-2">
//                     {selectedMarket.documents.map((d) => (
//                       <li
//                         key={d.id}
//                         className="flex items-center justify-between p-2 rounded border"
//                       >
//                         <div className="text-sm">{d.name}</div>
//                         <a
//                           href={d.url}
//                           className="text-blue-600 underline text-sm"
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           Open
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </Drawer>

//       {/* optional overlay to close drawer when clicking outside */}
//       {drawerOpen && (
//         <button
//           onClick={closeDrawer}
//           className="fixed inset-0 z-30 bg-black/30"
//           aria-hidden
//         />
//       )}
//     </div>
//   );
// }

// /*
//   Usage notes:
//   - This file expects Tailwind CSS to be configured in the project.
//   - Install dependencies: react-leaflet, leaflet.
//     e.g. npm i react-leaflet leaflet
//   - Replace TileLayer URL for custom tiles or local tileserver.
//   - For a production app you may want to move Drawer/Tabs into separate components
//     and add accessibility improvements (focus trap, keyboard close, etc.).
// */
