import React from "react";
import { StakedNFT } from "../../../types/components/staking";

interface StakedNFTListProps {
  stakedNFTs: StakedNFT[];
  transactionStates: Record<string, { loading: boolean; error: string | null }>;
  onUnstake: (nft: StakedNFT) => Promise<void>;
  getTransactionKey: (contractAddress: string, tokenId: number) => string;
}

export const StakedNFTList: React.FC<StakedNFTListProps> = ({
  stakedNFTs,
  transactionStates,
  onUnstake,
  getTransactionKey,
}) => {
  return (
    <div className="card bg-gray-800 rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Currently Staked</h3>
      <div className="grid gap-4">
        {stakedNFTs.map((nft: StakedNFT) => {
          const txKey = getTransactionKey(nft.contractAddress, nft.tokenId);
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
                <p className="text-red-500 text-sm my-2">{txState.error}</p>
              )}
              <button
                className={`btn btn-primary mt-2 ${
                  txState?.loading ? "opacity-50" : ""
                }`}
                onClick={() => onUnstake(nft)}
                disabled={txState?.loading}
              >
                {txState?.loading ? "Unstaking..." : "Unstake"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
