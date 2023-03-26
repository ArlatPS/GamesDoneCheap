"use client";

import ErrorSVG from "@/components/svg/error";
import { ButtonStyled } from "@/style/button";
import { ErrorStyled } from "@/style/errorStyled";
import { useEffect } from "react";

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

  return (
    <ErrorStyled>
      <h2>Something went wrong!</h2>
      <ButtonStyled
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </ButtonStyled>
      <ErrorSVG />
    </ErrorStyled>
  );
}
