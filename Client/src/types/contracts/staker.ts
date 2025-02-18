import { ethers } from "ethers";

export interface AssetMetadata {
  contractAddress: string;
  tokenId: number;
  metadata: string;
}

export type ContractAddress =
  | "0x91673149FFae3274b32997288395D07A8213e41F"
  | "0x7BC6d85a15B21CEfd62Ce5ab2cF87B611da6bE59"
  | "0x2C173A97ED9beC4b292c7786811510268fd5e170"
  | "0x564AEd71080D74b4550baD82DC0BaA12737DCB64";

export type StakerContractWithSigner = ethers.Contract & {
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
};
