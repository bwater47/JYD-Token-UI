import React from "react";
import { NFTMetadata } from "../../../types/components/nft";
import { CONTRACTS } from "../../../utils/constants/contracts";

interface UnstakedNFTListProps {
  collections: Record<string, NFTMetadata[]>;
  transactionStates: Record<string, { loading: boolean; error: string | null }>;
  isApproving: boolean;
  onStake: (nft: NFTMetadata, collection: string) => Promise<void>;
  getTransactionKey: (contractAddress: string, tokenId: number) => string;
}

export const UnstakedNFTList: React.FC<UnstakedNFTListProps> = ({
  collections,
  transactionStates,
  isApproving,
  onStake,
  getTransactionKey,
}) => {
  const getCollectionName = (collection: string) => {
    switch (collection) {
      case "JYD":
        return "JunkYard Dogs";
      case "PUPPIES":
        return "JunkYard Puppies";
      case "BONES":
        return "JunkYard Bones";
      case "K9000":
        return "JunkYard K9000";
      default:
        return collection;
    }
  };

  return (
    <div className="card bg-gray-800 rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Available to Stake</h3>
      {Object.entries(collections).map(([collection, nfts]) => (
        <div key={collection} className="mb-4">
          <h4 className="text-lg font-semibold mb-2">
            {getCollectionName(collection)}
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
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h5 className="font-medium mb-2">{nft.title}</h5>
                  <button
                    className={`btn btn-primary mt-auto ${
                      txState?.loading || isApproving ? "opacity-50" : ""
                    }`}
                    onClick={() => onStake(nft, collection)}
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
      ))}
    </div>
  );
};
