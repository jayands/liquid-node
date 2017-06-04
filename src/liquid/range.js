// @flow
class Range {
  start: number;
  end: number;
  step: number = 1;
  /**
   * @constructor
   *
   * @param {Number} start    The number to start on
   * @param {Number} end      The number to end on
   * @param {Number} [step=1] The number by which to step
   */
  constructor(start: number, end: number, step: number = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
    if (this.start > this.end) {
      this.step = -1 * Math.abs(step);
    }
    Object.seal(this);
  }
  /**
   * Applies to some of the items in Range
   * @param  {Function} fun The function to apply
   * @return {Boolean}     Whether the function can be applied to any in the range
   */
  some(fun: Function) {
    let current = this.start;
    const end = this.end;
    const step = this.step;
    if (step > 0) {
      while (current < end) {
        if (fun(current)) {
          return true;
        }
        current += step;
      }
    } else {
      while (current > end) {
        if (fun(current)) {
          return true;
        }
        current += step;
      }
    }
    return false;
  }
  /**
   * Applies the function to each of the elements without returning anything
   *
   * @param  {Function} fun The function to apply
   */
  forEach(fun: Function) {
    this.some((e: number) => {
      fun(e);
      return false;
    });
  }
  /**
   * Converts the Range to a numeric array
   * @return {Number[]} the range represented numerically
   */
  toArray(): number[] {
    const array: number[] = [];
    this.forEach((e: number) => {
      array.push(e);
    });
    return array;
  }
  get length(): number {
    return Math.floor((this.end - this.start) / this.step);
  }
}

export default Range;
