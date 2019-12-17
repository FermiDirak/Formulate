/** If condition is false, invariant will throw the errorMessage */
export default function invariant(condition: boolean, errorMessage: string) {
  if (!condition) {
    throw new Error(errorMessage);
  }
};