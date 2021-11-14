import { AverageFinder } from "./AverageFinder";

describe("AverageFinder", () => {
  it("should add a number to the array", () => {
    const averageFinder = new AverageFinder();
    averageFinder.addNum(1);
    expect(averageFinder.sum).toEqual(1);
  });

  it("should return 6", () => {
    const averageFinder = new AverageFinder();
    averageFinder.addNum(1);
    averageFinder.addNum(11);
    expect(averageFinder.findAverage()).toEqual(6);
  });
});
