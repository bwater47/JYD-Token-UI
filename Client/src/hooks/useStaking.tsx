import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useMetaMask } from "./useMetaMask";
import { CONTRACTS } from "../utils/constants/contracts";
import { NFTMetadata } from "../types/components/nft";
import { StakedNFT, TransactionState } from "../types/components/staking";
import { STAKER_ABI } from "../utils/constants/abis";
import { ContractAddress } from "../contracts/StakerContract";
import { StakerContract } from "../contracts/StakerContract";

type StakedNFTResult = {
  contractAddress: ContractAddress;
  tokenId: number;
  metadata: string;
} | null;

export const useStaking = () => {
  const { account } = useMetaMask();
  const [stakedNFTs, setStakedNFTs] = useState<StakedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactionStates, setTransactionStates] = useState<TransactionState>(
    {}
  );

  // Helper function to generate transaction key
  const getTransactionKey = (contractAddress: string, tokenId: number) =>
    `${contractAddress}-${tokenId}`;

  // Update transaction state helper
  const updateTransactionState = (
    contractAddress: string,
    tokenId: number,
    state: { loading?: boolean; error?: string | null }
  ) => {
    const key = getTransactionKey(contractAddress, tokenId);
    setTransactionStates((prev) => ({
      ...prev,
      [key]: {
        loading: state.loading ?? prev[key]?.loading ?? false,
        error: state.error ?? prev[key]?.error ?? null,
      },
    }));
  };

  // Fetch initial staked NFTs
  useEffect(() => {
    const fetchStakedNFTs = async () => {
      if (!account) {
        setStakedNFTs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const provider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_RPC_PROVIDER_URL
        );
        const stakerContract = new StakerContract(provider, CONTRACTS.STAKING);

        const contractAddresses = [
          CONTRACTS.JYD,
          CONTRACTS.PUPPIES,
          CONTRACTS.BONES,
          CONTRACTS.K9000,
        ] as const;

        const results = await Promise.allSettled(
          contractAddresses.map(async (contractAddress) => {
            try {
              const result = await stakerContract.getAssetNotEnnumerable(
                account,
                contractAddress as ContractAddress,
                0
              );

              if (result > 0) {
                const metadata = await stakerContract.getAssetMetadata(
                  [contractAddress as ContractAddress],
                  [0]
                );

                if (metadata && metadata.length > 0) {
                  return {
                    contractAddress: contractAddress as ContractAddress,
                    tokenId: 0,
                    metadata: metadata[0].metadata,
                  };
                }
              }
              return null;
            } catch (error) {
              console.warn(
                `Error checking status for ${contractAddress}:`,
                error
              );
              return null;
            }
          })
        );

        const validTokens = results
          .filter(
            (result): result is PromiseFulfilledResult<StakedNFTResult> =>
              result.status === "fulfilled"
          )
          .filter((result) => result.value !== null)
          .map((result) => result.value as StakedNFT);

        setStakedNFTs(validTokens);
      } catch (error) {
        console.error("Error fetching staked NFTs:", error);
        setStakedNFTs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStakedNFTs();
  }, [account]);

  // Stake NFT
  const handleStake = async (nft: NFTMetadata, collectionName: string) => {
    if (!account || !window.ethereum) return;

    const contractAddress = CONTRACTS[collectionName as keyof typeof CONTRACTS];
    if (!contractAddress) return;

    const tokenId = parseInt(nft.id);
    updateTransactionState(contractAddress, tokenId, {
      loading: true,
      error: null,
    });

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const stakingContract = new ethers.Contract(
        CONTRACTS.STAKING,
        STAKER_ABI,
        signer
      );

      const stakeTx = await stakingContract.stake([contractAddress], [tokenId]);
      await stakeTx.wait();

      setStakedNFTs((prev) => [
        ...prev,
        {
          contractAddress: contractAddress as ContractAddress,
          tokenId,
          metadata: JSON.stringify(nft),
        },
      ]);
    } catch (error) {
      console.error("Error staking NFT:", error);
      updateTransactionState(contractAddress, tokenId, {
        error: "Failed to stake NFT. Please try again.",
      });
    } finally {
      updateTransactionState(contractAddress, tokenId, { loading: false });
    }
  };

  // Unstake NFT
  const handleUnstake = async (nft: StakedNFT) => {
    if (!account || !window.ethereum) return;

    const { contractAddress, tokenId } = nft;
    updateTransactionState(contractAddress, tokenId, {
      loading: true,
      error: null,
    });

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const stakingContract = new ethers.Contract(
        CONTRACTS.STAKING,
        STAKER_ABI,
        signer
      );

      const unstakeTx = await stakingContract.unstake(
        [contractAddress],
        [tokenId]
      );
      await unstakeTx.wait();

      setStakedNFTs((prev) =>
        prev.filter(
          (item) =>
            !(
              item.contractAddress === contractAddress &&
              item.tokenId === tokenId
            )
        )
      );
    } catch (error) {
      console.error("Error unstaking NFT:", error);
      updateTransactionState(contractAddress, tokenId, {
        error: "Failed to unstake NFT. Please try again.",
      });
    } finally {
      updateTransactionState(contractAddress, tokenId, { loading: false });
    }
  };

  return {
    stakedNFTs,
    loading,
    transactionStates,
    getTransactionKey,
    handleStake,
    handleUnstake,
  };
};
