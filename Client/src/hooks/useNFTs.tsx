import { useEffect, useState } from "react";
import { CollectionsState } from "../types/components/nft";
import { fetchNFTsForAccount } from "../services/alchemyService";

const useNFTs = (account: string | null) => {
  const [collections, setCollections] = useState<CollectionsState>({});
  const [loading, setLoading] = useState(false);

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

  return { collections, loading };
};

export default useNFTs;
