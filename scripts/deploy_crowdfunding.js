const hre = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

    const crowdFundingContractFactory = await ethers.getContractFactory("CrowdFunding");
    const crowdFundingContract = await crowdFundingContractFactory.deploy();
    await crowdFundingContract.waitForDeployment();

    console.log("CrowdFundingContract address:", crowdFundingContract.target);

    await crowdFundingContract.startProject("Buy toys","Buy toys",1,100)
    let allProjects = await crowdFundingContract.returnAllProjects()

    const artifact = artifacts.readArtifactSync('Project')
    let project
    let details
    for(let i=0; i<allProjects.length; i++) {
        project = new ethers.Contract(allProjects[i], artifact.abi, deployer)
        details = await project.getDetails()
        console.log(details)
    }

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
