export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTMetadata {
  id: string;
  title: string;
  image: string;
  attributes: NFTAttribute[];
}

export interface RawAttribute {
  trait_type?: string;
  value?: string | number;
}

export interface OwnedNft {
  tokenId: string;
  rawMetadata?: {
    name?: string;
    image?: string;
    attributes?: RawAttribute[];
  };
  media?: Array<{
    gateway?: string;
  }>;
}

export interface CollectionsState {
  [key: string]: NFTMetadata[];
}
