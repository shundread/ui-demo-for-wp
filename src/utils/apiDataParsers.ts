import { GatewayListingResponse, SingleGatewayStatsResponse } from "../api/GatewayApiTypes";
import { GatewayDetailProps } from "../components/GatewayDetail";
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

export function parseGatewayStatsResponse(data: SingleGatewayStatsResponse): GatewayDetailProps {
    return {
        summary: {
            startTime: new Date(data.summary.startTime),
            endTime: new Date(data.summary.endTime),
            latestStatus: data.summary.endTimeStatus,
            timeInStatusesS: data.summary.timeInStatusesS,
        },
        timeline: {
            historySamples: data.historySamples.map((sample) => ({
                startTime: new Date(sample.startTime),
                endTime: new Date(sample.endTime),
                statusTransitionCounts: sample.statusTransitionCounts,
                timeInStatusesS: sample.timeInStatusesS,
            })),
            statusChangeEvents: data.statusChangeEvents.map((statusChangeEvent) => ({
                eventTime: new Date(statusChangeEvent.statusChangeTime),
                status: statusChangeEvent.status,
            })),
        }
    }
}