import { GatewayListingResponse } from "../api/GatewayApiTypes";
import { GatewayListItemProps } from "../components/GatewayList/GatewayListItem";

// TODO use zod
export function parseGatewayListingResponse(data: GatewayListingResponse): GatewayListItemProps[] {
    return data.results.map((apiGateway) => ({
        description: apiGateway.description,
        gatewayId: apiGateway.gatewayId,
        latestMessageTime: new Date(apiGateway.gatewayStatistics.lastMessageRxTime),
        model: apiGateway.model,
        status: apiGateway.status,
        uuid: apiGateway.uuid,
        version: apiGateway.version,
    }))
}