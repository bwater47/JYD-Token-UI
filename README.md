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

## Project Structure

### Root
- Client/
  - src/
    - abis/               # Smart contract ABIs
      - StakerABI.ts
    - components/
      - common/          # Shared components
        - Login.tsx
      - features/NFT/    # NFT-related components
        - NFTGallery.tsx
        - UnstakedNFTList.tsx
        - StakedNFTList.tsx
      - layout/          # Layout components
        - Footer.tsx
        - Header.tsx
    - contracts/         # Smart contract interactions
      - StakerContract.ts
    - hooks/            # Custom React hooks
      - useMetaMask.tsx
      - useNFTs.tsx
      - useStaking.tsx
    - pages/           # Page components
      - Home.tsx
      - Staking.tsx
    - services/        # External integrations
      - alchemyService.ts
      - etherService.ts
    - styles/          # Styling
      - components/    # Component-specific styles
        - common/
          - Login.css
        - features/NFT/
          - NFTGallery.css
          - UnstakedNFTList.css
          - StakedNFTList.css
        - layout/
          - Footer.css
          - Header.css
      - UI/           # UI-specific styles
        - features/
          - NFTCard.css
        - modals/
          - LoginModal.css
        - index.css
        - Theme.css   # Global-specific styles
    - types/          # TypeScript type definitions
      - components/   # Component-specific types
        - nft.ts
        - staking.ts
    - UI/            # UI Components and features
      - features/    # Feature-specific UI components
        - NFTCard.tsx
      - modals/      # Modal components
        - LoginModal.tsx
    - utils/
      - constants/    # Application constants
        - abis.ts    # Contract ABIs
        - contracts.ts
      - formatters/   # Formatting utilities
        - nftFormatters.ts
        - helpers.tsx
  - .env.development # Development environment variables
  - .env.prod        # Production environment variables
  - .env.stage       # Staging environment variables
  - index.html       # Root HTML file
  - package.json     # Project dependencies and scripts
  - tsconfig.json    # TypeScript configuration
  - vite.config.ts   # Vite configuration

### Key Directories
- `/abis`: Smart contract ABIs for blockchain interaction
- `/components`: Reusable UI components organized by feature and common use
- `/contracts`: Smart contract interaction layer
- `/hooks`: Custom React hooks for state management and business logic
- `/services`: External service integrations (Alchemy, Ethereum)
- `/styles`: CSS modules organized to mirror component structure
- `/types`: TypeScript type definitions organized by feature
- `/UI`: Reusable UI components and features
- `/utils`: Helper functions, constants, and formatting utilities

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

3. Create a .env.development file with:

```
VITE_ALCHEMY_API_KEY=your_api_key
VITE_RPC_PROVIDER_URL=your_rpc_url
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

N/A
