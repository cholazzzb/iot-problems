import { MedianFinder } from "./MedianFinder";

describe("AverageFinder", () => {
  it("case odd number of datas", () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(1);
    medianFinder.addNum(11);
    medianFinder.addNum(2);
    expect(medianFinder.findMedian()).toEqual(2);
  });

  it("case evem number of datas", () => {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(1);
    medianFinder.addNum(11);
    expect(medianFinder.findMedian()).toEqual(6);
  });
});
