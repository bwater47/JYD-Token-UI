import {
  NFTMetadata,
  OwnedNft,
  RawAttribute,
} from "../../types/components/nft";

/**
 * Formats the NFT data into a standardized metadata structure.
 *
 * @param {OwnedNft} nft - The NFT object to format.
 * @returns {NFTMetadata} The formatted NFT metadata.
 */

export const formatNFTData = (nft: OwnedNft): NFTMetadata => {
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
