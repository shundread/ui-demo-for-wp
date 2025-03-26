import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { GatewayListView } from './views/GatewayListView.tsx'
import { GatewayDetailView } from './views/GatewayDetailView.tsx'
import { GatewayListingResponse } from './api/GatewayApiTypes.ts'
import { GatewaysProvider } from './hooks/useGateways.tsx'
import { parseGatewayListingResponse } from './utils/apiDataParsers.ts'
import JsonData from "./data/gateway_listing_response.json";

const data = JsonData as GatewayListingResponse;
const gateways = parseGatewayListingResponse(data);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GatewaysProvider initGateways={gateways}>
      <BrowserRouter>
        <Routes>
          <Route index element={<GatewayListView />} />
          <Route path="gateway/:uuid" element={<GatewayDetailView />} />
        </Routes>
      </BrowserRouter>
    </GatewaysProvider>
  </StrictMode>,
)
