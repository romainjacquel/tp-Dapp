import { useAppContext } from "../context";

const useConnectedWallet = () => {
	const context = useAppContext();

	return context?.connectedWallet;
};

export default useConnectedWallet;
