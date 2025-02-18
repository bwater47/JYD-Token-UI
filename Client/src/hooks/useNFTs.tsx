import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CollectionsState } from "../types/components/nft";
import { fetchNFTsForAccount } from "../services/alchemyService";
import { CONTRACTS } from "../utils/constants/contracts";

const ERC721_ABI = [
  "function setApprovalForAll(address operator, bool approved) public",
  "function isApprovedForAll(address owner, address operator) public view returns (bool)",
];

const useNFTs = (account: string | null) => {
  const [collections, setCollections] = useState<CollectionsState>({});
  const [loading, setLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!account) return;

      setLoading(true);
      try {
        const nftData = await fetchNFTsForAccount(account);
        setCollections(nftData);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
      setLoading(false);
    };

    fetchNFTs();
  }, [account]);

  const approveContract = async (contractAddress: string): Promise<boolean> => {
    if (!account || !window.ethereum) {
      console.error("No account or ethereum provider available");
      return false;
    }

    try {
      setIsApproving(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nftContract = new ethers.Contract(
        contractAddress,
        ERC721_ABI,
        signer
      );

      // Check current approval status
      const isApproved = await nftContract.isApprovedForAll(
        account,
        CONTRACTS.STAKING
      );

      if (isApproved) {
        console.log(`Contract ${contractAddress} already approved`);
        return true;
      }

      // Approve the staking contract
      const tx = await nftContract.setApprovalForAll(CONTRACTS.STAKING, true);
      await tx.wait();

      console.log(`Contract ${contractAddress} approved for staking`);
      return true;
    } catch (error) {
      console.error(`Error approving contract ${contractAddress}:`, error);
      return false;
    } finally {
      setIsApproving(false);
    }
  };

  const approveAllContracts = async () => {
    const contractAddresses = [
      CONTRACTS.JYD,
      CONTRACTS.PUPPIES,
      CONTRACTS.BONES,
      CONTRACTS.K9000,
    ];

    const approvalResults = await Promise.all(
      contractAddresses.map(async (contractAddress) => {
        return {
          contractAddress,
          approved: await approveContract(contractAddress),
        };
      })
    );

    return approvalResults;
  };

  return {
    collections,
    loading,
    approveContract,
    approveAllContracts,
    isApproving,
  };
};

export default useNFTs;
