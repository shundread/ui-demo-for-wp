import { useParams } from "react-router";
import { SingleGatewayStatsResponse } from "../api/GatewayApiTypes";

import JsonData from "../data/single_gateway_stats.json";
import { parseGatewayStatsResponse } from "../utils/apiDataParsers";
import { GatewayDetail } from "../components/GatewayDetail";
import { useGateways } from "../hooks/useGateways";

export function GatewayDetailView() {
    const params = useParams(); // Pointless info since we're using a single status object for everything

    // Grab our basic info
    const { gateways } = useGateways();
    const gateway = gateways.find((gateway) => gateway.uuid === params.uuid);

    // TODO (thiago) 2025-03-25 fetch the data from a stub backend using react-fetch
    // TODO (thiago) 2025-03-25 handle loading state
    const data = JsonData as SingleGatewayStatsResponse;

    // TODO (thiago) 2025-03-26
    // Figure out real name of the gateway, probably from a uuid:name localStorage map built during index page load
    const stats = parseGatewayStatsResponse(data);

    return (
        <main>
            <h1>Info for gateway {gateway?.gatewayId || "<not found>"}</h1>
            <GatewayDetail
                basicInfo={gateway}
                {...stats}
            />
        </main>
    );
}