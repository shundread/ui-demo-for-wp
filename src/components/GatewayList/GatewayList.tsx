import { useState } from "react";
import { GatewayListItem, GatewayListItemProps } from "./GatewayListItem";
import { GatewayStatus } from "../../api/GatewayApiTypes";

enum SortingPolicy {
    IdAsc,
    IdDesc,
    StatusAsc,
    StatusDesc,
    LatestAsc,
    LatestDesc,
}

export interface GatewayListProps {
    gateways: GatewayListItemProps[];
}

export function GatewayList({ gateways }: GatewayListProps) {
    const [sortingPolicy, setSortingPolicy] = useState(SortingPolicy.LatestDesc);

    const [gatewayIdFilter, setGatewayIdFilter] = useState("");
    const [gatewayDescriptionFilter, setGatewayDescriptionFilter] = useState("");
    const [gatewayStatusFilter, setGatewayStatusFilter] = useState<GatewayStatus | null>(null);
    const [gatewayModelFilter, setGatewayModelFilter] = useState("");
    const [gatewayVersionFilter, setGatewayVersionFilter] = useState("");

    const sortedAndFilteredGateways = gatewaySort(gateways, sortingPolicy)
        .filter((gateway) => gateway.gatewayId.includes(gatewayIdFilter))
        .filter((gateway) => gateway.description.includes(gatewayDescriptionFilter))
        .filter((gateway) => gatewayStatusFilter === null || gateway.status === gatewayStatusFilter)
        .filter((gateway) => gateway.model.includes(gatewayModelFilter))
        .filter((gateway) => gateway.version.includes(gatewayVersionFilter));

    return (
        <>
            <p>
                {gateways.length} gateways.
                {gateways.length > sortedAndFilteredGateways.length
                    ? `(${gateways.length - sortedAndFilteredGateways.length} hidden by filters)`
                    : null
                }
            </p>

            <table className="gateway-list">
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <input
                                type="text"
                                id="idFilter"
                                name="idFilter"
                                placeholder="Filter by ID"
                                value={gatewayIdFilter}
                                onChange={(event) => setGatewayIdFilter(event.target.value)}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                id="descriptionFilter"
                                name="descriptionFilter"
                                placeholder="Filter by description"
                                value={gatewayDescriptionFilter}
                                onChange={(event) => setGatewayDescriptionFilter(event.target.value)}
                            />
                        </th>
                        <th>
                            <select
                                name="statusFilter"
                                id="statusFilter"
                                value={gatewayStatusFilter || ""}
                                onChange={(event) => setGatewayStatusFilter((event.target.value ? event.target.value : null) as null | GatewayStatus)}>
                                <option value={""}>Any status</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="UNSTABLE">Unstable</option>
                                <option value="OFFLINE">Offline</option>
                            </select>
                        </th>
                        <th>
                            <input
                                type="text"
                                id="modelFilter"
                                name="modelFilter"
                                placeholder="Filter by model"
                                value={gatewayModelFilter}
                                onChange={(event) => setGatewayModelFilter(event.target.value)}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                id="versionFilter"
                                name="versionFilter"
                                placeholder="Filter by version"
                                value={gatewayVersionFilter}
                                onChange={(event) => setGatewayVersionFilter(event.target.value)}
                            />
                        </th>
                        <th colSpan={2}>
                            <button onClick={() => {
                                setGatewayIdFilter("");
                                setGatewayDescriptionFilter("");
                                setGatewayStatusFilter(null);
                                setGatewayModelFilter("");
                                setGatewayVersionFilter("");
                            }}>
                                Clear all filters
                            </button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">UUID</th>
                        <th scope="col">
                            <button onClick={
                                () => sortingPolicy === SortingPolicy.IdAsc
                                    ? setSortingPolicy(SortingPolicy.IdDesc)
                                    : setSortingPolicy(SortingPolicy.IdAsc)
                            }>
                                <span>Gateway ID</span>
                                {sortingPolicy === SortingPolicy.IdAsc ? <ArrowUp /> : null}
                                {sortingPolicy === SortingPolicy.IdDesc ? <ArrowDown /> : null}
                            </button>
                        </th>
                        <th scope="col">Description</th>
                        <th scope="col">
                            <button onClick={
                                () => sortingPolicy === SortingPolicy.StatusAsc
                                    ? setSortingPolicy(SortingPolicy.StatusDesc)
                                    : setSortingPolicy(SortingPolicy.StatusAsc)
                            }>
                                <span>Status</span>
                                {sortingPolicy === SortingPolicy.StatusAsc ? <ArrowUp /> : null}
                                {sortingPolicy === SortingPolicy.StatusDesc ? <ArrowDown /> : null}
                            </button>
                        </th>
                        <th scope="col">Model</th>
                        <th scope="col">Version</th>
                        <th scope="col">
                            <button onClick={
                                () => sortingPolicy === SortingPolicy.LatestAsc
                                    ? setSortingPolicy(SortingPolicy.LatestDesc)
                                    : setSortingPolicy(SortingPolicy.LatestAsc)
                            }>
                                <span>Latest message</span>
                                {sortingPolicy === SortingPolicy.LatestAsc ? <ArrowUp /> : null}
                                {sortingPolicy === SortingPolicy.LatestDesc ? <ArrowDown /> : null}
                            </button>
                        </th>
                        <th className="sr-only">Link to details</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAndFilteredGateways.map((gateway) =>
                        <GatewayListItem key={gateway.uuid} {...gateway} />)}
                </tbody>
            </table>
        </>
    )
}

function ArrowUp() {
    return <img src="/icons/arrow-big-up.svg" width="24" height="24" alt="" />;
}

function ArrowDown() {
    return <img src="/icons/arrow-big-down.svg" width="24" height="24" alt="" />;
}

function gatewaySort(gateways: GatewayListItemProps[], sortingPolicy: SortingPolicy) {
    switch (sortingPolicy) {
        case SortingPolicy.IdAsc:
            return gateways.sort((a, b) => a.gatewayId < b.gatewayId ? -1 : 1);
        case SortingPolicy.IdDesc:
            return gateways.sort((a, b) => a.gatewayId > b.gatewayId ? -1 : 1);
        case SortingPolicy.StatusAsc:
            return gateways.sort((a, b) => statusOrder(a.status) - statusOrder(b.status))
        case SortingPolicy.StatusDesc:
            return gateways.sort((a, b) => statusOrder(b.status) - statusOrder(a.status))
        case SortingPolicy.LatestAsc:
            return gateways.sort((a, b) => a.latestMessageTime < b.latestMessageTime ? -1 : 1);
        case SortingPolicy.LatestDesc:
            return gateways.sort((a, b) => a.latestMessageTime > b.latestMessageTime ? -1 : 1);

    }
}

function statusOrder(status: GatewayStatus) {
    switch (status) {
        case "ACTIVE": return 0;
        case "INACTIVE": return 1;
        case "UNSTABLE": return 2;
        case "OFFLINE": return 3;
    }
}