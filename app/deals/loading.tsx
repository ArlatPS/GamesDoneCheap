import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <Image width={1000} height={1000} src={"/loading.jpg"} alt={"loading"} />
    </div>
  );
}
