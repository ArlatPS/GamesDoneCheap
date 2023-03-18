export type StoreOfInterest = {
  storeID: string;
  storeName: string;
  storeNameDisplay: string;
  banner: {
    file: string;
    height: number;
    width: number;
  };
};

export const storesOfInterest: StoreOfInterest[] = [
  {
    storeID: "1",
    storeName: "steam",
    storeNameDisplay: "Steam",
    banner: {
      file: "/store-banners/steam-banner.jpg",
      height: 400,
      width: 1200,
    },
  },
  {
    storeID: "7",
    storeName: "gog",
    storeNameDisplay: "GOG",
    banner: {
      file: "/store-banners/gog-banner.jpg",
      height: 500,
      width: 1500,
    },
  },
  {
    storeID: "8",
    storeName: "origin",
    storeNameDisplay: "Origin",
    banner: {
      file: "/store-banners/origin-banner.png",
      height: 1754,
      width: 4901,
    },
  },
  {
    storeID: "13",
    storeName: "uplay",
    storeNameDisplay: "Ubisoft",
    banner: {
      file: "/store-banners/ubi-banner.jpg",
      height: 580,
      width: 1740,
    },
  },
  {
    storeID: "25",
    storeName: "epic-games",
    storeNameDisplay: "Epic Games",
    banner: {
      file: "/store-banners/epic-banner.png",
      height: 400,
      width: 1200,
    },
  },
];
