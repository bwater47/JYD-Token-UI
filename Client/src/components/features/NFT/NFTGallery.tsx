import { NFTCard } from "../../../UI/features/NFTCard";
import { useMetaMask } from "../../../hooks/useMetaMask";
import useNFTs from "../../../hooks/useNFTs";
import "../../../styles/components/features/NFT/NFTGallery.css";
import { useEffect, useState } from "react";
import { getBalance } from "../../../services/etherService";
import { ethers } from "ethers";

/**
 * Displays NFT gallery component
 * Fetches and renders NFTs from connected wallet grouped by collections
 */

const NFTGallery = () => {
  const { account } = useMetaMask();
  const { collections, loading } = useNFTs(account);
  const [ethBalance, setEthBalance] = useState<string>("0");
  const [usdBalance, setUsdBalance] = useState<string>("0");

  // console.log("Current account:", account);
  // console.log("NFT Collections:", collections);

  useEffect(() => {
    const fetchBalances = async () => {
      if (account) {
        try {
          const balance = await getBalance(account);
          const ethValue = ethers.formatEther(balance);
          setEthBalance(parseFloat(ethValue).toFixed(4));

          // Fetch ETH price in USD using a simple fetch to CoinGecko API
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
          );
          const data = await response.json();
          const ethPrice = data.ethereum.usd;
          const usdValue = (parseFloat(ethValue) * ethPrice).toFixed(2);
          setUsdBalance(usdValue);
        } catch (error) {
          console.error("Error fetching balances:", error);
        }
      }
    };

    fetchBalances();
  }, [account]);

  if (!account) {
    return <div className="text-center p-4">Please connect your wallet</div>;
  }

  if (loading) {
    return <div className="text-center p-4">Loading collections...</div>;
  }

  return (
    <div className="mt-4">
      <div className="mb-4 p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-bold mb-2">Wallet Balance</h4>
        <div className="text-lg">
          <div>{ethBalance} ETH</div>
          <div className="text-gray-400">${usdBalance} USD</div>
        </div>
      </div>

      {Object.entries(collections).map(([collection, nfts]) => (
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
