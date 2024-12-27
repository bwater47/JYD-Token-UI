import { useState } from "react";
import { ethers } from "ethers";

interface MetaMaskState {
  account: string | null;
  loading: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export const useMetaMask = (): MetaMaskState => {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async (): Promise<void> => {
    if (!window.ethereum) {
      setError("Please install MetaMask");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch {
      setError("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = (): void => {
    setAccount(null);
    setError(null);
  };

  return {
    account,
    loading,
    error,
    connectWallet,
    disconnectWallet,
  };
};
