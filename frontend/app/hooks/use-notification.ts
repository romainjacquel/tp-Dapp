import { useAppContext } from "../context/app-context";

const useNotification = () => {
	const context = useAppContext();

	return context?.notification;
};

export default useNotification;
