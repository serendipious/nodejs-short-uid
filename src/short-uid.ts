/**
 * Short Unique Id Generator
 * 
 * This module allows you to generate length-efficient unique IDs, that can be used instead of UUID (v4).
 * The generator uses a limited dictionary space of characters and generates IDs of increasing length
 * to allow for Length-Efficient ids as opposed to UUIDs, that always generate IDs of length 36 or 48.
 */

interface ShortUIDOptions {
  debug?: boolean;
}

export interface DictRanges {
  digits: [number, number];
  lowerCase: [number, number];
  upperCase: [number, number];
}

class ShortUID {
  // This provides collision-space of ~57B
  private static readonly DEFAULT_RANDOM_ID_LEN = 6;

  // ID Generator Dictionary
  // currently uses only alphabets and digits
  private static readonly DICT_RANGES: DictRanges = {
    digits: [48, 58],
    lowerCase: [97, 123],
    upperCase: [65, 91]
  };

  // Generate Dictionary
  private static readonly dict: string[] = ((): string[] => {
    const dict: string[] = [];
    const ranges = ShortUID.DICT_RANGES;
    
    for (const rangeType in ranges) {
      const dictRange = ranges[rangeType as keyof DictRanges];
      const [lowerBound, upperBound] = dictRange;
      for (let dictIndex = lowerBound; dictIndex < upperBound; dictIndex++) {
        dict.push(String.fromCharCode(dictIndex));
      }
    }

    // Shuffle Dictionary for removing selection bias
    return dict.sort(() => Math.random() - 0.5);
  })();

  // Cache Dictionary Length for future usage
  private static readonly dictLength = ShortUID.dict.length;

  private counter: number;
  private debug: boolean;

  /**
   * Creates a new ShortUID generator instance
   * @param options Configuration options
   * @param options.debug Enable debug logging (default: false)
   */
  constructor(options: ShortUIDOptions = {}) {
    this.counter = 0;
    this.debug = options.debug || false;
    this.log(`Generator created with Dictionary Size ${ShortUID.dictLength}`);
  }

  /**
   * Logging is optionally enabled by passing `debug=true` during instantiation
   * @param message The message to log
   * @param args Additional arguments to log
   */
  private log(message: string, ...args: unknown[]): void {
    const prefixedMessage = `[frugal-id] ${message}`;
    if (this.debug) {
      console?.log?.(prefixedMessage, ...args);
    }
  }

  /**
   * Returns generator's internal dictionary
   * @returns The dictionary array used for ID generation
   */
  public getDict(): string[] {
    return [...ShortUID.dict]; // Return a copy to prevent external modification
  }

  /**
   * Generates UUID based on internal counter
   * that's incremented after each ID generation
   * @returns A counter-based unique ID
   */
  public counterUUID(): string {
    let id = '';
    let counterDiv = this.counter;

    // Convert internal counter to Base of internal Dictionary
    while (true) {
      const counterRem = counterDiv % ShortUID.dictLength;
      counterDiv = Math.floor(counterDiv / ShortUID.dictLength);
      id += ShortUID.dict[counterRem];
      if (counterDiv === 0) {
        break;
      }
    }

    // Increment internal counter
    this.counter++;

    // Return generated ID
    return id;
  }

  /**
   * Generates UUID by creating each part randomly
   * @param uuidLength The desired length of the generated ID (default: 6)
   * @returns A randomly generated unique ID
   * @throws Error if uuidLength is invalid
   */
  public randomUUID(uuidLength: number = ShortUID.DEFAULT_RANDOM_ID_LEN): string {
    if (uuidLength == null || uuidLength < 1) {
      throw new Error("Invalid UUID Length Provided");
    }

    // Generate random ID parts from Dictionary
    let id = '';
    for (let idIndex = 0; idIndex < uuidLength; idIndex++) {
      const randomPartIdx = Math.floor(Math.random() * ShortUID.dictLength) % ShortUID.dictLength;
      id += ShortUID.dict[randomPartIdx];
    }

    // Return random generated ID
    return id;
  }

  /**
   * Resets the internal counter to 0
   */
  public resetCounter(): void {
    this.counter = 0;
    this.log("Counter reset to 0");
  }

  /**
   * Gets the current counter value
   * @returns The current counter value
   */
  public getCounter(): number {
    return this.counter;
  }

  /**
   * Gets the dictionary length
   * @returns The length of the dictionary
   */
  public getDictLength(): number {
    return ShortUID.dictLength;
  }
}

// Export for both CommonJS and ES modules
export default ShortUID;
export { ShortUID };
export type { ShortUIDOptions };

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>)['ShortUID'] = ShortUID;
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShortUID;
  (module.exports as unknown as Record<string, unknown>)['ShortUID'] = ShortUID;
}

