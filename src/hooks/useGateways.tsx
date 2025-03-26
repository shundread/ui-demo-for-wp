import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import { GatewayListItemProps } from "../components/GatewayList";

interface GatewaysProviderState {
    gateways: GatewayListItemProps[];
}

interface UseGatewaysValue extends GatewaysProviderState {
    updateGateway(updatedGateway: GatewayListItemProps): void;
}

const GatewaysContext = createContext<null | UseGatewaysValue>(null);

interface GatewaysProviderProps {
    initGateways: GatewayListItemProps[];
}

export function GatewaysProvider({ children, initGateways }: PropsWithChildren<GatewaysProviderProps>) {
    const [gateways, setGateways] = useState(initGateways);

    const updateGateway = useCallback((updatedGateway: GatewayListItemProps) => {
        setGateways(gateways =>
            gateways.map((gateway) => gateway.uuid === updatedGateway.uuid ? updatedGateway : gateway)
        );
    }, [setGateways])

    const value: UseGatewaysValue = {
        gateways,
        updateGateway,
    }

    return (
        <GatewaysContext.Provider value={value}>
            {children}
        </GatewaysContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGateways(): UseGatewaysValue {
    const context = useContext(GatewaysContext);
    if (context === null) {
        throw new Error(`Missing a provider for useGateways`);
    }
    return context;
}