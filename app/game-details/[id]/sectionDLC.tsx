import { steamIdToGameId } from "@/lib/refactoredAPI/steamIdToGameId";
import { DLCSectionStyled } from "@/style/gameDetails/dlcSection";
import { ListOfDealsTableStyled } from "@/style/listOfDeals";
import DLC from "./dlc";

async function fetchDlc(ids: number[]) {
  const response = await fetch(
    `http://localhost:3000/api/steamIdToGameId?ids=${ids}`
  );
  const res = await response.json();
  return res.ids as string[];
}

async function fetchDlcNew(ids: number[]) {
  const response = await steamIdToGameId(ids);
  return response as string[];
}

export default async function SectionDlc({ ids }: { ids: number[] }) {
  const DLCs = await fetchDlcNew(ids);

  if (DLCs.length == 0) {
    return null;
  }
  return (
    <DLCSectionStyled>
      <h2>DLC</h2>
      <ListOfDealsTableStyled className="tableForDLCs">
        <tbody>
          <tr>
            <th colSpan={2}>Cover</th>
            <th colSpan={2}>Title</th>
            <th colSpan={1}>Deals</th>
          </tr>
          {DLCs.map((id) => (
            <DLC key={id} idShark={id} />
          ))}
        </tbody>
      </ListOfDealsTableStyled>
    </DLCSectionStyled>
  );
}
