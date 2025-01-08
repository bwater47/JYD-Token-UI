import { NFTMetadata } from "../../types/components/nft";
import "../../styles/UI/features/NFTCard.css";

interface NFTCardProps {
  nft: NFTMetadata;
}

/**
 * Component representing an NFT card.
 *
 * @param props - The properties for the NFTCard component.
 * @returns The rendered NFT card component.
 */

export const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  if (!nft.image) {
    console.warn("NFT missing image:", nft);
    return null;
  }

  return (
    <div className="card h-100">
      <img
        src={nft.image}
        alt={nft.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h6 className="card-title">{nft.title}</h6>
        <div className="row g-2 mt-2">
          {nft.attributes.map((attr, idx) => (
            <div key={idx} className="col-6">
              <div className="bg-light p-2 rounded">
                <small className="fw-bold">{attr.trait_type}</small>
                <div className="text-muted small">{attr.value.toString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
