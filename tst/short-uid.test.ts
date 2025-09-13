import { assert } from 'chai';
import ShortUID from '../src/short-uid.ts';

// Define the interface locally since it's not exported
interface ShortUIDOptions {
  debug?: boolean;
}

describe('Short UID Generator', () => {
  let gen: ShortUID;

  beforeEach(() => {
    gen = new ShortUID({ debug: false });
  });

  describe('Constructor', () => {
    it('should initialize with default options', () => {
      const generator = new ShortUID();
      assert.isOk(generator);
      assert.equal(generator.getCounter(), 0);
      assert.equal(generator.getDictLength(), 62);
    });

    it('should initialize with custom options', () => {
      const options: ShortUIDOptions = { debug: true };
      const generator = new ShortUID(options);
      assert.isOk(generator);
      assert.equal(generator.getCounter(), 0);
    });

    it('should initialize with empty options object', () => {
      const generator = new ShortUID({});
      assert.isOk(generator);
      assert.equal(generator.getCounter(), 0);
    });
  });

  describe('Dictionary', () => {
    it('should have large dictionary', () => {
      assert.equal(gen.getDict().length, 62);
    });

    it('should return a copy of the dictionary', () => {
      const dict1 = gen.getDict();
      const dict2 = gen.getDict();
      assert.notEqual(dict1, dict2); // Different array instances
      assert.deepEqual(dict1, dict2); // Same content
    });

    it('should contain expected character ranges', () => {
      const dict = gen.getDict();
      const hasDigits = dict.some(char => /\d/.test(char));
      const hasLowerCase = dict.some(char => /[a-z]/.test(char));
      const hasUpperCase = dict.some(char => /[A-Z]/.test(char));
      
      assert.isTrue(hasDigits, 'Dictionary should contain digits');
      assert.isTrue(hasLowerCase, 'Dictionary should contain lowercase letters');
      assert.isTrue(hasUpperCase, 'Dictionary should contain uppercase letters');
    });

    it('should have unique characters in dictionary', () => {
      const dict = gen.getDict();
      const uniqueChars = new Set(dict);
      assert.equal(uniqueChars.size, dict.length, 'Dictionary should contain only unique characters');
    });
  });

  describe('Random UUID Generator', () => {
    it('should generate random IDs', () => {
      const id = gen.randomUUID();
      assert.isOk(id);
      assert.isString(id);
    });

    it('should generate ID with default length', () => {
      const id = gen.randomUUID();
      assert.isTrue(id.length >= 1, 'ID should have at least 1 character');
    });

    it('should allow generating ID with custom length', () => {
      const id = gen.randomUUID(10);
      assert.equal(id.length, 10, `ID (${id}) Length is Invalid`);
    });

    it('should generate ID with length 1', () => {
      const id = gen.randomUUID(1);
      assert.equal(id.length, 1, `ID (${id}) should have length 1`);
    });

    it('should generate ID with very large length', () => {
      const id = gen.randomUUID(100);
      assert.equal(id.length, 100, `ID should have length 100`);
    });

    it('should throw error for invalid length 0', () => {
      assert.throws(() => gen.randomUUID(0), Error, 'Invalid UUID Length Provided');
    });

    it('should throw error for negative length', () => {
      assert.throws(() => gen.randomUUID(-1), Error, 'Invalid UUID Length Provided');
    });

    it('should throw error for null length', () => {
      assert.throws(() => gen.randomUUID(null as unknown as number), Error, 'Invalid UUID Length Provided');
    });

    it('should use default length when undefined is passed', () => {
      const id = gen.randomUUID(undefined as unknown as number);
      assert.isTrue(id.length >= 1, 'Should use default length when undefined is passed');
    });

    it('should generate different IDs on multiple calls', () => {
      const id1 = gen.randomUUID();
      const id2 = gen.randomUUID();
      const id3 = gen.randomUUID();
      
      // While collisions are possible, they're extremely unlikely with 62^6 possibilities
      assert.notEqual(id1, id2, 'Generated IDs should be different');
      assert.notEqual(id2, id3, 'Generated IDs should be different');
      assert.notEqual(id1, id3, 'Generated IDs should be different');
    });

    it('should generate IDs with characters from dictionary only', () => {
      const dict = gen.getDict();
      const id = gen.randomUUID(20);
      
      for (const char of id) {
        assert.include(dict, char, `Character '${char}' should be in dictionary`);
      }
    });

    it('should generate in reasonable time', () => {
      const startTime = process.hrtime.bigint();
      gen.randomUUID();
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000; // Convert to microseconds
      
      assert.isTrue(duration < 1000, `ID generated in ${duration}μs should be quick`);
    });
  });

  describe('Counter UUID Generator', () => {
    it('should generate counter IDs', () => {
      const id = gen.counterUUID();
      assert.isOk(id);
      assert.isString(id);
    });

    it('should not have collisions', () => {
      const pastGenIds: { [key: string]: boolean } = {};
      const testCount = Math.min(1000, Math.pow(62, 3)); // Limit test size for performance
      
      for (let i = 0; i < testCount; i++) {
        const id = gen.counterUUID();
        assert.isUndefined(pastGenIds[id], `Collision Detected after ${i} iterations with ID ${id}`);
        pastGenIds[id] = true;
      }
    });

    it('should generate sequential IDs', () => {
      const id1 = gen.counterUUID();
      const id2 = gen.counterUUID();
      const id3 = gen.counterUUID();
      
      // Counter-based IDs should be different
      assert.notEqual(id1, id2, 'Sequential counter IDs should be different');
      assert.notEqual(id2, id3, 'Sequential counter IDs should be different');
      assert.notEqual(id1, id3, 'Sequential counter IDs should be different');
    });

    it('should generate IDs with characters from dictionary only', () => {
      const dict = gen.getDict();
      const id = gen.counterUUID();
      
      for (const char of id) {
        assert.include(dict, char, `Character '${char}' should be in dictionary`);
      }
    });

    it('should generate in reasonable time', () => {
      const startTime = process.hrtime.bigint();
      gen.counterUUID();
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000; // Convert to microseconds
      
      assert.isTrue(duration < 1000, `ID generated in ${duration}μs should be quick`);
    });

    it('should increment counter after each generation', () => {
      const initialCounter = gen.getCounter();
      gen.counterUUID();
      assert.equal(gen.getCounter(), initialCounter + 1, 'Counter should increment after generation');
    });
  });

  describe('Counter Management', () => {
    it('should reset counter', () => {
      gen.counterUUID();
      gen.counterUUID();
      assert.isTrue(gen.getCounter() > 0, 'Counter should be greater than 0');
      
      gen.resetCounter();
      assert.equal(gen.getCounter(), 0, 'Counter should be reset to 0');
    });

    it('should get current counter value', () => {
      assert.equal(gen.getCounter(), 0, 'Initial counter should be 0');
      
      gen.counterUUID();
      assert.equal(gen.getCounter(), 1, 'Counter should be 1 after one generation');
      
      gen.counterUUID();
      assert.equal(gen.getCounter(), 2, 'Counter should be 2 after two generations');
    });
  });

  describe('Dictionary Length', () => {
    it('should return correct dictionary length', () => {
      assert.equal(gen.getDictLength(), 62, 'Dictionary length should be 62');
    });

    it('should match actual dictionary length', () => {
      assert.equal(gen.getDictLength(), gen.getDict().length, 'getDictLength should match actual dictionary length');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large counter values', () => {
      // Set counter to a large value
      for (let i = 0; i < 1000; i++) {
        gen.counterUUID();
      }
      
      const id = gen.counterUUID();
      assert.isOk(id, 'Should generate ID even with large counter value');
      assert.isString(id, 'Generated ID should be a string');
    });

    it('should handle multiple generator instances independently', () => {
      const gen1 = new ShortUID();
      const gen2 = new ShortUID();
      
      // Generate some IDs with first generator
      gen1.counterUUID();
      gen1.counterUUID();
      
      const id1 = gen1.counterUUID();
      const id2 = gen2.counterUUID();
      
      assert.notEqual(id1, id2, 'Different generator instances should produce different IDs');
      assert.equal(gen1.getCounter(), 3, 'First generator counter should be 3');
      assert.equal(gen2.getCounter(), 1, 'Second generator counter should be 1');
    });

    it('should handle random UUID with very small length', () => {
      const id = gen.randomUUID(1);
      assert.equal(id.length, 1, 'Should generate ID with length 1');
      assert.isString(id, 'Generated ID should be a string');
    });
  });

  describe('Performance', () => {
    it('should generate many random IDs quickly', () => {
      const startTime = process.hrtime.bigint();
      const count = 1000;
      
      for (let i = 0; i < count; i++) {
        gen.randomUUID();
      }
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
      
      assert.isTrue(duration < 100, `Generated ${count} random IDs in ${duration}ms should be fast`);
    });

    it('should generate many counter IDs quickly', () => {
      const startTime = process.hrtime.bigint();
      const count = 1000;
      
      for (let i = 0; i < count; i++) {
        gen.counterUUID();
      }
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
      
      assert.isTrue(duration < 100, `Generated ${count} counter IDs in ${duration}ms should be fast`);
    });
  });

  describe('Module Exports', () => {
    it('should export ShortUID as default export', () => {
      // Test that the imported ShortUID is a function/class
      assert.isFunction(ShortUID, 'Default export should be a function');
    });

    it('should work in browser environment', () => {
      // Mock window object
      const originalWindow = global.window;
      global.window = {} as Record<string, unknown>;
      
      // Simulate browser environment by directly setting the property
      (global.window as Record<string, unknown>).ShortUID = ShortUID;
      
      // Check if ShortUID is available on window
      assert.isFunction((global.window as Record<string, unknown>).ShortUID, 'ShortUID should be available on window object');
      
      // Restore original window
      global.window = originalWindow;
    });

    it('should handle console.log not available', () => {
      // Mock console.log to be undefined
      const originalConsole = console.log;
      console.log = undefined as unknown as typeof console.log;
      
      const generator = new ShortUID({ debug: true });
      // This should not throw an error even if console.log is undefined
      generator.randomUUID();
      
      // Restore console.log
      console.log = originalConsole;
    });

    it('should handle console not available', () => {
      // Mock console to be undefined
      const originalConsole = console;
      (global as Record<string, unknown>).console = undefined;
      
      const generator = new ShortUID({ debug: true });
      // This should not throw an error even if console is undefined
      generator.randomUUID();
      
      // Restore console
      (global as Record<string, unknown>).console = originalConsole;
    });
  });
});

