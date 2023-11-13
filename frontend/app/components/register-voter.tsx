"use client";

import { contractAbi, contractAddress } from "@/app/utils/contract";
import { Button, Container, FormControl, FormLabel, Grid, Heading, Input } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const RegisterVoters = () => {
	const { config } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "startProposalsRegistering",
	});

	const { write: startProposalsRegistering, error } = useContractWrite(config);

	console.log(startProposalsRegistering, error);

	return (
		<Container maxW="8xl" centerContent>
			<Heading py="4" color="teal.500">
				Register voters
			</Heading>
			<form onSubmit={() => console.log("submit")}>
				<Grid templateRows="repeat(2, 1fr)" gap={4}>
					<FormControl w="2xl">
						<FormLabel>Voter address</FormLabel>
						<Input type="text" placeholder="0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" />
						{/* <FormHelperText>Enter a valid adress (ex: )</FormHelperText> */}
					</FormControl>
					<Grid templateColumns="repeat(2, 1fr)" gap={4}>
						<Button
							type="button"
							isLoading={false}
							loadingText="Submitting"
							colorScheme="red"
							variant="outline"
							onClick={startProposalsRegistering}
						>
							Start Proposal Registering
						</Button>
						<Button type="submit" isLoading={false} loadingText="Submitting" colorScheme="teal" variant="solid">
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};
