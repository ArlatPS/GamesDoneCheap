import { steamIdToGameId } from "@/lib/refactoredAPI/steamIdToGameId";

test.skip("ids conversion", async () => {
  expect(
    await steamIdToGameId([
      2158250, 1308090, 947510, 645402, 1478300, 1436950, 1388850, 1284470,
      1270540, 1253990,
    ])
  ).toStrictEqual([
    "253552",
    "216107",
    "195238",
    "175701",
    "227747",
    "225565",
    "223102",
    "221208",
    "218544",
    "216108",
  ]);
});
