"use client";

import ErrorSVG from "@/components/svg/error";
import { ButtonStyled } from "@/style/button";
import { ErrorStyled } from "@/style/errorStyled";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  //...

  const router = useRouter();

  return (
    <ErrorStyled>
      <h2>Something went wrong!</h2>
      <ButtonStyled
        onClick={
          // try to refresh
          () => router.refresh()
        }
      >
        Try again
      </ButtonStyled>
      <ErrorSVG />
    </ErrorStyled>
  );
}
