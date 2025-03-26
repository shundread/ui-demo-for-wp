import { Link } from "react-router";
import { GatewayStatus } from "../../api/GatewayApiTypes";
import { dateStr, timeStr } from "../../utils/timeFormatting";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { storageFieldId } from "../../utils/localStorage";

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
  const [isEditing, setIsEditing] = useState(false);

  // Stored values
  const [storedGatewayId, saveGatewayId] = useLocalStorage(storageFieldId({ uuid, field: "gatewayId" }), gatewayId);
  const [storedDescription, saveDescription] = useLocalStorage(storageFieldId({ uuid, field: "description" }), description);
  const [storedModel, saveModel] = useLocalStorage(storageFieldId({ uuid, field: "model" }), model);
  const [storedVersion, saveVersion] = useLocalStorage(storageFieldId({ uuid, field: "version" }), version)

  // Pending edit values
  const [pendingGatewayId, setPendingGatewayId] = useState(storedGatewayId);
  const [pendingDescription, setPendingDescription] = useState(storedDescription);
  const [pendingModel, setPendingModel] = useState(storedModel);
  const [pendingVersion, setPendingVersion] = useState(storedVersion);

  return (
    <tr>
      <td>
        {isEditing ?
          <>
            <button onClick={() => {
              saveGatewayId(pendingGatewayId);
              saveDescription(pendingDescription);
              saveModel(pendingModel);
              saveVersion(pendingVersion);
              setIsEditing(false);
            }}>Save</button>
            <button onClick={() => {
              setPendingGatewayId(storedGatewayId);
              setPendingDescription(storedDescription);
              setPendingModel(storedModel);
              setPendingVersion(storedVersion);
              setIsEditing(false);
            }}
            >Discard changes</button>
          </>
          : <button onClick={() => setIsEditing(true)}>Edit</button>}
      </td>
      <td>{isEditing ? (
        <input
          type="text"
          id={`${uuid}:gatewayId`}
          name={`${uuid}:gatewayId`}
          value={pendingGatewayId}
          onChange={(event) => setPendingGatewayId(event.target.value)}
        />
      )
        : storedGatewayId}</td>
      <td>{isEditing ? (
        <input
          type="text"
          id={`${uuid}:description`}
          name={`${uuid}:description`}
          value={pendingDescription}
          onChange={(event) => setPendingDescription(event.target.value)}
        />
      )
        : storedDescription}</td>
      <td>{status}</td>
      <td>{isEditing ? (
        <input
          type="text"
          id={`${uuid}:model`}
          name={`${uuid}:model`}
          value={pendingModel}
          onChange={(event) => setPendingModel(event.target.value)}
        />
      )
        : storedModel}</td>
      <td>{isEditing ? (
        <input
          type="text"
          id={`${uuid}:version`}
          name={`${uuid}:version`}
          value={pendingVersion}
          onChange={(event) => setPendingVersion(event.target.value)}
        />
      )
        : storedVersion}</td>
      <td>{dateStr(latestMessageTime)} - {timeStr(latestMessageTime)}</td>
      <td>
        <Link to={{ pathname: `gateway/${uuid}`, }}>
          <span>See details</span>
          <img alt="" src="/icons/link.svg" width="24" height="24"></img>
        </Link>
      </td>
    </tr>
  )
}