import { GatewayListItem, GatewayListItemProps } from "./GatewayListItem";


export interface GatewayListProps {
    gateways: GatewayListItemProps[];
}

export function GatewayList({ gateways }: GatewayListProps) {

    return (
        <table className="gateway-list">
            <thead>
                <tr>
                    <th scope="col">UUID</th>
                    <th scope="col">Gateway ID</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Model</th>
                    <th scope="col">Version</th>
                    <th scope="col">Latest message</th>
                    <th className="sr-only">Link to details</th>
                </tr>
            </thead>
            <tbody>
                {gateways.map((gateway) =>
                    <GatewayListItem key={gateway.uuid} {...gateway} />)}
            </tbody>
        </table>
    )
}
