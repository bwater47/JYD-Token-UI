import { ethers } from "ethers";

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getContract = (contractAddress: string, abi: any) => {
  const provider = getProvider();
  return new ethers.Contract(contractAddress, abi, provider);
};

// Common blockchain interactions
export const getBalance = async (address: string) => {
  const provider = getProvider();
  return await provider.getBalance(address);
};

// Add more generic ethers.js utility functions
