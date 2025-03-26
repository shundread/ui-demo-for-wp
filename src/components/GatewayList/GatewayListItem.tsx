import { Link } from "react-router";
import { GatewayStatus } from "../../api/GatewayApiTypes";
import { dateStr, timeStr } from "../../utils/timeFormatting";
import { useState } from "react";
import { useGateways } from "../../hooks/useGateways";

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
  const { updateGateway } = useGateways();

  // Pending edit values
  const [isEditing, setIsEditing] = useState(false);
  const [pendingGatewayId, setPendingGatewayId] = useState(gatewayId);
  const [pendingDescription, setPendingDescription] = useState(description);
  const [pendingModel, setPendingModel] = useState(model);
  const [pendingVersion, setPendingVersion] = useState(version);

  return (
    <tr>
      <td>
        {isEditing ? (
          <>
            <button
              onClick={() => {
                updateGateway({
                  uuid,
                  gatewayId: pendingGatewayId,
                  description: pendingDescription,
                  model: pendingModel,
                  version: pendingVersion,
                  status,
                  latestMessageTime,
                });
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setPendingGatewayId(gatewayId);
                setPendingDescription(description);
                setPendingModel(model);
                setPendingVersion(version);
                setIsEditing(false);
              }}
            >
              Discard changes
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            id={`${uuid}:gatewayId`}
            name={`${uuid}:gatewayId`}
            value={pendingGatewayId}
            onChange={(event) => setPendingGatewayId(event.target.value)}
          />
        ) : (
          gatewayId
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            id={`${uuid}:description`}
            name={`${uuid}:description`}
            value={pendingDescription}
            onChange={(event) => setPendingDescription(event.target.value)}
          />
        ) : (
          description
        )}
      </td>
      <td>{status}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            id={`${uuid}:model`}
            name={`${uuid}:model`}
            value={pendingModel}
            onChange={(event) => setPendingModel(event.target.value)}
          />
        ) : (
          model
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            id={`${uuid}:version`}
            name={`${uuid}:version`}
            value={pendingVersion}
            onChange={(event) => setPendingVersion(event.target.value)}
          />
        ) : (
          version
        )}
      </td>
      <td>
        {dateStr(latestMessageTime)} - {timeStr(latestMessageTime)}
      </td>
      <td>
        <Link to={{ pathname: `gateway/${uuid}` }}>
          <span>See details</span>
          <img alt="" src="/icons/link.svg" width="24" height="24"></img>
        </Link>
      </td>
    </tr>
  );
}
