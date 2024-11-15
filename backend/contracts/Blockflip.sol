// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// This contract implements a coin flip betting game on the blockchain
// Players can bet ETH on heads or tails, with a minimum bet requirement
contract Blockflip {
    // Store the contract owner's address who can withdraw funds
    address public owner;

    // Event emitted when a coin flip occurs, storing relevant game data
    // indexed fields can be efficiently filtered in blockchain explorers
    event CoinFlipped(
        address indexed player,
        bool pickedHeads,
        bool isHeads,
        uint256 blockNumber
    );

    // Set the contract deployer as the owner during deployment
    constructor() {
        owner = msg.sender;
    }

    // Set minimum bet amount to 0.001 ETH to prevent dust transactions
    uint256 public constant MINIUMUM_BET = 0.001 ether;

    // Main game function where players bet on coin flip outcome
    // Returns true if the flip was heads, false if tails
    function flipCoin(bool pickHeads) external payable returns (bool) {
        // Ensure bet meets minimum amount
        require(msg.value >= MINIUMUM_BET, "Bet amount too low");

        // Use previous block hash as source of randomness
        // Note: This is not cryptographically secure and could be manipulated by miners
        bytes32 blockHash = blockhash(block.number - 1);
        bool isHeads = uint256(blockHash) % 2 == 0;

        // If player guessed correctly, pay them double their bet
        if (pickHeads == isHeads) {
            payable(msg.sender).transfer(msg.value * 2);
        }

        // Emit event with game results
        emit CoinFlipped(msg.sender, pickHeads, isHeads, block.number);
        return isHeads;
    }

    // Allow owner to withdraw accumulated funds from lost bets
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }

    // Allow contract to receive ETH payments
    receive() external payable {}
}
