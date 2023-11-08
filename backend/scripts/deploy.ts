import { ethers } from "hardhat";

async function main() {
  const voting = await ethers.deployContract("Voting");

  await voting.waitForDeployment();

  console.log(`Voting contract deployed to ${voting.target}`);

  // essayer de faire le verify ici !!
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
