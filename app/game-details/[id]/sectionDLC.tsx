import { useEffect, useState } from "react";
import { memo } from "react";
import DLC from "./dlc";

function SectionDlc({ ids }: { ids: number[] }) {
  const [dlc, setDlc] = useState<"loading" | string[]>("loading");
  useEffect(() => {
    async function fetchDlc() {
      const response = await fetch(`/api/steamIdToGameId?ids=${ids}`);
      const res = await response.json();
      console.log(res);
      setDlc(res.ids as string[]);
    }
    fetchDlc();
  }, [ids]);
  if (dlc == "loading") {
    return <h5>loading</h5>;
  }
  if (dlc.length == 0) {
    return <h5>No DLCs found</h5>;
  }
  return (
    <div>
      {dlc.map((id) => (
        <DLC key={id} idShark={id} />
      ))}
    </div>
  );
}
// to prevent rerenders
export default memo(SectionDlc);
