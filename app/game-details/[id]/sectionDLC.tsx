import DLC from "./dlc";

async function fetchDlc(ids: number[]) {
  const response = await fetch(
    `http://localhost:3000/api/steamIdToGameId?ids=${ids}`
  );
  const res = await response.json();
  return res.ids as string[];
}

export default async function SectionDlc({ ids }: { ids: number[] }) {
  const DLCs = await fetchDlc(ids);

  if (DLCs.length == 0) {
    return <h5>No DLCs found</h5>;
  }
  return (
    <div>
      {DLCs.map((id) => (
        <DLC key={id} idShark={id} />
      ))}
    </div>
  );
}
