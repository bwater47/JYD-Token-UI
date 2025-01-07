# JYD Token Interface

![TypeScript](https://img.shields.io/badge/TypeScript-45%25-blue)
![React](https://img.shields.io/badge/React-35%25-lightblue)
![Ethers.js](https://img.shields.io/badge/Ethers.js-10%25-purple)
![CSS](https://img.shields.io/badge/CSS-10%25-orange)

A Web3 interface for interacting with Junkyard Dogs NFT collections, built with React and TypeScript. This application enables users to connect their MetaMask wallet, view their NFT collections, explore their transactions, swap networks, stake/unstake, and manage their JYD assets.

## Description

- **Motivation:** Create a user-friendly interface for Junkyard Dogs NFT holders to view and manage their collections.
- **Purpose:** Showcase Web3 development skills while providing utility to the JYD community.
- **Problem Solved:** Simplifies the interaction with blockchain assets through an intuitive interface.
- **Learning Outcomes:** Gained experience with Web3 technologies, React hooks pattern, and TypeScript.

## Key Files Structure

### Core Components
- `App.tsx`: Main application component
- `LoginButton.tsx`: MetaMask connection button component
- `LoginModal.tsx`: Modal for wallet connection

### Features
- `NFTGallery.tsx`: Displays user's NFT collections
- `NFTCard.tsx`: Individual NFT display component
- `NetworkSwap.tsx`: Network switching functionality

### Hooks
- `useMetaMask.tsx`: MetaMask connection state management
- `useNFTs.tsx`: NFT data fetching and management
- `useLoginModal.tsx`: Modal state management

### Utils
- `EtherAPI.tsx`: Ethereum RPC interaction utilities
- `helpers.tsx`: Common utility functions

### Themes
- `/components`: Component-specific styles
- `/features`: Feature-specific styles
- `/layout`: Layout-specific styles

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
cd JYD-Token-UI
npm install
```

3. Create a .env file with:
```
VITE_ALCHEMY_API_KEY=your_api_key
RPC_PROVIDER_URL=your_rpc_url
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Connect your MetaMask wallet using the login button
2. View your JYD NFT collections
3. Use the copy feature to copy a wallet address
4. Manage your NFT assets through the interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Technical Features

- MetaMask wallet integration
- NFT collection viewing
- Persistent wallet connection
- Responsive design
- Type-safe development with TypeScript
- React hooks pattern for state management

## License

This project is not licensed do not fork unless given specific authority.

## Acknowledgments

- Ethers.js documentation -- adding*
- MetaMask API documentation -- adding*
- React documentation -- adding*
- Vite documentation -- adding*
- TypeScript documentation -- adding*

Would you like me to expand on any section or add more technical details?