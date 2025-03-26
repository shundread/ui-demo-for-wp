import { GatewayStatsDataSummary, GatewayStatsDataSummaryProps } from "./GatewayStatsDataSummary";
import { GatewayDetailTimeline, GatewayDetailTimelineProps } from "./GatewayDetailTimeline";
import { GatewayListItemProps } from "../GatewayList";
import { GatewayDetailBasicInfo } from "./GatewayDetailBasicInfo";

export interface GatewayDetailProps {
    basicInfo?: GatewayListItemProps;
    summary: GatewayStatsDataSummaryProps;
    timeline: GatewayDetailTimelineProps;
}

export function GatewayDetail({
    basicInfo,
    summary,
    timeline,
}: GatewayDetailProps) {
    return (
        <>
            <GatewayDetailBasicInfo {...basicInfo} />
            <GatewayStatsDataSummary
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