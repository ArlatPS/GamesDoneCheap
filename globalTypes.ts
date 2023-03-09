export type DealsListItem = {
  dealID: string;
  dealRating: string;
  gameID: string;
  internalName: string;
  isOnSale: "1" | "0";
  lastChange: number;
  metacriticLink: string | null;
  metacriticScore: string;
  normalPrice: string;
  releaseDate: number;
  salePrice: string;
  savings: string;
  steamAppID: string | null;
  steamRatingCount: string;
  steamRatingPercent: string;
  steamRatingText: string | null;
  storeID: string;
  title: string;
  thumb: string;
};

export type DealsList = {
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
  storeID: string;
}[];

export type GameFromShark = {
  info: {
    steamAppID: string | null;
    thumb: string;
    title: string;
  };
  cheapestPriceEver: {
    date: number;
    price: string;
  };
  deals: DealsList;
};

export type StoreFromShark = {
  images: {
    banner: string;
    icon: string;
    logo: string;
  };
  isActive: 0 | 1;
  storeID: string;
  storeName: string;
};
