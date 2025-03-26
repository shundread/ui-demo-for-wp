import { useParams } from "react-router";
import { useGateways } from "../../hooks/useGateways";
import { GatewayDetailSummary, GatewayDetailSummaryProps } from "./GatewayDetailSummary";
import { GatewayDetailTimeline, GatewayDetailTimelineProps } from "./GatewayDetailTimeline";

export interface GatewayDetailProps {
    summary: GatewayDetailSummaryProps;
    timeline: GatewayDetailTimelineProps;
}

export function GatewayDetail({
    summary,
    timeline,
}: GatewayDetailProps) {
    const { gateways } = useGateways();
    const params = useParams()
    const gateway = gateways.find((gateway) => gateway.uuid === params.uuid)

    return (
        <>
            <GatewayDetailSummary
                gatewayId={gateway?.gatewayId || "gateway details not found"}
                description={gateway?.description || "gateway details not found"}
                model={gateway?.model || "gateway details not found"}
                version={gateway?.version}
                startTime={summary.startTime}
                endTime={summary.endTime}
                latestStatus={summary.latestStatus}
                timeInStatusesS={summary.timeInStatusesS}
            />
            <GatewayDetailTimeline
                historySamples={timeline.historySamples}
                statusChangeEvents={timeline.statusChangeEvents}
            />
        </>
    )
}