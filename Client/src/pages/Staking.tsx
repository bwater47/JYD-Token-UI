import { useMetaMask } from "../hooks/useMetaMask";
import { StakerContract } from "../contracts/StakerContract";
import useNFTs from "../hooks/useNFTs";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACTS } from "../utils/constants/contracts";
import { NFTMetadata } from "../types/components/nft";
import { ContractAddress } from "../contracts/StakerContract";

const ERC721_ABI = [
  "function approve(address to, uint256 tokenId) public",
  "function getApproved(uint256 tokenId) public view returns (address)",
] as const;

const STAKER_ABI = [
  "function stake(address[] memory asset, uint256[] memory tokenIds) external",
  "function unstake(address[] memory asset, uint256[] memory tokenIds) external",
] as const;

interface StakedNFT {
  contractAddress: string;
  tokenId: number;
  metadata: string;
}

interface TransactionState {
  [key: string]: {
    loading: boolean;
    error: string | null;
  };
}

const Staking = () => {
  const { account } = useMetaMask();
  const { collections, approveAllContracts, isApproving } = useNFTs(account);

  const [stakedNFTs, setStakedNFTs] = useState<StakedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactionStates, setTransactionStates] = useState<TransactionState>(
    {}
  );

  const getTransactionKey = (contractAddress: string, tokenId: number) =>
    `${contractAddress}-${tokenId}`;

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

  useEffect(() => {
    const fetchStakedNFTs = async () => {
      if (!account) return;

      try {
        setLoading(true);
        const provider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_RPC_PROVIDER_URL
        );
        const stakerContract = new StakerContract(provider, CONTRACTS.STAKING);

        const contractAddresses: ContractAddress[] = [
          CONTRACTS.JYD as ContractAddress,
          CONTRACTS.PUPPIES as ContractAddress,
          CONTRACTS.BONES as ContractAddress,
          CONTRACTS.K9000 as ContractAddress,
        ];

        const results = await Promise.allSettled(
          contractAddresses.map(async (contractAddress) => {
            try {
              const result = await stakerContract.getAssetNotEnnumerable(
                account,
                contractAddress,
                0
              );

              console.log(`Result for ${contractAddress}:`, result);

              if (result > 0) {
                const metadata = await stakerContract.getAssetMetadata(
                  [contractAddress],
                  [0]
                );

                console.log("Metadata:", metadata);

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

        // Correctly filter and map results
        const validTokens = results
          .filter(
            (
              result
            ): result is PromiseFulfilledResult<{
              contractAddress: ContractAddress;
              tokenId: number;
              metadata: string;
            } | null> => result.status === "fulfilled"
          )
          .map(
            (result) =>
              (
                result as PromiseFulfilledResult<{
                  contractAddress: ContractAddress;
                  tokenId: number;
                  metadata: string;
                } | null>
              ).value
          )
          .filter(
            (
              token
            ): token is {
              contractAddress: ContractAddress;
              tokenId: number;
              metadata: string;
            } => token !== null
          );

        console.log("Final Staked Tokens:", validTokens);
        setStakedNFTs(validTokens as StakedNFT[]);
      } catch (error) {
        console.error("Error fetching staked NFTs:", error);
        setStakedNFTs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStakedNFTs();
  }, [account]);

  const handlePreStake = async () => {
    try {
      const approvalResults = await approveAllContracts();

      // Check if all contracts were approved
      const allApproved = approvalResults.every((result) => result.approved);

      if (allApproved) {
        // Proceed with staking or show a success message
        console.log("All contracts approved successfully");
      } else {
        // Handle partial or failed approvals
        console.warn("Some contracts were not approved", approvalResults);
      }
    } catch (error) {
      console.error("Error in pre-stake approval:", error);
    }
  };

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
      const rpcProvider = new ethers.JsonRpcProvider(
        import.meta.env.VITE_RPC_PROVIDER_URL
      );

      // Create contract instances
      const stakerContract = new StakerContract(rpcProvider, CONTRACTS.STAKING);
      const nftContract = new ethers.Contract(
        contractAddress,
        ERC721_ABI,
        signer
      );

      // Check if approval is needed
      const notApprovedContracts = await stakerContract.notApprovedContracts(
        CONTRACTS.STAKING,
        account,
        [contractAddress]
      );

      if (notApprovedContracts.includes(contractAddress)) {
        // Approve staking contract
        const approveTx = await nftContract.approve(CONTRACTS.STAKING, tokenId);
        await approveTx.wait();
      }

      // Create a transaction directly using the signer
      const stakingContract = new ethers.Contract(
        CONTRACTS.STAKING,
        STAKER_ABI,
        signer
      );

      const stakeTx = await stakingContract.stake([contractAddress], [tokenId]);
      await stakeTx.wait();

      // Refresh the staked NFTs list
      const updatedStakedNFTs = [
        ...stakedNFTs,
        {
          contractAddress,
          tokenId,
          metadata: JSON.stringify(nft),
        },
      ];
      setStakedNFTs(updatedStakedNFTs);
    } catch (error) {
      console.error("Error staking NFT:", error);
      updateTransactionState(contractAddress, tokenId, {
        error: "Failed to stake NFT. Please try again.",
      });
    } finally {
      updateTransactionState(contractAddress, tokenId, { loading: false });
    }
  };

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

      // Create contract with signer
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

      // Remove the NFT from the staked list
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

  const renderUnstakedNFTs = () => {
    return Object.entries(collections).map(([collection, nfts]) => (
      <div key={collection} className="mb-4">
        <h4 className="text-lg font-semibold mb-2">
          {collection === "JYD" && "JunkYard Dogs"}
          {collection === "PUPPIES" && "JunkYard Puppies"}
          {collection === "BONES" && "JunkYard Bones"}
          {collection === "K9000" && "JunkYard K9000"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nfts.map((nft: NFTMetadata) => {
            const contractAddress =
              CONTRACTS[collection as keyof typeof CONTRACTS];
            const tokenId = parseInt(nft.id);
            const txKey = getTransactionKey(contractAddress, tokenId);
            const txState = transactionStates[txKey];

            return (
              <div
                key={nft.id}
                className="p-4 bg-gray-700 rounded-lg flex flex-col"
              >
                {/* Existing render logic */}
                <button
                  className={`btn btn-primary mt-auto ${
                    txState?.loading || isApproving ? "opacity-50" : ""
                  }`}
                  onClick={() => handleStake(nft, collection)}
                  disabled={txState?.loading || isApproving}
                >
                  {txState?.loading
                    ? "Staking..."
                    : isApproving
                    ? "Approving..."
                    : "Stake"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  const renderApprovalButton = () => (
    <button
      onClick={handlePreStake}
      disabled={isApproving}
      className={`btn btn-secondary ${isApproving ? "opacity-50" : ""}`}
    >
      {isApproving ? "Approving..." : "Approve All Contracts"}
    </button>
  );

  if (!account) {
    return <div className="text-center p-4">Please connect your wallet</div>;
  }

  if (loading) {
    return <div className="text-center p-4">Loading staked NFTs...</div>;
  }

  return (
    <div className="container-fluid min-vh-100 p-4">
      <div className="mb-4">{renderApprovalButton()}</div>
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-4">Available to Stake</h3>
            <div className="grid gap-4">{renderUnstakedNFTs()}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-4">Currently Staked</h3>
            <div className="grid gap-4">
              {stakedNFTs.map((nft: StakedNFT) => {
                const txKey = getTransactionKey(
                  nft.contractAddress,
                  nft.tokenId
                );
                const txState = transactionStates[txKey];

                return (
                  <div
                    key={`${nft.contractAddress}-${nft.tokenId}`}
                    className="p-4 bg-gray-700 rounded-lg"
                  >
                    <p>Token ID: {nft.tokenId}</p>
                    <p className="text-sm text-gray-400 truncate">
                      Contract: {nft.contractAddress}
                    </p>
                    {txState?.error && (
                      <p className="text-red-500 text-sm my-2">
                        {txState.error}
                      </p>
                    )}
                    <button
                      className={`btn btn-primary mt-2 ${
                        txState?.loading ? "opacity-50" : ""
                      }`}
                      onClick={() => handleUnstake(nft)}
                      disabled={txState?.loading}
                    >
                      {txState?.loading ? "Unstaking..." : "Unstake"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
