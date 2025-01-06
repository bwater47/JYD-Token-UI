import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import {
  NFTMetadata,
  OwnedNft,
  RawAttribute,
  CollectionsState,
} from "../types/components/nft";

const CONTRACTS = {
  STAKING: "0x9b14f44269886667C69ce7Cef33fF83a13cD5126",
  JYD: "0x91673149FFae3274b32997288395D07A8213e41F",
  PUPPIES: "0x7BC6d85a15B21CEfd62Ce5ab2cF87B611da6bE59",
  BONES: "0x2C173A97ED9beC4b292c7786811510268fd5e170",
  K9000: "0x564AEd71080D74b4550baD82DC0BaA12737DCB64",
} as const;

const formatNFTData = (nft: OwnedNft): NFTMetadata => {
  const attributes = (nft.rawMetadata?.attributes || []) as RawAttribute[];

  return {
    id: nft.tokenId,
    title: nft.rawMetadata?.name || `Token #${nft.tokenId}`,
    image:
      nft.media?.[0]?.gateway || nft.rawMetadata?.image || "/placeholder.png",
    attributes: attributes.map((attr: RawAttribute) => ({
      trait_type: String(attr.trait_type || ""),
      value: attr.value ?? "",
    })),
  };
};

const useNFTs = (account: string | null) => {
  const [collections, setCollections] = useState<CollectionsState>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!account) return;

      const alchemy = new Alchemy({
        apiKey: import.meta.env.VITE_ALCHEMY_API_KEY || "demo",
        network: Network.ETH_MAINNET,
      });

      setLoading(true);
      try {
        const nftData: CollectionsState = {};

        for (const [key, address] of Object.entries(CONTRACTS)) {
          if (key === "STAKING") continue;

          try {
            const response = await alchemy.nft.getNftsForOwner(account, {
              contractAddresses: [address],
              omitMetadata: false,
            });

            if (response.ownedNfts.length > 0) {
              nftData[key] = response.ownedNfts.map(formatNFTData);
            }
          } catch (error) {
            console.error(`Error fetching NFTs for ${key}:`, error);
            continue;
          }
        }

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
