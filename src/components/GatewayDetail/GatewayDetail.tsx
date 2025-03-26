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
    return (
        <>
            <GatewayDetailSummary
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