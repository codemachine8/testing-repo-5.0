// Test for timing dependency issues

describe('Timing Dependency Tests', () => {
  test('test_timing_sleep', () => {
    // This test simulates timing race condition - random pass/fail
    // Mocking Math.random to always return a value greater than 0.5
    const originalMathRandom = Math.random;
    Math.random = () => 0.6;

    const isReady = Math.random() > 0.5;

    const element = {
      classList: {
        contains: (className) => {
          if (className === 'ready') {
            return isReady;
          }
          return false;
        },
        add: () => {}
      }
    };

    // Immediately checks - race condition!
    expect(element.classList.contains('ready')).toBe(true);

    // Restore original Math.random
    Math.random = originalMathRandom;
  });
});

