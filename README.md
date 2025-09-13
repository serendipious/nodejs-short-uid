# Short Unique ID Generator

[![npm version](https://badge.fury.io/js/short-uid.svg)](https://badge.fury.io/js/short-uid)
[![Build Status](https://github.com/ankitkuwadekar/nodejs-short-uid/workflows/CI/badge.svg)](https://github.com/ankitkuwadekar/nodejs-short-uid/actions)
[![Coverage Status](https://coveralls.io/repos/github/ankitkuwadekar/nodejs-short-uid/badge.svg?branch=master)](https://coveralls.io/github/ankitkuwadekar/nodejs-short-uid?branch=master)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A TypeScript-first, length-efficient unique ID generator that can be used as a replacement for UUID (v4). The generator uses a limited dictionary space of characters and generates IDs of increasing length to provide length-efficient IDs as opposed to UUIDs, which always generate IDs of length 36 or 48.

## Features

- ✅ **TypeScript Support**: Full TypeScript definitions and type safety
- ✅ **100% Test Coverage**: Comprehensive test suite with 100% code coverage
- ✅ **Two Generation Methods**: Counter-based and random ID generation
- ✅ **Length Efficient**: Generates shorter IDs than traditional UUIDs
- ✅ **High Performance**: Optimized for speed and memory usage
- ✅ **Zero Dependencies**: No external runtime dependencies
- ✅ **Multiple Formats**: CommonJS, ES Modules, and UMD builds
- ✅ **Pre-commit Hooks**: Automated testing and linting

## Mathematical Foundation

Given a dictionary size of M and a required ID length ≤ n, the generator has an output space of:

```
M + M² + M³ + ... + Mⁿ    (Number of IDs with length ≤ n)
```

This provides very length-efficient IDs even for modest lengths. For example, if you wish to generate IDs of length no greater than 6, the generator can output as many as **57,731,386,986 (~57 Billion)** unique IDs.

## Installation

```bash
npm install short-uid
```

## Usage

### TypeScript/ES Modules

```typescript
import { ShortUID, ShortUIDOptions } from 'short-uid';

// Create generator with options
const options: ShortUIDOptions = { debug: false };
const idGen = new ShortUID(options);

// Generate counter-based ID (sequential, collision-free)
const counterId = idGen.counterUUID();

// Generate random ID (default length: 6)
const randomId = idGen.randomUUID();

// Generate random ID with custom length
const customId = idGen.randomUUID(10);

// Get current counter value
const currentCounter = idGen.getCounter();

// Reset counter
idGen.resetCounter();

// Get dictionary information
const dict = idGen.getDict();
const dictLength = idGen.getDictLength();
```

### CommonJS

```javascript
const { ShortUID } = require('short-uid');

const idGen = new ShortUID();
const id = idGen.randomUUID();
```

### Browser (UMD)

```html
<script src="https://unpkg.com/short-uid/dist/short-uid.min.js"></script>
<script>
  const idGen = new ShortUID();
  const id = idGen.randomUUID();
</script>
```

## API Reference

### `ShortUID` Class

#### Constructor

```typescript
constructor(options?: ShortUIDOptions)
```

- `options.debug?: boolean` - Enable debug logging (default: `false`)

#### Methods

##### `counterUUID(): string`

Generates a counter-based unique ID. Each call increments an internal counter, ensuring no collisions.

**Returns:** A string containing the generated ID.

##### `randomUUID(uuidLength?: number): string`

Generates a random unique ID.

**Parameters:**
- `uuidLength?: number` - Desired length of the generated ID (default: 6)

**Returns:** A string containing the generated ID.

**Throws:** `Error` if `uuidLength` is invalid (null, undefined, or < 1).

##### `getCounter(): number`

Gets the current counter value.

**Returns:** The current counter value.

##### `resetCounter(): void`

Resets the internal counter to 0.

##### `getDict(): string[]`

Gets a copy of the internal dictionary used for ID generation.

**Returns:** An array of characters used in ID generation.

##### `getDictLength(): number`

Gets the length of the internal dictionary.

**Returns:** The dictionary length (always 62).

## Development

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Setup

```bash
git clone https://github.com/ankitkuwadekar/nodejs-short-uid.git
cd nodejs-short-uid
npm install
```

### Available Scripts

```bash
# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build artifacts
npm run clean
```

### Test Coverage

This project maintains **100% test coverage** across all metrics:

- **Lines**: 100%
- **Functions**: 100%
- **Branches**: 100%
- **Statements**: 100%

Coverage reports are generated in the `coverage/` directory and can be viewed by running:

```bash
npm run test:coverage:report
```

## Performance

The library is optimized for high performance:

- **Random ID Generation**: ~1-5μs per ID
- **Counter ID Generation**: ~1-3μs per ID
- **Memory Usage**: Minimal, with dictionary pre-computed at module load
- **Bundle Size**: ~2KB minified and gzipped

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on how to contribute to this project.

## Changelog

### v2.0.0
- **BREAKING**: Upgraded to Node.js v20+ requirement
- Updated all dependencies to latest versions
- Enhanced TypeScript configuration for ES2022 features
- Improved build performance and compatibility
- Updated ESLint configuration for better code quality
- Enhanced development experience with modern tooling

### v1.0.0
- Migrated from CoffeeScript to TypeScript
- Added comprehensive test coverage (100%)
- Added TypeScript definitions
- Added multiple build formats (CommonJS, ES Modules, UMD)
- Added pre-commit hooks for quality assurance
- Improved documentation and examples
- Added performance optimizations