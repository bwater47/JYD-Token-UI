export interface StakedNFT {
  contractAddress: string;
  tokenId: number;
  metadata: string;
}

export interface TransactionState {
  [key: string]: {
    loading: boolean;
    error: string | null;
  };
}

export interface StakingOperationsProps {
  updateTransactionState: (
    contractAddress: string,
    tokenId: number,
    state: { loading?: boolean; error?: string | null }
  ) => void;
  setStakedNFTs: React.Dispatch<React.SetStateAction<StakedNFT[]>>;
}
