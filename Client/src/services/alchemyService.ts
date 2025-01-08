import { Alchemy, Network } from "alchemy-sdk";
import { CONTRACTS } from "../utils/constants/contracts";
import { formatNFTData } from "../utils/formatters/nftFormatters";
import { CollectionsState } from "../types/components/nft";

/**
 * Creates an Alchemy SDK instance with the specified API key and network.
 * @returns {Alchemy} The Alchemy SDK instance.
 */

export const createAlchemyInstance = () => {
  return new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY || "demo",
    network: Network.ETH_MAINNET,
  });
};

/**
 * Fetches the NFTs owned by the specified Ethereum account.
 * @param {string} account - The Ethereum account address.
 * @returns {Promise<CollectionsState>} The fetched NFT data.
 */

export const fetchNFTsForAccount = async (
  account: string
): Promise<CollectionsState> => {
  const alchemy = createAlchemyInstance();
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

  return nftData;
};
