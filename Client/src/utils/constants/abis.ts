export const ERC721_ABI = [
  "function approve(address to, uint256 tokenId) public",
  "function getApproved(uint256 tokenId) public view returns (address)",
] as const;

export const STAKER_ABI = [
  "function stake(address[] memory asset, uint256[] memory tokenIds) external",
  "function unstake(address[] memory asset, uint256[] memory tokenIds) external",
] as const;
