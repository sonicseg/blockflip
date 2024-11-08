pragma solidity ^0.8.19;

contract Blockflip {
    address public owner;

    event CoinFlipped(
        address indexed player,
        bool pickedHeads,
        bool isHeads,
        uint256 blockNumber
    );

    constructor() {
        owner = msg.sender;
    }

    uint256 public constant MINIUMUM_BET = 0.001 ether;

    function flipCoin(bool pickHeads) external payable returns (bool) {
        require(msg.value >= MINIUMUM_BET, "Bet amount too low");

        bytes32 blockHash = blockhash(block.number - 1);
        bool isHeads = uint256(blockHash) % 2 == 0;

        if (pickHeads == isHeads) {
            payable(msg.sender).transfer(msg.value * 2);
        }

        emit CoinFlipped(msg.sender, pickHeads, isHeads, block.number);
        return isHeads;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}
