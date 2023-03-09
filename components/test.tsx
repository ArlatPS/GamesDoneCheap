"use client";

import { useEffect, useState } from "react";

export default function Test() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/example");
      const toReturn = await res.json();
      setMessage(toReturn.mess);
    }
    fetchData();
  }, []);
  return <h2>{message}</h2>;
}
