import { GatewayListItemProps } from "../GatewayList";

export type GatewayDetailBasicInfoProps = Partial<GatewayListItemProps>;

export function GatewayDetailBasicInfo({
  uuid,
  description,
  model,
  version,
}: GatewayDetailBasicInfoProps) {
  return (
    <section>
      <h2>Basic info</h2>
      <dl>
        <dt>UUID</dt>
        <dd>{uuid}</dd>
        <dt>Description</dt>
        <dd>{description || "data not found"}</dd>
        <dt>Model and version</dt>
        <dd>
          {model && version ? `${model}, version ${version}` : "data not found"}
        </dd>
      </dl>
    </section>
  );
}
