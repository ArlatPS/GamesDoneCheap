"use client";
import { ButtonStyled } from "@/style/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ScreenshotGallery({
  screenshots,
}: {
  screenshots: { id: number; path_full: string; path_thumbnail: string }[];
}) {
  // handling gallery turning
  const [currScreenshot, setCurrScreenshot] = useState(0);
  const [screenshotChanging, setScreenshotChanging] = useState(true);

  // gets triggered in a loop and it stops and restarts according to user clicking buttons
  useEffect(() => {
    const timer = setTimeout(() => {
      if (screenshotChanging) {
        if (currScreenshot == screenshots.length - 1) {
          setCurrScreenshot(0);
        } else {
          setCurrScreenshot((curr) => curr + 1);
        }
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [currScreenshot, screenshotChanging, screenshots]);

  function handleScreenshots(action: "next" | "prev") {
    if (action == "next") {
      if (currScreenshot == screenshots.length - 1) {
        setCurrScreenshot(0);
      } else {
        setCurrScreenshot((curr) => curr + 1);
      }
    } else if (action == "prev") {
      if (currScreenshot == 0) {
        setCurrScreenshot(screenshots.length - 1);
      } else {
        setCurrScreenshot((curr) => curr - 1);
      }
    }
    // after changing delay automatic changing of screenshots
    if (screenshotChanging) {
      setScreenshotChanging(false);
      setTimeout(() => setScreenshotChanging(true), 10000);
    }
  }

  return (
    <div className="screenshotGallery">
      <Image
        src={screenshots[currScreenshot].path_full}
        alt={"Screenshot from a game"}
        width={650}
        height={365}
      />
      <div className="buttons">
        <ButtonStyled onClick={() => handleScreenshots("prev")}>
          prev
        </ButtonStyled>
        <ButtonStyled onClick={() => handleScreenshots("next")}>
          next
        </ButtonStyled>
      </div>
    </div>
  );
}
