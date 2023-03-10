import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <Image width={800} height={800} src={"/loading.jpg"} alt={"loading"} />
    </div>
  );
}
