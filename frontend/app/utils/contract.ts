import __ENV__ from "@/config";
import { WorkflowStatusEventArgs } from "../types/contract-event";
import WorkflowStatus from "../types/workflow-status";

const contractAddress =
	__ENV__.environment === "development"
		? "0x5fbdb2315678afecb367f032d93f642f64180aa3"
		: "0x56ec41694a4e375a001fa6d64bbb8022d52edb92";

const contractAbi = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "proposalId",
				type: "uint256",
			},
		],
		name: "ProposalRegistered",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "voter",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "proposalId",
				type: "uint256",
			},
		],
		name: "Voted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "voterAddress",
				type: "address",
			},
		],
		name: "VoterRegistered",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "enum Voting.WorkflowStatus",
				name: "previousStatus",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "enum Voting.WorkflowStatus",
				name: "newStatus",
				type: "uint8",
			},
		],
		name: "WorkflowStatusChange",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_desc",
				type: "string",
			},
		],
		name: "addProposal",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_addr",
				type: "address",
			},
		],
		name: "addVoter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "endProposalsRegistering",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "endVotingSession",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "getOneProposal",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "voteCount",
						type: "uint256",
					},
				],
				internalType: "struct Voting.Proposal",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_addr",
				type: "address",
			},
		],
		name: "getVoter",
		outputs: [
			{
				components: [
					{
						internalType: "bool",
						name: "isRegistered",
						type: "bool",
					},
					{
						internalType: "bool",
						name: "hasVoted",
						type: "bool",
					},
					{
						internalType: "uint256",
						name: "votedProposalId",
						type: "uint256",
					},
				],
				internalType: "struct Voting.Voter",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "proposalsArray",
		outputs: [
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "voteCount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "setVote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "startProposalsRegistering",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "startVotingSession",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "winningProposalID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "workflowStatus",
		outputs: [
			{
				internalType: "enum Voting.WorkflowStatus",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

type BaseConfigType = {
	address: `0x${string}`;
	abi: typeof contractAbi;
};

export const baseConfig: BaseConfigType = {
	address: contractAddress as BaseConfigType["address"],
	abi: contractAbi,
};

type parseContractEventArgs = {
	args: WorkflowStatusEventArgs;
};

export const parseContractEvent = ({ args }: parseContractEventArgs) => {
	switch (true) {
		case args.previousStatus === WorkflowStatus.RegisteringVoters &&
			args.newStatus === WorkflowStatus.ProposalsRegistrationStarted:
			return "Proposals registration started";
		case args.previousStatus === WorkflowStatus.ProposalsRegistrationStarted &&
			args.newStatus === WorkflowStatus.ProposalsRegistrationEnded:
			return "Proposals registration ended";
		case args.previousStatus === WorkflowStatus.ProposalsRegistrationEnded &&
			args.newStatus === WorkflowStatus.VotingSessionStarted:
			return "Voting session started";
		case args.previousStatus === WorkflowStatus.VotingSessionStarted &&
			args.newStatus === WorkflowStatus.VotingSessionEnded:
			return "Voting session ended";
		default:
			return false;
	}
};
