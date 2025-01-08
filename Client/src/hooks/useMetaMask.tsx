import { useEffect, useReducer } from "react";
import { ethers } from "ethers";

type MetaMaskState = {
  account: string | null;
  loading: boolean;
  error: string | null;
};

/**
 * Manages MetaMask wallet connection state
 * @returns Wallet connection state and control functions
 */

type MetaMaskAction =
  | { type: "START_CONNECT" }
  | { type: "CONNECTION_SUCCESSFUL"; payload: string }
  | { type: "CONNECTION_FAILED"; payload: string }
  | { type: "DISCONNECT" };

const initialState: MetaMaskState = {
  account: null,
  loading: false,
  error: null,
};

function metamaskReducer(
  state: MetaMaskState,
  action: MetaMaskAction
): MetaMaskState {
  switch (action.type) {
    case "START_CONNECT":
      return { ...state, loading: true, error: null };
    case "CONNECTION_SUCCESSFUL":
      return { ...state, loading: false, account: action.payload, error: null };
    case "CONNECTION_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "DISCONNECT":
      return { ...state, account: null, error: null };
    default:
      return state;
  }
}

/**
 * Processes MetaMask state changes
 * @param state Current MetaMask state
 * @param action Action to process
 * @returns Updated MetaMask state
 */

export const useMetaMask = () => {
  const [state, dispatch] = useReducer(metamaskReducer, initialState);

  // Check if already connected on mount/refresh
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            dispatch({
              type: "CONNECTION_SUCCESSFUL",
              payload: accounts[0].address,
            });
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };
    checkConnection();
    if (window.ethereum) {
      window.ethereum.on?.("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          dispatch({ type: "DISCONNECT" });
        } else {
          dispatch({
            type: "CONNECTION_SUCCESSFUL",
            payload: accounts[0],
          });
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener?.(
          "accountsChanged",
          (accounts: string[]) => {
            if (accounts.length === 0) {
              dispatch({ type: "DISCONNECT" });
            } else {
              dispatch({
                type: "CONNECTION_SUCCESSFUL",
                payload: accounts[0],
              });
            }
          }
        );
      }
    };
  }, []);

  const connectWallet = async (): Promise<void> => {
    dispatch({ type: "START_CONNECT" });

    if (!window.ethereum) {
      dispatch({
        type: "CONNECTION_FAILED",
        payload: "Please install MetaMask",
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connecting wallet:", address);
      dispatch({ type: "CONNECTION_SUCCESSFUL", payload: address });
    } catch (error) {
      console.error("Connection error:", error);
      dispatch({
        type: "CONNECTION_FAILED",
        payload: "Failed to connect wallet",
      });
    }
  };

  const disconnectWallet = () => {
    dispatch({ type: "DISCONNECT" });
  };

  return {
    ...state,
    connectWallet,
    disconnectWallet,
  };
};
