import { NFTMetadata } from "../../types/components/nft";

interface NFTCardProps {
  nft: NFTMetadata;
}

/**
 * Component representing an NFT card.
 *
 * @component
 * @param {NFTCardProps} props - The properties for the NFTCard component.
 * @param {Object} props.nft - The NFT data to display.
 * @param {string} props.nft.image - The URL of the NFT image.
 * @param {string} props.nft.title - The title of the NFT.
 * @param {Array} props.nft.attributes - The attributes of the NFT.
 * @param {string} props.nft.attributes[].trait_type - The type of the attribute.
 * @param {string | number} props.nft.attributes[].value - The value of the attribute.
 * @returns {JSX.Element} The rendered NFT card component.
 */

export const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
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
