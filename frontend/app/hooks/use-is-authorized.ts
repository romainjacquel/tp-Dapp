import useGetVoter from "./use-get-voter";
import useIsOwner from "./use-is-owner";

const useIsAuthorized = () => {
	const voter = useGetVoter();
	const isOwner = useIsOwner();

	if (isOwner || voter?.isRegistered) return true;
	return false;
};

export default useIsAuthorized;
