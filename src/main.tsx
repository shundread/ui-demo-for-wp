import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { GatewayListView } from './views/GatewayListView.tsx'
import { GatewayDetailView } from './views/GatewayDetailView.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<GatewayListView />} />
        <Route path="gateway/:uuid" element={<GatewayDetailView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
