import { useEffect, useState } from "react";
import { memo } from "react";

function SectionDlc({ ids }: { ids: number[] }) {
  const [dlc, setDlc] = useState("loading");
  useEffect(() => {
    async function fetchDlc() {
      const response = await fetch(`/api/steamIdToGameId?ids=${ids}`, {
        next: { revalidate: 24 * 60 * 60 },
      });
      const res = await response.json();
      console.log(res);
      setDlc(res);
    }
    fetchDlc();
  }, [ids]);
  return (
    <div>
      <h4>Sth will happen here</h4>
    </div>
  );
}

// a lot of fetching so
export default memo(SectionDlc);
