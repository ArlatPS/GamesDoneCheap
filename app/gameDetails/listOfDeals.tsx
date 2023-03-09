import { useEffect, useState } from "react";

export default function ListOfDeals() {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    async function getStores() {
      const response = await fetch("/api/stores");
      const responseAfterJSON = await response.json();
      console.log(responseAfterJSON);
      setStores(responseAfterJSON);
    }
    getStores();
  }, []);
  return <div>{stores.length ? <h1>{stores[0].storeName}</h1> : null}</div>;
}
