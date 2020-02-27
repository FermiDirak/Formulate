import {isRequired, isValidEmail, isInRange} from "../src/validators";

const TEST_LABEL = "label";

describe("validators", () => {
  describe("isRequired", () => {
    it("returns null if data is a non-empty string", () => {
      const res = isRequired("test", TEST_LABEL);
      expect(res).toBe(null);
    });

    it("returns null if data is zero, negative, or any number", () => {
      expect(isRequired(-1, TEST_LABEL)).toBe(null);
      expect(isRequired(0, TEST_LABEL)).toBe(null);
      expect(isRequired(1, TEST_LABEL)).toBe(null);
    });

    it("creates an error if data is the empty string", () => {
      const res = isRequired("", TEST_LABEL);
      expect(typeof res).toBe("string");
    });

    it("creates an error if data is null", () => {
      const res = isRequired(null, TEST_LABEL);
      expect(typeof res).toBe("string");
    });

    it("creates an error if data is undefined", () => {
      const res = isRequired(undefined, TEST_LABEL);
      expect(typeof res).toBe("string");
    });
  });

  describe("isValidEmail", () => {
    it("considers my email valid", () => {
      const res = isValidEmail("ManueleBryan@gmail.com", TEST_LABEL);
      expect(res).toBe(null);
    });
  });

  describe("isInRange", () => {
    it("is inclusive for both start and end range", () => {
      const fn = isInRange(0, 100);

      expect(fn(0, TEST_LABEL)).toBe(null);
      expect(fn(100, TEST_LABEL)).toBe(null);
    });

    it("creates an error if data is null", () => {
      const fn = isInRange(0, 100);
      const res = fn(null, TEST_LABEL);

      expect(typeof res).toBe("string");
    });

    it("creates an error if data is out of range", () => {
      const fn = isInRange(0, 100);
      const res = fn(101, TEST_LABEL);

      expect(typeof res).toBe("string");
    });
  });
});