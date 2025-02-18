/**
 * Generates a unique key for tracking transaction states
 * @param contractAddress - The contract address
 * @param tokenId - The token ID
 * @returns A unique string key
 */
export const getTransactionKey = (
  contractAddress: string,
  tokenId: number
): string => `${contractAddress}-${tokenId}`;

/**
 * Creates an updated transaction state object
 * @param prevState - Previous transaction states
 * @param key - Transaction key
 * @param newState - New state to merge
 * @returns Updated transaction state
 */
export const createUpdatedTransactionState = (
  prevState: Record<string, { loading: boolean; error: string | null }>,
  key: string,
  newState: { loading?: boolean; error?: string | null }
) => ({
  ...prevState,
  [key]: {
    loading: newState.loading ?? prevState[key]?.loading ?? false,
    error: newState.error ?? prevState[key]?.error ?? null,
  },
});
