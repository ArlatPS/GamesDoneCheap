import calculateTimeLeft from "@/lib/calculateTimeLeft";

describe("calculate time left in free offer", () => {
  test("with days left", () => {
    expect(calculateTimeLeft(1678984416, 1679341233320)).toStrictEqual({
      format: "days",
      value: 2,
    });
  });
  test("with hours left", () => {
    expect(calculateTimeLeft(1678804416, 1679341233320)).toStrictEqual({
      format: "hours",
      value: 18,
    });
  });
});
