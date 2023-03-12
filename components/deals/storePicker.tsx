import { StoreFromShark } from "@/globalTypes";
import { Dispatch, SetStateAction, useState } from "react";

export default function StorePicker({
  stores,
  chosenStores,
  setChosenStores,
}: {
  stores: StoreFromShark[];
  chosenStores: string[];
  setChosenStores: Dispatch<SetStateAction<string[]>>;
}) {
  const [opened, setOpened] = useState(false);
  console.log(chosenStores);
  console.log(stores);
  return (
    <div>
      <h3 onClick={() => setOpened((n) => !n)}>Choose Stores</h3>
      {opened ? (
        <ul>
          {stores.map((store) => {
            console.log(store.storeID);
            if (store.storeID in chosenStores) {
              return (
                <div key={store.storeID}>
                  <input
                    type="checkbox"
                    id={store.storeID}
                    value={store.storeID}
                    onChange={(e) => console.log(e.target.value)}
                    checked
                  />
                  <label htmlFor={store.storeID}>{store.storeName}</label>
                </div>
              );
            }
          })}
        </ul>
      ) : null}
    </div>
  );
}
