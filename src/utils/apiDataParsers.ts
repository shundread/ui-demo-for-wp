import { GatewayListingResponse, SingleGatewayStatsResponse } from "../api/GatewayApiTypes";
import { GatewayDetailProps } from "../components/GatewayDetail";
import { GatewayListItemProps } from "../components/GatewayList/GatewayListItem";

function parseApiTimestamp(value: number) {
    return new Date(value * 1000);
}

// TODO use zod
export function parseGatewayListingResponse(data: GatewayListingResponse): GatewayListItemProps[] {
    return data.results.map((apiGateway) => ({
        description: apiGateway.description,
        gatewayId: apiGateway.gatewayId,
        latestMessageTime: parseApiTimestamp(apiGateway.gatewayStatistics.lastMessageRxTime),
        model: apiGateway.model,
        status: apiGateway.status,
        uuid: apiGateway.uuid,
        version: apiGateway.version,
    }))
}

export function parseGatewayStatsResponse(data: SingleGatewayStatsResponse): GatewayDetailProps {
    return {
        summary: {
            startTime: parseApiTimestamp(data.summary.startTime),
            endTime: parseApiTimestamp(data.summary.endTime),
            latestStatus: data.summary.endTimeStatus,
            timeInStatusesS: data.summary.timeInStatusesS,
        },
        timeline: {
            historySamples: data.historySamples.map((sample) => ({
                startTime: parseApiTimestamp(sample.startTime),
                endTime: parseApiTimestamp(sample.endTime),
                statusTransitionCounts: sample.statusTransitionCounts,
                timeInStatusesS: sample.timeInStatusesS,
            })),
            statusChangeEvents: data.statusChangeEvents.map((statusChangeEvent) => ({
                eventTime: parseApiTimestamp(statusChangeEvent.statusChangeTime),
                status: statusChangeEvent.status,
            })),
        }
    }
}