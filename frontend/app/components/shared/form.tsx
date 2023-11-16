import { Button, FormControl, FormHelperText, FormLabel, Grid, Input } from "@chakra-ui/react";
import React from "react";

type FormProps = {
	inputValue: string | number | null;
	inputType: HTMLInputElement["type"];
	setInputValue:
		| React.Dispatch<React.SetStateAction<string | null>>
		| React.Dispatch<React.SetStateAction<number | null>>;
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

// todo => Fix any type
export const Form = ({
	inputValue,
	inputType,
	setInputValue,
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
			<Input
				type={inputType}
				placeholder={placeholder}
				value={inputValue as any}
				onChange={(e) => {
					setInputValue(e.target.value as any);
				}}
			/>
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
