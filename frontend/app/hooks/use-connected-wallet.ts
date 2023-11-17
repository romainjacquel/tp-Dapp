import { useAppContext } from "../context/app-context";

const useConnectedWallet = () => {
	const context = useAppContext();

	return context?.connectedWallet;
};

export default useConnectedWallet;
