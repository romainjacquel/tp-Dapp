// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting
 * @dev Smart contract for a simple voting system.
 */
contract Voting is Ownable {

    // Winning proposal ID
    uint public winningProposalID;

    // Voter structure
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    // Proposal structure
    struct Proposal {
        string description;
        uint voteCount;
    }

    // Workflow status enumeration
    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    // Current workflow status
    WorkflowStatus public workflowStatus;

    // Array to store proposals
    Proposal[] proposalsArray;

    // Mapping to store voter information
    mapping (address => Voter) voters;

    // Events
    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted(address voter, uint proposalId);

    /**
     * @dev Contract constructor. Initializes the contract and sets the owner.
     */
    constructor() Ownable(msg.sender) { }

    /**
     * @dev Modifier to restrict access to registered voters only.
     */
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    /**
     * @dev Retrieves voter information.
     * @param _addr The address of the voter.
     * @return Voter information.
     */
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }

    /**
     * @dev Retrieves information about a specific proposal.
     * @param _id The ID of the proposal.
     * @return Proposal information.
     */
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // Registration

    /**
     * @dev Adds a new voter.
     * @param _addr The address of the voter.
     */
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // Proposal

    /**
     * @dev Adds a new proposal.
     * @param _desc The description of the proposal.
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(proposalsArray.length < 300, 'Limite de proposal atteint');
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer');
        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // Vote

   /**
 * @dev Allows a registered voter to cast a vote for a proposal.
 * @param _id The ID of the proposal.
 */
function setVote(uint _id) external onlyVoters {
    require(
        workflowStatus == WorkflowStatus.VotingSessionStarted,
        "Voting session havent started yet"
    );
    require(voters[msg.sender].hasVoted != true, "You have already voted");
    require(_id < proposalsArray.length, "Proposal not found");

    // Assign the proposal ID to the voter and mark the voter as voted.
    voters[msg.sender].votedProposalId = _id;
    voters[msg.sender].hasVoted = true;
    proposalsArray[_id].voteCount++;

    // Check if the proposal's vote count surpasses the current winning proposal.
    if (proposalsArray[_id].voteCount > proposalsArray[winningProposalID].voteCount) {
        winningProposalID = _id;
    }

    emit Voted(msg.sender, _id); // Emit an event indicating the voter has cast their vote.
}


    // State

    /**
     * @dev Starts the phase of registering proposals.
     */
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
     * @dev Ends the phase of registering proposals.
     */
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
     * @dev Starts the voting session.
     */
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /**
     * @dev Ends the voting session.
     */
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }
}
