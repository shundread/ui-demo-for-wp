import { GatewayDetailTimelineRow } from "./GatewayDetailTimelineRow";
import { GatewayStatsHistorySample, GatewayStatsStatusChangeEvent } from "./GatewayDetailTypes";

export interface GatewayDetailTimelineProps {
    historySamples: GatewayStatsHistorySample[];
    statusChangeEvents: GatewayStatsStatusChangeEvent[];
}


export function GatewayDetailTimeline({ historySamples, statusChangeEvents }: GatewayDetailTimelineProps) {
    // Ideally it would be better to fix the data distortion, but a warning is better than silently doing nothing about the bug
    return (
        <section>
            <h2>Timeline</h2>
            <p>
                <em><b>Note:</b> the timeline may appear distorted at the very first row or very last row of the interval due to it potentially having less data than the bin size at the extremities</em>
            </p>
            <div className="gateway-stats-timeline">
                <table className="gateway-stats-timeline-table">
                    <thead className="gateway-stats-timeline-table-header">
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Active</th>
                            <th scope="col">Inactive</th>
                            <th scope="col">Unstable</th>
                            <th scope="col">Offline</th>
                            <th scope="col">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="gateway-stats-timeline-table-body">
                        {historySamples.map((sample, index) => <GatewayDetailTimelineRow {...sample} index={index} key={sample.startTime.valueOf()} statusChangeEvents={statusChangeEvents} />)}
                    </tbody>
                </table>
            </div>
        </section>
    )
}