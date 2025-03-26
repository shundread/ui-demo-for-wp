import { SingleGatewayStatsResponseTimeInStatusesS, SingleGatewayStatsResponseStatusTransitionCounts, GatewayStatus } from "../../api/GatewayApiTypes";

export interface GatewayStatsHistorySample {
    startTime: Date;
    endTime: Date;
    timeInStatusesS: SingleGatewayStatsResponseTimeInStatusesS;
    statusTransitionCounts: SingleGatewayStatsResponseStatusTransitionCounts;
}

export interface GatewayStatsStatusChangeEvent {
    eventTime: Date;
    status: GatewayStatus;
}
