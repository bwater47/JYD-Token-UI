import React from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import useNFTs from "../hooks/useNFTs";
import { useStaking } from "../hooks/useStaking";
import { UnstakedNFTList } from "../components/features/NFT/UnstakedNFTList";
import { StakedNFTList } from "../components/features/NFT/StakedNFTList";
import { NFTMetadata, CollectionsState } from "../types/components/nft";
import { StakedNFT, TransactionState } from "../types/components/staking";
import "../styles/components/features/NFT/NFTGallery.css";

interface LoadingMessageProps {
  message: string;
}

interface StakingContentProps {
  collections: CollectionsState;
  transactionStates: TransactionState;
  isApproving: boolean;
  stakedNFTs: StakedNFT[];
  getTransactionKey: (contractAddress: string, tokenId: number) => string;
  handleStake: (nft: NFTMetadata, collection: string) => Promise<void>;
  handleUnstake: (nft: StakedNFT) => Promise<void>;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ message }) => (
  <div className="text-center p-4">{message}</div>
);

const ApprovalButton: React.FC<{
  onApprove: () => void;
  isApproving: boolean;
}> = ({ onApprove, isApproving }) => (
  <button
    onClick={onApprove}
    disabled={isApproving}
    className={`btn btn-secondary ${isApproving ? "opacity-50" : ""}`}
  >
    {isApproving ? "Approving..." : "Approve All Contracts"}
  </button>
);

const StakingContent: React.FC<StakingContentProps> = ({
  collections,
  transactionStates,
  isApproving,
  stakedNFTs,
  getTransactionKey,
  handleStake,
  handleUnstake,
}) => (
  <div className="row">
    <div className="col-md-6">
      <UnstakedNFTList
        collections={collections}
        transactionStates={transactionStates}
        isApproving={isApproving}
        onStake={handleStake}
        getTransactionKey={getTransactionKey}
      />
    </div>
    <div className="col-md-6">
      <StakedNFTList
        stakedNFTs={stakedNFTs}
        transactionStates={transactionStates}
        onUnstake={handleUnstake}
        getTransactionKey={getTransactionKey}
      />
    </div>
  </div>
);

const Staking: React.FC = () => {
  const { account } = useMetaMask();
  const { collections, approveAllContracts, isApproving } = useNFTs(account);
  const {
    stakedNFTs,
    loading,
    transactionStates,
    getTransactionKey,
    handleStake,
    handleUnstake,
  } = useStaking();

  if (!account) {
    return <LoadingMessage message="Please connect your wallet" />;
  }

  if (loading) {
    return <LoadingMessage message="Loading staked NFTs..." />;
  }

  return (
    <div className="container-fluid min-vh-100 p-4">
      <div className="mb-4">
        <ApprovalButton
          onApprove={approveAllContracts}
          isApproving={isApproving}
        />
      </div>
      <StakingContent
        collections={collections}
        transactionStates={transactionStates}
        isApproving={isApproving}
        stakedNFTs={stakedNFTs}
        getTransactionKey={getTransactionKey}
        handleStake={handleStake}
        handleUnstake={handleUnstake}
      />
    </div>
  );
};

export default Staking;
