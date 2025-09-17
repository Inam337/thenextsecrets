// Simple utility function for testing
function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}

describe('Utility Functions', () => {
  describe('addNumbers', () => {
    it('should add two positive numbers correctly', () => {
      expect(addNumbers(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(addNumbers(-1, 5)).toBe(4);
    });

    it('should handle zero', () => {
      expect(addNumbers(0, 10)).toBe(10);
    });
  });

  describe('multiplyNumbers', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(multiplyNumbers(2, 3)).toBe(6);
    });

    it('should handle negative numbers', () => {
      expect(multiplyNumbers(-2, 3)).toBe(-6);
    });

    it('should handle zero', () => {
      expect(multiplyNumbers(0, 10)).toBe(0);
    });
  });

  describe('isEven', () => {
    it('should return true for even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(0)).toBe(true);
    });

    it('should return false for odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isEven(-1)).toBe(false);
    });
  });
}); 