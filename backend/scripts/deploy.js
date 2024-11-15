const hre = require("hardhat");

async function main() {
    console.log("DEPLOYING BLOCKFLIP CONTRACT...")

    const Blockflip = await hre.ethers.getContractFactory("Blockflip");

    const blockflip = await Blockflip.deploy();

    await blockflip.waitForDeployment();

    const address = await blockflip.getAddress();

    console.log(`Blockflip deployed to ${address}`)
}

main()
    // If deployment is successful, exit the process with success code (0)
    .then(() => process.exit(0))
    // If an error occurs during deployment:
    .catch((error) => {
        // Log the error to the console
        console.error(error);
        // Exit the process with failure code (1)
        process.exit(1);
    });