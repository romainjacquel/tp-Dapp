import { useAppContext } from "../context/app-context";
import useConnectedWallet from "./use-connected-wallet";

const useIsOwner = () => {
	const context = useAppContext();
	const connectedWallet = useConnectedWallet();

	if (connectedWallet?.address && context?.owner) return connectedWallet?.address === context?.owner;
	return false;
};

export default useIsOwner;
