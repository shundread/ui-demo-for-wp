import { GatewayStatus, SingleGatewayStatsResponseTimeInStatusesS } from "../../api/GatewayApiTypes";

export interface GatewayDetailSummaryProps {
    startTime: Date;
    endTime: Date;
    latestStatus: GatewayStatus;
    timeInStatusesS: SingleGatewayStatsResponseTimeInStatusesS;
}

export function GatewayDetailSummary({
    startTime,
    endTime,
    latestStatus,
    timeInStatusesS
}: GatewayDetailSummaryProps) {
    return (
        <section>
            <h2>Summary</h2>
            <dl>
                <dt>Data interval</dt>
                <dd>{startTime.toISOString()} - {endTime.toISOString()} (this many seconds)</dd>
                <dt>Latest status</dt>
                <dd>{latestStatus}</dd>
                <dt>Time spent in different statuses</dt>
                <dd>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Active</th>
                                <th scope="col">Inactive</th>
                                <th scope="col">Unstable</th>
                                <th scope="col">Offline</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {timeInStatusesS.active}
                                </td>
                                <td>
                                    {timeInStatusesS.inactive}
                                </td>
                                <td>
                                    {timeInStatusesS.unstable}
                                </td>
                                <td>
                                    {timeInStatusesS.offline}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </dd>
            </dl>
        </section>
    )
}