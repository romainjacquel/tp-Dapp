import { Table as ChakraUiTable, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { ReactNode } from "react";

type TableHeadProps = {
	columns: string[];
};

export const TableHead = ({ columns }: TableHeadProps) => {
	return (
		<Thead>
			<Tr>
				{columns.map((column, index) => (
					<Th key={index}>{column}</Th>
				))}
			</Tr>
		</Thead>
	);
};

type TableProps = TableHeadProps & { children: ReactNode };

export const Table = ({ columns, children }: TableProps) => {
	return (
		<TableContainer>
			<ChakraUiTable variant="simple">
				<TableHead columns={columns} />
				<Tbody>{children}</Tbody>
			</ChakraUiTable>
		</TableContainer>
	);
};
