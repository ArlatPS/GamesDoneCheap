"use client";
import { useEffect, useState } from "react";
import { H1WithHoverEffect } from "@/style/flexMain";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26

// it will need Suspense with good fallback
export default function HeaderWithEffect({ text }: { text: string }) {
  const [hovering, setHovering] = useState(false);
  const [textDisplayed, setTextDisplayed] = useState("");
  useEffect(() => {
    // start showing real letters after small delay
    let iteration = -2;
    //interval for changing text
    const interval = setInterval(() => {
      if (hovering) iteration = 0;
      const output: string[] = [];
      text
        .toUpperCase()
        .split("")
        .map((letter, index) => {
          // if index smaller then current iteration display real letter
          if (index < iteration) {
            output.push(letter);
            // otherwise display random letter
          } else {
            output.push(LETTERS[Math.floor(Math.random() * 26)]);
          }
        });
      iteration += 0.6;
      setTextDisplayed(output.join(""));
      // if all needed iterations done - clearInterval
      if (iteration > text.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text, hovering]);

  return (
    <H1WithHoverEffect
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {textDisplayed}
    </H1WithHoverEffect>
  );
}
