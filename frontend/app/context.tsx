"use client";

import { ReactNode, createContext, useContext } from "react";
import { useAccount } from "wagmi";
import { GetAccountResult } from "wagmi/actions";

export type AppContextType = {
	connectedWallet: GetAccountResult;
} | null;

const AppContext = createContext<AppContextType>(null);

export function AppContextWrapper({ children }: { children: ReactNode }) {
	const wallet = useAccount();
	const value = {
		connectedWallet: wallet,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
