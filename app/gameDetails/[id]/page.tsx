"use client";

import { useEffect, useState } from "react";

export default function GameDetails({ params }: { params: { id: string } }) {
  //   const [message, setMessage] = useState("");
  //   useEffect(() => {
  //     async function fetchData() {
  //       const res = await fetch("http://localhost:3000/api/example");
  //       const toReturn = await res.json();
  //       setMessage(toReturn.mess);
  //     }
  //     fetchData();
  //   }, []);
  return <h2>{params.id}</h2>;
}
