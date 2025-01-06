import { NFTCard } from "../UI/components/NFTCard";
import { useMetaMask } from "../hooks/useMetaMask";
import useNFTs from "../hooks/useNFTs"; // Import the custom hook

const NFTGallery = () => {
  const { account } = useMetaMask();
  const { collections, loading } = useNFTs(account); // Use the custom hook

  if (loading) {
    return <div className="text-center p-4">Loading collections...</div>;
  }

  return (
    <div className="mt-4">
      {Object.entries(collections).map(([collection, nfts]) => (
        <div key={collection} className="mb-6">
          <h5 className="card-title mb-3">
            {collection === "JYD" && "JunkYard Dogs"}
            {collection === "PUPPIES" && "JunkYard Puppies"}
            {collection === "BONES" && "JunkYard 9000"}
          </h5>
          <div className="row g-3">
            {nfts.map((nft) => (
              <div key={nft.id} className="col-12 col-md-6 col-lg-4">
                <NFTCard nft={nft} />
              </div>
            ))}
          </div>
        </div>
      ))}
      {Object.keys(collections).length === 0 && (
        <div className="text-center p-4">
          No JunkYard NFTs found in this wallet
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
