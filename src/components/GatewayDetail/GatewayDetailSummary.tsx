import { GatewayStatus, SingleGatewayStatsResponseTimeInStatusesS } from "../../api/GatewayApiTypes";
import { dateStr, timeStr } from "../../utils/timeFormatting";

export interface GatewayDetailSummaryProps {
    gatewayId?: string;
    description?: string;
    model?: string;
    version?: string;
    startTime: Date;
    endTime: Date;
    latestStatus: GatewayStatus;
    timeInStatusesS: SingleGatewayStatsResponseTimeInStatusesS;
}

export function GatewayDetailSummary({
    gatewayId,
    description,
    model,
    version,
    startTime,
    endTime,
    latestStatus,
    timeInStatusesS
}: GatewayDetailSummaryProps) {
    return (
        <section>
            <h2>Summary</h2>
            <dl>
                <dt>Gateway ID</dt>
                <dd>{gatewayId || "gateway details not found"}</dd>
                <dt>Description</dt>
                <dd>{description || "gateway details not found"}</dd>
                <dt>Model and version</dt>
                <dd>{model && version ? `${model}, version ${version}` : "gateway details not found"}</dd>
                <dt>Earliest sample</dt>
                <dd>{dateStr(startTime)} - {timeStr(startTime)}</dd>
                <dt>Latest sample</dt>
                <dd>{dateStr(endTime)} - {timeStr(endTime)}</dd>
                <dt>Latest status</dt>
                <dd>{latestStatus}</dd>
                <dt>Time spent in different statuses (in seconds)</dt>
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