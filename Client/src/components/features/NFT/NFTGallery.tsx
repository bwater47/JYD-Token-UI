import { NFTCard } from "../../../UI/features/NFTCard";
import { useMetaMask } from "../../../hooks/useMetaMask";
import useNFTs from "../../../hooks/useNFTs";
import "../../../styles/components/features/NFT/NFTGallery.css"

/**
 * @file NFTGallery.tsx
 * @description This component displays a gallery of NFTs grouped by collections. It uses MetaMask to get the user's account and a custom hook to fetch the NFTs associated with that account.
 */

/**
 * NFTGallery component
 *
 * This component fetches and displays NFTs from different collections associated with the user's MetaMask account.
 * It shows a loading message while the data is being fetched and displays the NFTs in a card layout once loaded.
 * If no NFTs are found, it shows a message indicating that no JunkYard NFTs were found in the wallet.
 *
 * @returns {JSX.Element} The rendered NFT gallery component.
 */

const NFTGallery = () => {
  const { account } = useMetaMask();
  const { collections, loading } = useNFTs(account);

  console.log("Current account:", account);
  console.log("NFT Collections:", collections);

  if (!account) {
    return <div className="text-center p-4">Please connect your wallet</div>;
  }

  if (loading) {
    return <div className="text-center p-4">Loading collections...</div>;
  }

  return (
    <div className="mt-4">
      {Object.entries(collections).map(([collection, nfts]) => {
        console.log(`Rendering collection ${collection}:`, nfts);
        return (
          <div key={collection} className="mb-6">
            <h5 className="card-title mb-3">
              {collection === "JYD" && "JunkYard Dogs"}
              {collection === "PUPPIES" && "JunkYard Puppies"}
              {collection === "BONES" && "JunkYard Bones"}
              {collection === "K9000" && "JunkYard K9000"}
            </h5>
            <div className="row g-3">
              {nfts.map((nft) => (
                <div key={nft.id} className="col-12 col-md-6 col-lg-4">
                  <NFTCard nft={nft} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {Object.keys(collections).length === 0 && (
        <div className="text-center p-4">
          No JunkYard NFTs found in this wallet
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
