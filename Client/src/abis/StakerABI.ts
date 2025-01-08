// ABI: Application Binary Interface defines how data structures or computational
// routines are accessed in machine code. It contrasts with an API, which defines
// these interactions in a higher-level, hardware-independent format. A key aspect
// of an ABI is the calling convention, which dictates how data is provided as input
// to, or read as output from, computational routines.

// Function: Returns the number of staked tokens for an address, asset, and token ID

export const StakerABI = [
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakings",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Add more ABI functions here if needed.
