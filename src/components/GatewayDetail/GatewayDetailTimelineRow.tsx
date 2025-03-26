import { SingleGatewayStatsResponseTimeInStatusesS } from "../../api/GatewayApiTypes";
import { shortDateStr, timeStr } from "../../utils/timeFormatting";
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
  // For most bins the following will do:
  //
  //      const durationS = (endTime.valueOf() - startTime.valueOf()) / 1000;
  //
  // However at the extremities this doesn't hold true, so we do this workaround:
  const durationS =
    timeInStatusesS.active +
    timeInStatusesS.inactive +
    timeInStatusesS.unstable +
    timeInStatusesS.offline;
  if (durationS <= 0)
    throw new Error(
      `Invalid gateway stats history sample duration: ${durationS}`,
    );

  const shareActive = timeInStatusesS.active / durationS;
  const shareInactive = timeInStatusesS.inactive / durationS;
  const shareUnstable = timeInStatusesS.unstable / durationS;
  const shareOffline = timeInStatusesS.offline / durationS;

  const numberFormatter = Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
  });

  return (
    <tr>
      <td className="gateway-stats-timeline-table-body-timestamp">
        {index % 5 === 0 ? (
          <span>
            {shortDateStr(startTime)} - {timeStr(startTime)}
          </span>
        ) : null}
      </td>
      <td
        className="gateway-stats-timeline-table-body-active"
        style={{ opacity: shareActive ? 1 : 0 }}
      >
        {shareActive > 0 ? (
          <span>{numberFormatter.format(shareActive)}</span>
        ) : null}
      </td>
      <td
        className="gateway-stats-timeline-table-body-inactive"
        style={{ opacity: shareInactive ? 1 : 0 }}
      >
        {shareInactive > 0 ? (
          <span>{numberFormatter.format(shareInactive)}</span>
        ) : null}
      </td>
      <td
        className="gateway-stats-timeline-table-body-unstable"
        style={{ opacity: shareUnstable ? 1 : 0 }}
      >
        {shareUnstable > 0 ? (
          <span>{numberFormatter.format(shareUnstable)}</span>
        ) : null}
      </td>
      <td
        className="gateway-stats-timeline-table-body-offline"
        style={{ opacity: shareOffline ? 1 : 0 }}
      >
        {shareOffline > 0 ? (
          <span>{numberFormatter.format(shareOffline)}</span>
        ) : null}
      </td>
      <td className="gateway-stats-timeline-table-body-notes">
        <GatewayDetailTimelineRowEvents
          startTime={startTime}
          endTime={endTime}
          statusChangeEvents={statusChangeEvents}
        />
      </td>
    </tr>
  );
}

interface GatewayDetailTimelineRowEventsProps {
  startTime: Date;
  endTime: Date;
  statusChangeEvents: GatewayStatsStatusChangeEvent[];
}

function GatewayDetailTimelineRowEvents({
  startTime,
  endTime,
  statusChangeEvents,
}: GatewayDetailTimelineRowEventsProps) {
  const relevantStatusChangeEvents = statusChangeEvents.filter(
    (statusChangeEvent) =>
      statusChangeEvent.eventTime >= startTime &&
      statusChangeEvent.eventTime < endTime,
  );
  return relevantStatusChangeEvents
    .map(
      (statusChangeEvent) =>
        `${timeStr(statusChangeEvent.eventTime)} -> ${statusChangeEvent.status}`,
    )
    .reverse()
    .join(", ");
}
