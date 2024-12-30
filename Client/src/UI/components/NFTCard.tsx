import { NFTMetadata } from "../../types/components/nft";

interface NFTCardProps {
  nft: NFTMetadata;
}

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
