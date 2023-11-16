"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

export function ChakraUiWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<CacheProvider>
			<ChakraProvider toastOptions={{ defaultOptions: { duration: 6000, isClosable: true, position: "top-right" } }}>
				{children}
			</ChakraProvider>
		</CacheProvider>
	);
}
