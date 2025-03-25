import { useParams } from "react-router";
import { SingleGatewayStatsResponse } from "../api/GatewayApiTypes";

import JsonData from "../data/single_gateway_stats.json";

export function GatewayDetailView() {
    const params = useParams(); // Pointless info since we're using a single status object for everything

    // TODO (thiago) 2025-03-25 fetch the data from a stub backend using react-fetch
    // TODO (thiago) 2025-03-25 handle loading state
    const data = JsonData as SingleGatewayStatsResponse;

    return (
        <main>
            <h1>Info for gateway {params.uuid}</h1>
            <pre>{JSON.stringify(data)}</pre>
        </main>
    );
}