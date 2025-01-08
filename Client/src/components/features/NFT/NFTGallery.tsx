import { NFTCard } from "../../../UI/features/NFTCard";
import { useMetaMask } from "../../../hooks/useMetaMask";
import useNFTs from "../../../hooks/useNFTs";
import "../../../styles/components/features/NFT/NFTGallery.css";

/**
 * Displays NFT gallery component
 * Fetches and renders NFTs from connected wallet grouped by collections
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
