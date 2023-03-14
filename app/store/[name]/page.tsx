import { StoreFromShark } from "@/globalTypes";
import getStores from "@/lib/getStores";

export default async function StorePage({
  params,
}: {
  params: { name: string };
}) {
  const stores = await getStores();
  let found: StoreFromShark = {
    storeName: "not found",
    images: {
      banner: "",
      icon: "",
      logo: "",
    },
    isActive: 0,
    storeID: "-1",
  };
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].storeName === params.name) {
      found = stores[i];
    }
  }
  return (
    <div>
      <h1>Search results for {params.name}</h1>
      <h4>{found.storeName}</h4>{" "}
    </div>
  );
}
