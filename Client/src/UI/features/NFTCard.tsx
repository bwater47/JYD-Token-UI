import React, { useState } from "react";
import { NFTMetadata } from "../../types/components/nft";
import "../../styles/UI/features/NFTCard.css";
import FallbackNFT from "../../assets/fallback-nft";

interface NFTCardProps {
  nft: NFTMetadata;
}

/**
 * Component representing an NFT card.
 *
 * @param props - The properties for the NFTCard component.
 * @returns The rendered NFT card component.
 */

export const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div className="card h-100 bg-gray-800 rounded-lg overflow-hidden">
      <div className="relative pt-[100%]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
            <FallbackNFT />
            <div className="absolute text-gray-500 mt-32">#{nft.id}</div>
          </div>
        ) : (
          <img
            src={nft.image}
            alt={nft.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>

      <div className="p-4">
        <h6 className="text-lg font-semibold mb-3">{nft.title}</h6>
        <div className="grid grid-cols-2 gap-2">
          {nft.attributes.map((attr, idx) => (
            <div key={idx} className="bg-gray-700 p-2 rounded">
              <div className="text-sm font-semibold text-gray-300">
                {attr.trait_type}
              </div>
              <div className="text-sm">{attr.value.toString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
