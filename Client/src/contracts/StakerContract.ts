// StakerContract.ts
import { ethers } from "ethers";
import { StakerABI } from "../abis/StakerABI";

interface AssetMetadata {
  contractAddress: string;
  tokenId: number;
  metadata: string;
}

export type ContractAddress =
  | "0x91673149FFae3274b32997288395D07A8213e41F"
  | "0x7BC6d85a15B21CEfd62Ce5ab2cF87B611da6bE59"
  | "0x2C173A97ED9beC4b292c7786811510268fd5e170"
  | "0x564AEd71080D74b4550baD82DC0BaA12737DCB64";

interface IStakerContract {
  getAssetMetadata(
    addresses: string[],
    tokenIds: number[]
  ): Promise<Array<AssetMetadata>>;

  getAssetNotEnnumerable(
    account: string,
    asset: string,
    lastTokenId: number
  ): Promise<ethers.BigNumberish>;

  getK9000(account: string, lastTokenId: number): Promise<ethers.BigNumberish>;

  notApprovedContracts(
    to: string,
    owner: string,
    contracts: string[]
  ): Promise<string[]>;

  unstakedAssets(
    account: string,
    assets: string[]
  ): Promise<Array<AssetMetadata>>;

  stake(
    asset: string[],
    tokenIds: number[]
  ): Promise<ethers.ContractTransaction>;

  unstake(
    asset: string[],
    tokenIds: number[]
  ): Promise<ethers.ContractTransaction>;
}

type StakerContractWithSigner = ethers.Contract & IStakerContract;

/**
 * Represents a contract for staking tokens.
 */
export class StakerContract {
  private contract: StakerContractWithSigner;

  /**
   * Creates an instance of StakerContract.
   * @param provider - The JSON RPC provider to interact with the Ethereum network.
   * @param contractAddress - The address of the staking contract.
   */
  constructor(provider: ethers.JsonRpcProvider, contractAddress: string) {
    this.contract = new ethers.Contract(
      contractAddress,
      StakerABI,
      provider
    ) as StakerContractWithSigner;
  }

  /**
   * Get asset metadata
   */
  async getAssetMetadata(
    addresses: string[],
    tokenIds: number[]
  ): Promise<Array<AssetMetadata>> {
    try {
      const result = await this.contract.getAssetMetadata(addresses, tokenIds);
      return result;
    } catch (error) {
      console.error("Error getting asset metadata:", error);
      throw new Error("Unable to get asset metadata");
    }
  }

  /**
   * Get asset not enumerable
   */
  async getAssetNotEnnumerable(
    account: string,
    asset: string,
    lastTokenId: number
  ): Promise<number> {
    try {
      console.log("Checking staked tokens:", {
        account,
        asset,
        lastTokenId,
      });

      try {
        const result = await this.contract.getAssetNotEnnumerable(
          account,
          asset,
          lastTokenId
        );

        console.log(`Staked tokens for ${asset}:`, Number(result));

        return Number(result) || 0;
      } catch (callError: unknown) {
        // More comprehensive error handling
        if (
          callError instanceof Error &&
          (callError as { code?: string }).code === "CALL_EXCEPTION"
        ) {
          console.warn(
            `Potential contract call issue for ${asset}:`,
            callError
          );

          // Additional diagnostic logging
          console.log("Error details:", {
            message: (callError as Error).message,
            stack: (callError as Error).stack,
            errorCode: (callError as { code?: string }).code,
          });

          // Return 0 for this specific error type
          return 0;
        }

        // Rethrow other types of errors
        throw callError;
      }
    } catch (error: unknown) {
      console.error(
        `Unexpected error checking staked tokens for ${asset}:`,
        error
      );
      return 0;
    }
  }

  /**
   * Get K9000 tokens
   */
  async getK9000(account: string, lastTokenId: number): Promise<number> {
    try {
      const result = await this.contract.getK9000(account, lastTokenId);
      return Number(result);
    } catch (error) {
      console.error("Error getting K9000:", error);
      throw new Error("Unable to get K9000");
    }
  }

  /**
   * Check which contracts need approval
   */
  async notApprovedContracts(
    to: string,
    owner: string,
    contracts: string[]
  ): Promise<string[]> {
    try {
      console.log("Checking unapproved contracts:", {
        to,
        owner,
        contracts,
      });

      const result = await this.contract.notApprovedContracts(
        to,
        owner,
        contracts
      );

      console.log("Unapproved contracts result:", result);
      return result;
    } catch (error) {
      console.warn("Error in notApprovedContracts:", {
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : "No stack trace",
        to,
        owner,
        contracts,
      });

      // Return an empty array instead of throwing an error
      return [];
    }
  }

  /**
   * Check if a token is staked
   */
  async checkStakingStatus(
    account: string,
    asset: string,
    tokenId: number
  ): Promise<number> {
    try {
      // Using the mapping view function
      const result = await this.contract.getAssetNotEnnumerable(
        account,
        asset,
        tokenId
      );
      return Number(result);
    } catch (error) {
      console.error("Error checking staking status:", error);
      throw new Error("Unable to check staking status");
    }
  }

  /**
   * Get unstaked assets for an account
   */
  async getUnstakedAssets(
    account: string,
    assets: string[]
  ): Promise<Array<AssetMetadata>> {
    try {
      const result = await this.contract.unstakedAssets(account, assets);
      return result;
    } catch (error) {
      console.error("Error getting unstaked assets:", error);
      throw new Error("Unable to get unstaked assets");
    }
  }

  /**
   * Get contract instance with signer for transactions
   */
  connectWithSigner(signer: ethers.Signer): StakerContractWithSigner {
    return this.contract.connect(signer) as StakerContractWithSigner;
  }
}
