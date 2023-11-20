import { useAppContext } from "../context/app-context";

const useGetVoter = () => {
	const context = useAppContext();

	return context?.voter;
};

export default useGetVoter;
