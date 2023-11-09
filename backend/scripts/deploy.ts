import { ethers } from "hardhat";

async function main() {
	const voting = await ethers.deployContract("Voting");

	await voting.waitForDeployment();

	// biome-ignore lint/suspicious/noConsoleLog: Log message
	console.log(`Voting contract deployed to ${voting.target}`);

	// essayer de faire le verify ici !!
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
