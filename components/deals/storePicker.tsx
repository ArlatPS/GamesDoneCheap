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

  return (
    <div>
      <h3 onClick={() => setOpened((n) => !n)}>Choose Stores</h3>
      {opened ? (
        <div>
          <button
            type="button"
            onClick={() => {
              if (chosenStores.length > 0) {
                setChosenStores([]);
              } else {
                setChosenStores(stores.map((store) => store.storeID));
              }
            }}
          >
            Reset
          </button>
          <ul>
            {stores.map((store) => {
              // store.storeID omitted last item
              let isChecked = false;
              for (let i = 0; i < chosenStores.length; i++) {
                if (store.storeID == chosenStores[i]) isChecked = true;
              }
              return (
                <div key={store.storeID}>
                  <input
                    type="checkbox"
                    id={store.storeID}
                    value={store.storeID}
                    onChange={(e) => {
                      if (isChecked) {
                        setChosenStores((stores) =>
                          stores.filter((id) => id != e.target.value)
                        );
                      } else {
                        setChosenStores([...chosenStores, e.target.value]);
                      }
                    }}
                    checked={isChecked}
                  />
                  <label htmlFor={store.storeID}>{store.storeName}</label>
                </div>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
