import { Link } from "react-router";
import { GatewayStatus } from "../../api/GatewayApiTypes";

export interface GatewayListItemProps {
  uuid: string;
  gatewayId: string;
  description: string;
  status: GatewayStatus;
  model: string;
  version: string;
  latestMessageTime: Date;
}

export function GatewayListItem({
  uuid,
  gatewayId,
  description,
  status,
  model,
  version,
  latestMessageTime,
}: GatewayListItemProps) {
  return (
    <tr>
      <td>{uuid}</td>
      <td>{gatewayId}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{model}</td>
      <td>{version}</td>
      <td>{latestMessageTime.toString() /* TODO proper formatting */}</td>
      <td>
        <Link to={{ pathname: `gateway/${uuid}`, }}>
          <span>See details</span>
          <img alt="" src="/icons/link.svg" width="24" height="24"></img>
        </Link>
      </td>

    </tr>
  )
}