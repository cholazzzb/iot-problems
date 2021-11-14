export var AverageFinder = function () {
  this.sum = 0;
  this.numOfData = 0;
};

/**
 * @param {number} num
 */
AverageFinder.prototype.addNum = function (num) {
  this.sum += num;
  this.numOfData++;
};

/**
 * @returns {number}
 */
AverageFinder.prototype.findAverage = function () {
  return this.sum / this.numOfData;
};
