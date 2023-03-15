import { formatDistanceToNow } from "date-fns";

export type CalculateTimeLeftType = {
  format: "hours" | "days";
  value: number;
};

export default function calculateTimeLeft(
  lastChange: number
): CalculateTimeLeftType {
  const now = Date.now();
  const end = lastChange * 1000 + 7 * 24 * 60 * 60 * 1000;
  const hoursEnd = Math.floor((end - now) / 1000 / 3600);

  if (hoursEnd < 24) {
    return { format: "hours", value: hoursEnd };
  }
  return { format: "days", value: Math.floor(hoursEnd / 24) };
}
