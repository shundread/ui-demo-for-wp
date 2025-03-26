import { GatewayListingResponse } from "../api/GatewayApiTypes";
import { GatewayList } from "../components/GatewayList/GatewayList";
import { parseGatewayListingResponse } from "../utils/apiDataParsers";

import JsonData from "../data/gateway_listing_response.json";
import { GatewaysProvider } from "../hooks/useGateways";

export function GatewayListView() {
    // TODO (thiago) 2025-03-25 fetch the data from a stub backend using react-fetch
    // TODO (thiago) 2025-03-25 handle loading state
    const data = JsonData as GatewayListingResponse;

    // TODO (thiago) 2025-03-25 handle multiple networks, right now we're assuming
    // a single network since that's what is in the data
    const gateways = parseGatewayListingResponse(data);

    // TODO prettify view
    return (
        <main>
            <h1>Gateway list</h1>
            <GatewaysProvider initGateways={gateways}>
                <GatewayList />
            </GatewaysProvider>
        </main>
    );
}