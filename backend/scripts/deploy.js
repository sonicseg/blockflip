const hre = require("hardhat");

async function main() {
    console.log("DEPLYING BLOCKFLIP...")

    const Blockflip = await hre.ethers.getContractFactory("Blockflip");
    const blockflip = await Blockflip.deploy();

    await blockflip.waitForDeployment();

    const address = await blockflip.getAddress()

    console.log(`Blockflip deployed to: ${address}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });