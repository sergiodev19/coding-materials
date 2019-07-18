// Task: Implement a 'Range Collection' class.
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {

  /**
   * Validate a range
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */

  static validateRange(range){
    if(range && range.constructor === Array){
      if(range.length !== 2) {
        return {
          success: false,
          error: 'Range length must be 2 numbers'
        };
      } else if(isNaN(range[0]) || isNaN(range[1])) {
        return {
          success: false,
          error: 'Elements of range must be type of number'
        };
      } else if (range[0] > range[1]) {
        return {
          success: false,
          error: 'The first number must be more then second'
        };
      } else {
        return {
          success: true,
          error: null
        };
      }
    } else {
      return {
        success: false,
        error: 'Range must be an Array'
      };
    }
  }

  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    if(!RangeCollection.validateRange(range).success){
      throw new Error(RangeCollection.validateRange(range).error);
    }

    RangeCollection.range.push(range);

    RangeCollection.range.sort((a, b) => {
      return a[0] < b[0] ? -1 : 1
    });

    for (let i = 0; i < RangeCollection.range.length-1; ) {
      const current = RangeCollection.range[i];
      const next = RangeCollection.range[i + 1];
      if(current[1] >= next[0]){
        if(current[1] < next[1]){
          current[1] = next[1];
        }
        RangeCollection.range.splice(i+1, 1);
      } else {
        i++;
      }
    }
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    if(!RangeCollection.validateRange(range).success){
      throw new Error(RangeCollection.validateRange(range).error);
    }
    for (let i = 0; i < RangeCollection.range.length; i++) {
      const current = RangeCollection.range[i];
      if(range[1] <= current[0]){
        break;
      }
      if(range[0] < current[1]){
        if(range[0] > current[0]){
          RangeCollection.range.splice(i, 0, [current[0], range[0]]);
          i++;
        }
        if(range[1] < current[1]){
          current[0] = range[1];
          break;
        } else {
          RangeCollection.range.splice(i, 1);
          i--;
        }
      }
    }
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    let result = ''
    RangeCollection.range.forEach(range => {
      result += ` [${range[0]}, ${range[range.length-1]})`;
    });
    console.log(result);
  }
}

RangeCollection.range = [];

// Example run
const rc = new RangeCollection();

rc.add([1, 5]);
rc.print();
// Should display: [1, 5)

rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)

rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)

rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
