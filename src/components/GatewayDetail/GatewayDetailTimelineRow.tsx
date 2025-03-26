import { SingleGatewayStatsResponseTimeInStatusesS } from "../../api/GatewayApiTypes";
import { GatewayStatsStatusChangeEvent } from "./GatewayDetailTypes";

export interface GatewayDetailTimelineRowProps {
    index: number;
    startTime: Date;
    endTime: Date;
    timeInStatusesS: SingleGatewayStatsResponseTimeInStatusesS;
    statusChangeEvents: GatewayStatsStatusChangeEvent[];

}

export function GatewayDetailTimelineRow({
    index,
    startTime,
    endTime,
    timeInStatusesS,
    statusChangeEvents,
}: GatewayDetailTimelineRowProps) {
    const durationMs = endTime.valueOf() - startTime.valueOf();
    if (durationMs <= 0) throw new Error(`Invalid gateway stats history sample duration: ${durationMs}`);

    const opacityActive = timeInStatusesS.active / durationMs;
    const opacityInactive = timeInStatusesS.inactive / durationMs;
    const opacityUnstable = timeInStatusesS.unstable / durationMs;
    const opacityOffline = timeInStatusesS.offline / durationMs;

    return (
        <tr>
            <td className="gateway-stats-timeline-table-body-timestamp">
                {index % 5 === 0 ? <span>{startTime.toISOString()}</span> : null}
            </td>
            <td className="gateway-stats-timeline-table-body-active" style={{ opacity: opacityActive }}></td>
            <td className="gateway-stats-timeline-table-body-inactive" style={{ opacity: opacityInactive }}></td>
            <td className="gateway-stats-timeline-table-body-unstable" style={{ opacity: opacityUnstable }}></td>
            <td className="gateway-stats-timeline-table-body-offline" style={{ opacity: opacityOffline }}></td>
            <td className="gateway-stats-timeline-table-body-notes">
                <GatewayDetailTimelineRowEvents startTime={startTime} endTime={endTime} statusChangeEvents={statusChangeEvents} />
            </td>
        </tr>
    )
}

interface GatewayDetailTimelineRowEventsProps {
    startTime: Date;
    endTime: Date;
    statusChangeEvents: GatewayStatsStatusChangeEvent[];
}

function GatewayDetailTimelineRowEvents({ startTime, endTime, statusChangeEvents }: GatewayDetailTimelineRowEventsProps) {
    const relevantStatusChangeEvents = statusChangeEvents.filter((statusChangeEvent) => statusChangeEvent.eventTime >= startTime && statusChangeEvent.eventTime < endTime)
    return relevantStatusChangeEvents.map((statusChangeEvent) => `${statusChangeEvent.eventTime.toISOString()} -> ${statusChangeEvent.status}`).reverse().join(", ")
}