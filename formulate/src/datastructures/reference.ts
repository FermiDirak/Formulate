/** A reference is value that be accessed as both a pointer and as a value */
class Reference<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  updateValue(newValue: T) {
    this.value = newValue;
  }

  /** Converts a nested reference into an object
   * @param reference The reference to deconstruct
   * @return The data the nested reference conists of */
  getValue(): any {
    const { value } = this;

    if (Array.isArray(value)) {
      return value.map(val => val instanceof Reference ? val.getValue() : val);

    } else if (typeof value === 'object' && value !== null) {
      const clone = {};

      Object.keys(value).forEach(key => {
        clone[key] = value[key] instanceof Reference ?
          value[key].getValue()
          : value[key];
      });

      return clone;
    }

    return value;
  }
}

export default Reference;
