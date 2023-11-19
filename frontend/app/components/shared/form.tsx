import useIsOwner from "@/app/hooks/use-is-owner";
import { Button, FormControl, FormHelperText, FormLabel, Grid, Input, InputProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type FormProps = {
	inputValue: InputProps["value"];
	inputType: HTMLInputElement["type"];
	setInputValue: Dispatch<SetStateAction<string | undefined>> | Dispatch<SetStateAction<number | undefined>>;
	formLabel: string;
	placeholder: string;
	nextStepLabel: string;
	nextStepFn: (() => void) | undefined;
	nextStepLoading: boolean;
	actionLabel: string;
	actionFn: (() => void) | undefined;
	actionLoading: boolean;
	nextStepButtonLoadingText?: string;
	actionButtonLoadingText?: string;
	textHelperLabel?: string;
};

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
	nextStepButtonLoadingText = "Transaction Pending",
	actionButtonLoadingText = "Submitting",
}: FormProps) => {
	const isOwner = useIsOwner();

	return (
		<Grid templateRows="repeat(2, 1fr)" gap={4}>
			<FormControl w="2xl">
				<FormLabel>{formLabel}</FormLabel>
				<Input
					type={inputType}
					placeholder={placeholder}
					value={inputValue}
					onChange={(e) => {
						// biome-ignore lint/suspicious/noExplicitAny: Hard to type this, too many types possibles.
						setInputValue(e.target.value as any);
					}}
				/>
				{textHelperLabel !== undefined && <FormHelperText>{textHelperLabel}</FormHelperText>}
			</FormControl>
			{isOwner ? (
				<Grid templateColumns="repeat(2, 1fr)" gap={4}>
					<Button
						type="button"
						isLoading={nextStepLoading}
						loadingText={nextStepButtonLoadingText}
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
						loadingText={actionButtonLoadingText}
						colorScheme="teal"
						variant="solid"
					>
						{actionLabel}
					</Button>
				</Grid>
			) : (
				<Button
					type="button"
					onClick={actionFn}
					isLoading={actionLoading}
					loadingText={actionButtonLoadingText}
					colorScheme="teal"
					variant="solid"
				>
					{actionLabel}
				</Button>
			)}
		</Grid>
	);
};
