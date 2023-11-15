import { Heading } from "@chakra-ui/react";

export const HeadLabel = ({ label }: { label: string }) => (
	<Heading py="4" color="teal.500">
		{label}
	</Heading>
);
