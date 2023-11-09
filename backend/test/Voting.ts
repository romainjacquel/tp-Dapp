import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { describe, it } from "mocha";

const proposalName = "Proposal foo";

describe("Voting", () => {
	async function deployVotingContract() {
		const [owner, addr1, addr2] = await ethers.getSigners();

		const Voting = await ethers.getContractFactory("Voting");
		// biome-ignore lint/suspicious/noExplicitAny: Hard to type the contract, see this later.
		const voting: any = await Voting.deploy();

		return { voting, owner, addr1, addr2 };
	}

	describe("Deploy", () => {
		it("should set the owner to the right owner", async () => {
			const { voting, owner } = await loadFixture(deployVotingContract);

			expect(await voting.owner()).to.equal(owner.address);
		});
	});

	describe("WorkflowStatus", () => {
		describe("Revert", () => {
			it("should revert => proposals cant be started now", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await voting.startProposalsRegistering();
				await voting.endProposalsRegistering();

				await expect(voting.startProposalsRegistering()).to.be.revertedWith("Registering proposals cant be started now");
			});

			it("should revert => proposals havent started yet", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await expect(voting.endProposalsRegistering()).to.be.revertedWith("Registering proposals havent started yet");
			});

			it("should revert => proposals phase is not finished", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await expect(voting.startVotingSession()).to.be.revertedWith("Registering proposals phase is not finished");
			});

			it("should revert => session havent started yet", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await expect(voting.endVotingSession()).to.be.revertedWith("Voting session havent started yet");
			});
		});

		describe("success", () => {
			it("should be equal to => RegisteringVoters", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				expect(await voting.workflowStatus()).to.equal(0);
			});

			it("should be equal to => ProposalsRegistrationStarted", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await voting.startProposalsRegistering();

				expect(await voting.workflowStatus()).to.equal(1);
			});

			it("should be equal to => ProposalsRegistrationEnded", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await voting.startProposalsRegistering();
				await voting.endProposalsRegistering();

				expect(await voting.workflowStatus()).to.equal(2);
			});

			it("should be equal to => VotingSessionStarted", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await voting.startProposalsRegistering();
				await voting.endProposalsRegistering();
				await voting.startVotingSession();

				expect(await voting.workflowStatus()).to.equal(3);
			});

			it("should be equal to => VotingSessionEnded", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await voting.startProposalsRegistering();
				await voting.endProposalsRegistering();
				await voting.startVotingSession();
				await voting.endVotingSession();

				expect(await voting.workflowStatus()).to.equal(4);
			});

			it("should emit => WorkflowStatusChange", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await expect(voting.startProposalsRegistering()).to.emit(voting, "WorkflowStatusChange");
			});
		});
	});

	describe("Voter", () => {
		describe("Get", () => {
			it("should revert => not a voter", async () => {
				const { voting, addr1, addr2 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);

				await expect(voting.connect(addr2).getVoter(addr1.address)).to.be.revertedWith("You're not a voter");
			});

			it("should return a voter", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);

				const [isRegistered] = await voting.connect(addr1).getVoter(addr1.address);

				expect(isRegistered).to.be.true;
			});
		});

		describe("Add", () => {
			it("should revert => not the owner", async () => {
				const { voting, addr1, addr2 } = await loadFixture(deployVotingContract);

				await expect(voting.connect(addr1).addVoter(addr2.address)).to.be.revertedWithCustomError(
					voting,
					"OwnableUnauthorizedAccount",
				);
			});

			it("should revert => wrong workflow status", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.startProposalsRegistering();

				await expect(voting.addVoter(addr1.address)).to.be.revertedWith("Voters registration is not open yet");
			});

			it("should add voter", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);

				const [isRegistered] = await voting.connect(addr1).getVoter(addr1.address);

				expect(isRegistered).to.be.true;
			});

			it("should revert => voter already registerd", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);

				await expect(voting.addVoter(addr1.address)).to.be.revertedWith("Already registered");
			});

			it("should emit event => VoterRegistered", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await expect(voting.addVoter(addr1.address)).to.emit(voting, "VoterRegistered").withArgs(addr1.address);
			});
		});
	});

	describe("Proposal", () => {
		describe("Get", () => {
			it("should revert => not a voter", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await expect(voting.connect(addr1).getOneProposal(0)).to.be.revertedWith("You're not a voter");
			});

			it("should should return a proposal", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();
				await voting.connect(addr1).addProposal(proposalName);

				const [_proposalName] = await voting.connect(addr1).getOneProposal(1);
				expect(_proposalName).to.be.equal(proposalName);
			});
		});

		describe("Add", () => {
			it("should revert => wrong workflow status", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);

				await expect(voting.connect(addr1).addProposal(proposalName)).to.be.revertedWith("Proposals are not allowed yet");
			});

			it("should revert => proposal is empty", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();

				await expect(voting.connect(addr1).addProposal("")).to.be.revertedWith("Vous ne pouvez pas ne rien proposer");
			});

			it("should add a proposal", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();
				await voting.connect(addr1).addProposal(proposalName);

				const [_proposalName] = await voting.connect(addr1).getOneProposal(1);
				expect(_proposalName).to.be.equal(proposalName);
			});

			it("should emit event => ProposalRegistered", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();

				await expect(voting.connect(addr1).addProposal(proposalName)).to.emit(voting, "ProposalRegistered");
			});
		});
	});

	describe("Vote", () => {
		describe("Add", () => {
			it("should revert => not a voter", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await expect(voting.connect(addr1).setVote(1)).to.be.revertedWith("You're not a voter");
			});

			it("should revert => wrong workflow status", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);
				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();
				await voting.connect(addr1).addProposal(proposalName);

				await expect(voting.connect(addr1).setVote(1)).to.be.revertedWith("Voting session havent started yet");
			});

			it("should revert => already voted", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();
				await voting.connect(addr1).addProposal(proposalName);
				await voting.endProposalsRegistering();
				await voting.startVotingSession();
				await voting.connect(addr1).setVote(1);

				await expect(voting.connect(addr1).setVote(1)).to.be.revertedWith("You have already voted");
			});

			it("should revert => proposal not found", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();
				await voting.connect(addr1).addProposal(proposalName);
				await voting.endProposalsRegistering();
				await voting.startVotingSession();

				await expect(voting.connect(addr1).setVote(5)).to.be.revertedWith("Proposal not found");
			});

			it("should add a vote to a proposal", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();
				await voting.connect(addr1).addProposal(proposalName);
				await voting.endProposalsRegistering();
				await voting.startVotingSession();
				await voting.connect(addr1).setVote(1);
				const [_, hasVoted] = await voting.connect(addr1).getVoter(addr1.address);

				expect(hasVoted).to.be.true;
			});

			it("should emit event => ProposalRegistered", async () => {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await voting.addVoter(addr1.address);
				await voting.startProposalsRegistering();
				await voting.connect(addr1).addProposal(proposalName);
				await voting.endProposalsRegistering();
				await voting.startVotingSession();

				await expect(voting.connect(addr1).setVote(1)).to.emit(voting, "Voted");
			});
		});
	});

	describe("Vote result", () => {
		it("should revert => status is not voting session ended", async () => {
			const { voting, addr1 } = await loadFixture(deployVotingContract);

			await voting.addVoter(addr1.address);
			await voting.startProposalsRegistering();
			await voting.connect(addr1).addProposal(proposalName);
			await voting.connect(addr1).addProposal("Proposal hello world");
			await voting.endProposalsRegistering();
			await voting.startVotingSession();
			await voting.connect(addr1).setVote(1);

			await expect(voting.tallyVotes()).to.be.revertedWith("Current status is not voting session ended");
		});

		it("should return the winner proposal", async () => {
			const { voting, addr1 } = await loadFixture(deployVotingContract);

			await voting.addVoter(addr1.address);
			await voting.startProposalsRegistering();
			await voting.connect(addr1).addProposal(proposalName);
			await voting.connect(addr1).addProposal("Proposal hello world");
			await voting.endProposalsRegistering();
			await voting.startVotingSession();
			await voting.connect(addr1).setVote(1);
			await voting.endVotingSession();
			await voting.tallyVotes();

			expect(await voting.winningProposalID()).to.be.equal(1);
		});
	});
});
