import { Interface, ethers } from "ethers";
// import { StakerABI } from "../abis/StakerABI";
/**
 * Gets the Ethereum provider instance from the user's MetaMask wallet.
 * @returns {ethers.BrowserProvider} The Ethereum provider instance.
 * @throws {Error} If MetaMask is not installed.
 */

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

/**
 * Creates an Ethers.js contract instance for the specified contract address and ABI.
 * @param {string} contractAddress - The contract address.
 * @param {Interface} abi - The contract ABI.
 * @returns {ethers.Contract} The Ethers.js contract instance.
 */

export const getContract = (contractAddress: string, abi: Interface) => {
  const provider = getProvider();
  return new ethers.Contract(contractAddress, abi, provider);
};

/**
 * Retrieves the Ethereum balance for the specified address.
 * @param {string} address - The Ethereum address.
 * @returns {Promise<ethers.BigNumber>} The Ethereum balance.
 */

export const getBalance = async (address: string) => {
  const provider = getProvider();
  return await provider.getBalance(address);
};

// Function to interact with the Staker contract and get staked tokens
// export const getStakedTokens = async (
//   contractAddress: string,
//   account: string,
//   asset: string,
//   tokenId: number
// ): Promise<number> => {
//   const provider = getProvider();
//   const contract = getContract(contractAddress, StakerABI); // Use StakerABI

//   try {
//     const stakedAmount = await contract.stakings(account, asset, tokenId);
//     return stakedAmount.toNumber(); // Convert BigNumber to normal number
//   } catch (error) {
//     console.error("Error fetching staked tokens:", error);
//     throw new Error("Unable to fetch staked tokens");
//   }
// };
