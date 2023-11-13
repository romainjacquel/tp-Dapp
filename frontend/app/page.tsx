"use client";

import { useContractRead } from "wagmi";
import { RegisterVoters } from "./components/register-voter";
import useConnectedWallet from "./hooks/use-connected-wallet";
import { contractAbi, contractAddress } from "./utils/contract";

export default function Home() {
	const connectedWallet = useConnectedWallet();

	console.log(connectedWallet);

	const { data, error, isLoading } = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "workflowStatus",
	});

	console.log(error);

	return <RegisterVoters />;
}
