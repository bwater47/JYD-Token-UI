import { ethers } from "ethers";
import { StakerABI } from "../abis/StakerABI";

/**
 * Represents a contract for staking tokens.
 */
export class StakerContract {
  private contract: ethers.Contract;

  /**
   * Creates an instance of StakerContract.
   * @param provider - The JSON RPC provider to interact with the Ethereum network.
   * @param contractAddress - The address of the staking contract.
   */

  constructor(provider: ethers.JsonRpcProvider, contractAddress: string) {
    this.contract = new ethers.Contract(contractAddress, StakerABI, provider);
  }

  /**
   * Gets the number of staked tokens for a given account, asset, and token ID.
   * @param account - The address of the account.
   * @param asset - The address of the asset.
   * @param tokenId - The ID of the token.
   * @returns A promise that resolves to the number of staked tokens.
   * @throws Will throw an error if unable to fetch staked tokens.
   */

  async getStakedTokens(
    account: string,
    asset: string,
    tokenId: number
  ): Promise<number> {
    try {
      const stakedAmount = await this.contract.stakings(
        account,
        asset,
        tokenId
      );
      return stakedAmount.toNumber();
    } catch (error) {
      console.error("Error fetching staked tokens:", error);
      throw new Error("Unable to fetch staked tokens");
    }
  }
}
