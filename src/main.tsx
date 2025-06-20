import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Chatbox from './Chatbox.tsx'
import 'leaflet/dist/leaflet.css'
import MapDashboard from './MapDashboard'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <MapDashboard />
      <Chatbox />
    </div>
  </StrictMode>,
);