import { RefObject, useDeferredValue, useEffect, useState } from "react";

function calculateDistanceFromElement(
  top: number,
  left: number,
  height: number,
  width: number,
  x: number,
  y: number
) {
  // if inside return 0
  if (x >= left && x <= left + width && y >= top && y <= top + height) {
    return 0;
  }
  // on right height but not inside
  if (y > top && y <= top + height) {
    // on right side of the element
    if (x < left) {
      return left - x;
    }
    // on left side
    return x - left - width;
  }
  // on right width but not inside
  if (x > left && x <= left + width) {
    // above the element
    if (y < top) {
      return top - y;
    }
    // below the element
    return y - top - height;
  }
  // in left corners
  if (x < left) {
    // left top corner
    if (y < top) {
      // Pythagorean equation
      return Math.floor(
        Math.sqrt(Math.pow(left - x, 2) + Math.pow(top - y, 2))
      );
    }
    // left bottom corner
    return Math.floor(
      Math.sqrt(Math.pow(left - x, 2) + Math.pow(y - top - height, 2))
    );
  }
  // in right corners
  // right top corner
  if (y < top) {
    return Math.floor(
      Math.sqrt(Math.pow(x - left - width, 2) + Math.pow(top - y, 2))
    );
  }
  // right bottom corner
  return Math.floor(
    Math.sqrt(Math.pow(x - left - width, 2) + Math.pow(y - top - height, 2))
  );
}

export default function useProximityEffect(
  proximityRef: RefObject<HTMLDivElement>,
  threshold: number
) {
  const [globalMousePosition, setGlobalMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const globalPositionDeferred = useDeferredValue(globalMousePosition);

  // handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setGlobalMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [threshold]);

  const [distance, setDistance] = useState(threshold + 1);

  // getBoundingClientRect() provides real position in viewport
  useEffect(() => {
    if (
      proximityRef.current?.getBoundingClientRect().top &&
      proximityRef.current?.getBoundingClientRect().left &&
      proximityRef.current?.getBoundingClientRect().height &&
      proximityRef.current?.getBoundingClientRect().width
    ) {
      setDistance(
        calculateDistanceFromElement(
          proximityRef.current?.getBoundingClientRect().top,
          proximityRef.current?.getBoundingClientRect().left,
          proximityRef.current?.getBoundingClientRect().height,
          proximityRef.current?.getBoundingClientRect().width,
          globalPositionDeferred.x,
          globalPositionDeferred.y
        )
      );
    }
  }, [proximityRef, threshold, globalPositionDeferred]);
  return distance;
}
