// TODO (thiago) 2025-03-25
//
// Ideally this would be generated from some openapi spec and some code generation tool, such as
// openapi-generation tool
//
// Alternatively use zod to validate the data and use type inferrence to declare the types
//
// For now we just manually declare them

// TODO (thiago) 2025-03-25 Make this an enumerable type?
export type GatewayStatus = "ACTIVE" | "INACTIVE" | "UNSTABLE" | "OFFLINE";

export interface GatewayListingResponse {
    results: GatewayListingResponseStatus[];
    metadata: {
        resultsCount: number;
    }
}

interface GatewayListingResponseStatus {
    uuid: string; // UUID4
    modificationTime: number; // Timestamp
    description: string;
    gatewayId: string;
    networkUuid: string; // UUID4
    sinkNodes: string[]; // UUID4
    model: string;
    version: string;
    status: GatewayStatus;
    gatewayStatistics: {
        lastMessageRxTime: number; // Timestamp
    }
}

export interface SingleGatewayStatsResponse {
    snapshotTime: number; // Timestamp
    summary: SingleGatewayStatsResponseSummary;
    historySamples: SingleGatewayStatsResponseHistorySample[];
    statusChangeEvents: SingleGatewayStatsResponseStatusChangeEvent[];
}

interface SingleGatewayStatsResponseSummary {
    startTime: number; // Timestamp
    endTime: number; // Timestamp
    startTimeStatus: GatewayStatus;
    endTimeStatus: GatewayStatus;
    timeInStatusesS: SingleGatewayStatsResponseTimeInStatusesS;
    statusTransitionCounts: SingleGatewayStatsResponseStatusTransitionCounts;
}

export interface SingleGatewayStatsResponseTimeInStatusesS {
    // These roughly add up to 900 though there may be floating point errors
    // during transition and at the boundaries of the response time interval
    // the total may be significantly smaller
    active: number;
    inactive: number;
    unstable: number;
    offline: number;
}

export interface SingleGatewayStatsResponseStatusTransitionCounts {
    // These may add up to more than one even within a single sample, though
    // in most samples of a well-behaved network they will be zero
    activeToInactive: number;
    activeToUnstable: number;
    inactiveToOffline: number;
    inactiveToActive: number;
    unstableToActive: number;
    unstableToOffline: number;
    offlineToActive: number;
}

export interface SingleGatewayStatsResponseHistorySample {
    startTime: number; // Timestamp
    endTime: number; // Timestamp
    timeInStatusesS: SingleGatewayStatsResponseTimeInStatusesS;
    statusTransitionCounts: SingleGatewayStatsResponseStatusTransitionCounts;
}

export interface SingleGatewayStatsResponseStatusChangeEvent {
    statusChangeTime: number; // Timestamp
    status: GatewayStatus;
}
