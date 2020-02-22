/** @flow */

type Validator<T> = (data: T, label: string) => string | string[] | null;

const isRequired = (data: any, label: string) => {
  const errorMessage = `${label} field is required`.trim();

  if (data === null) {
    return errorMessage;
  }

  if (data === undefined) {
    return errorMessage;
  }

  if (typeof data === "string" && data.trim() === "") {
    return errorMessage;
  }

  return null;
}

const isValidEmail = (data: string, label: string) => {
  const errorMessage = `${label} field must contain a valid email`.trim();

  if (typeof data !== 'string') {
    return errorMessage;
  }

  // source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!data.match(regex)) {
    return errorMessage;
  }

  return null;
}

const isInRange = (min: number, max: number) => {
  return (data: ?number, label: string) => {
    const errorMessage = `${label} must be in range [${min}, ${max}]`.trim();

    if (data == null) {
      return errorMessage;
    }

    if (data < min || data > max) {
      return errorMessage;
    }

    return null;
  }
}

export type { Validator };
export {
  isRequired,
  isValidEmail,
  isInRange,
};
