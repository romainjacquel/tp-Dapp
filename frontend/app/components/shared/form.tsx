import { Button, FormControl, FormHelperText, FormLabel, Grid, Input } from "@chakra-ui/react";

type FormProps = {
	formLabel: string;
	placeholder: string;
	nextStepLabel: string;
	nextStepFn: (() => void) | undefined;
	nextStepLoading: boolean;
	actionLabel: string;
	actionFn: (() => void) | undefined;
	actionLoading: boolean;
	textHelperLabel?: string;
};

export const Form = ({
	formLabel,
	placeholder,
	nextStepLabel,
	nextStepFn,
	nextStepLoading,
	actionLabel,
	actionFn,
	actionLoading,
	textHelperLabel,
}: FormProps) => (
	<Grid templateRows="repeat(2, 1fr)" gap={4}>
		<FormControl w="2xl">
			<FormLabel>{formLabel}</FormLabel>
			<Input type="text" placeholder={placeholder} />
			{textHelperLabel !== undefined && <FormHelperText>{textHelperLabel}</FormHelperText>}
		</FormControl>
		<Grid templateColumns="repeat(2, 1fr)" gap={4}>
			<Button
				type="button"
				isLoading={nextStepLoading}
				loadingText="Transaction pending"
				colorScheme="red"
				variant="outline"
				onClick={nextStepFn}
			>
				{nextStepLabel}
			</Button>
			<Button
				type="button"
				onClick={actionFn}
				isLoading={actionLoading}
				loadingText="Submitting"
				colorScheme="teal"
				variant="solid"
			>
				{actionLabel}
			</Button>
		</Grid>
	</Grid>
);
