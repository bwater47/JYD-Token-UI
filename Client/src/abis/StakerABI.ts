// ABI: Application Binary Interface defines how data structures or computational
// routines are accessed in machine code. It contrasts with an API, which defines
// these interactions in a higher-level, hardware-independent format. A key aspect
// of an ABI is the calling convention, which dictates how data is provided as input
// to, or read as output from, computational routines.

// Function: Returns the number of staked tokens for an address, asset, and token ID

export const StakerABI = [
  {
    inputs: [
      { internalType: "address[]", name: "addresses", type: "address[]" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "getAssetMetadata",
    outputs: [
      {
        components: [
          { internalType: "address", name: "contractAddress", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "metadata", type: "string" },
        ],
        internalType: "struct Staker.Asset[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address[]", name: "contracts", type: "address[]" },
    ],
    name: "notApprovedContracts",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "address[]", name: "assets", type: "address[]" },
    ],
    name: "unstakedAssets",
    outputs: [
      {
        components: [
          { internalType: "address", name: "contractAddress", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "metadata", type: "string" },
        ],
        internalType: "struct Staker.Asset[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "asset", type: "address[]" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "asset", type: "address[]" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "lastTokenId", type: "uint256" },
    ],
    name: "getAssetNotEnnumerable",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
