import { StoreFromShark } from "@/globalTypes";

export default async function getStores() {
  // revalidate stores every 24h
  try {
    const response = await fetch("https://www.cheapshark.com/api/1.0/stores", {
      next: { revalidate: 24 * 60 * 60 },
    });
    const responseJ = await response.json();
    return responseJ as StoreFromShark[];
  } catch {
    return [];
  }
}
