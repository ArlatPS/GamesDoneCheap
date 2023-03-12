import {
  RefObject,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

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

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setGlobalMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    if (distance.current <= threshold) {
      setDistanceToReturn(distance.current);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [threshold]);

  const distance = useRef(threshold + 1);
  const [distanceToReturn, setDistanceToReturn] = useState(threshold + 1);

  useEffect(() => {
    if (
      proximityRef.current?.offsetTop &&
      proximityRef.current?.offsetLeft &&
      proximityRef.current?.offsetHeight &&
      proximityRef.current?.offsetWidth
    ) {
      distance.current = calculateDistanceFromElement(
        proximityRef.current.offsetTop,
        proximityRef.current.offsetLeft,
        proximityRef.current.offsetHeight,
        proximityRef.current.offsetWidth,
        globalPositionDeferred.x,
        globalPositionDeferred.y
      );
    }
    if (distance.current <= threshold) {
      setDistanceToReturn(distance.current);
    }
  }, [proximityRef, threshold, globalPositionDeferred]);
  return distanceToReturn;
}
