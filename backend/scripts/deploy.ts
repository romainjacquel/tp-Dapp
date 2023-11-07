import { ethers } from "hardhat";

async function main() {
  console.log(ethers);
  const voting = await ethers.deployContract("Voting");

  await voting.waitForDeployment();

  console.log(`Voting contract deployed to ${voting.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
