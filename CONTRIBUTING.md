# Contributing to Short UID Generator

Thank you for your interest in contributing to the Short UID Generator! This document provides comprehensive guidelines to help you contribute high-quality code and improvements to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a code of conduct that ensures a welcoming environment for all contributors. By participating, you agree to uphold this code of conduct.

### Our Pledge

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.0.0 or higher
- **npm**: Version 10.0.0 or higher
- **Git**: Latest version
- **TypeScript**: Will be installed as a dev dependency

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nodejs-short-uid.git
   cd nodejs-short-uid
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ankitkuwadekar/nodejs-short-uid.git
   ```

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### 4. Lint Code

```bash
# Check for linting issues
npm run lint

# Fix auto-fixable linting issues
npm run lint:fix
```

## Project Structure

```
nodejs-short-uid/
├── src/                    # TypeScript source code
│   └── short-uid.ts       # Main library implementation
├── tst/                   # Test files
│   └── short-uid.test.ts  # Comprehensive test suite
├── dist/                  # Built output (generated)
│   ├── short-uid.js       # CommonJS build
│   ├── short-uid.esm.js   # ES Module build
│   ├── short-uid.min.js   # UMD minified build
│   └── short-uid.d.ts     # TypeScript declarations
├── .eslintrc.js           # ESLint configuration
├── .nycrc.json           # Test coverage configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.test.json    # TypeScript test configuration
├── rollup.config.js      # Rollup build configuration
├── package.json          # Package configuration
└── README.md             # Project documentation
```

## Coding Standards

### TypeScript Guidelines

1. **Strict Type Safety**: Use strict TypeScript settings
2. **Explicit Types**: Prefer explicit type annotations for public APIs
3. **Interface Definitions**: Define clear interfaces for options and return types
4. **No `any` Types**: Avoid `any` types; use proper typing instead
5. **JSDoc Comments**: Document all public methods and classes

### Code Style

1. **Formatting**: Use Prettier (configured via ESLint)
2. **Naming Conventions**:
   - Classes: PascalCase (`ShortUID`)
   - Methods: camelCase (`counterUUID`)
   - Constants: UPPER_SNAKE_CASE (`DEFAULT_RANDOM_ID_LEN`)
   - Private members: Prefix with underscore (`_privateMethod`)

3. **File Organization**:
   - One class per file
   - Exports at the bottom of the file
   - Imports at the top, organized by type

### Example Code Style

```typescript
/**
 * Generates a random unique ID
 * @param uuidLength The desired length of the generated ID
 * @returns A string containing the generated ID
 * @throws Error if uuidLength is invalid
 */
public randomUUID(uuidLength: number = ShortUID.DEFAULT_RANDOM_ID_LEN): string {
  if (uuidLength == null || uuidLength < 1) {
    throw new Error("Invalid UUID Length Provided");
  }
  
  // Implementation...
}
```

## Testing Guidelines

### Test Coverage Requirements

This project maintains **100% test coverage**. All new code must maintain this standard:

- **Lines**: 100%
- **Functions**: 100%
- **Branches**: 100%
- **Statements**: 100%

### Writing Tests

1. **Test Structure**: Use Mocha with Chai assertions
2. **Test Organization**: Group related tests using `describe` blocks
3. **Test Naming**: Use descriptive test names that explain the expected behavior
4. **Edge Cases**: Test boundary conditions, error cases, and edge cases
5. **Performance**: Include performance tests for critical paths

### Test Categories

#### Unit Tests
- Test individual methods in isolation
- Mock external dependencies
- Test all code paths and branches

#### Integration Tests
- Test method interactions
- Test class behavior as a whole
- Test error propagation

#### Performance Tests
- Test generation speed
- Test memory usage
- Test with large datasets

### Example Test Structure

```typescript
describe('ShortUID Class', () => {
  let generator: ShortUID;

  beforeEach(() => {
    generator = new ShortUID({ debug: false });
  });

  describe('randomUUID method', () => {
    it('should generate ID with default length', () => {
      const id = generator.randomUUID();
      assert.isTrue(id.length >= 1);
    });

    it('should throw error for invalid length', () => {
      assert.throws(() => generator.randomUUID(0), Error);
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Generate coverage report
npm run test:coverage:report
```

## Pull Request Process

### Before Submitting

1. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**:
   - Write your code following the coding standards
   - Add comprehensive tests
   - Update documentation if needed

3. **Test Your Changes**:
   ```bash
   npm run build
   npm run test:coverage
   npm run lint
   ```

4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Format

Use conventional commits format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Test additions or changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `chore:` Maintenance tasks

Examples:
```
feat: add resetCounter method
fix: handle edge case in randomUUID
docs: update API documentation
test: add performance benchmarks
```

### Pull Request Checklist

Before submitting your PR, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Test coverage is 100% (`npm run test:coverage`)
- [ ] Code passes linting (`npm run lint`)
- [ ] Code is properly typed (TypeScript)
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventional format
- [ ] PR description clearly explains the changes
- [ ] Breaking changes are documented

### PR Description Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added for new functionality
- [ ] Test coverage maintained at 100%

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented if necessary)
```

## Issue Reporting

### Before Creating an Issue

1. Search existing issues to avoid duplicates
2. Check if the issue is already fixed in the latest version
3. Verify the issue is reproducible

### Issue Templates

#### Bug Report

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- Node.js version:
- npm version:
- Library version:

**Additional context**
Add any other context about the problem here.
```

#### Feature Request

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request.
```

## Release Process

### Version Bumping

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run full test suite
4. Build all distributions
5. Create release tag
6. Publish to npm

## Development Workflow

### Daily Development

1. **Start your day**:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes and test**:
   ```bash
   npm run build
   npm run test:coverage
   npm run lint
   ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

### Code Review Process

1. **Self Review**: Review your own code before requesting review
2. **Peer Review**: At least one other contributor must review
3. **Address Feedback**: Respond to all review comments
4. **Final Approval**: Maintainer approval required for merge

## Getting Help

### Resources

- **Documentation**: Check README.md and inline code comments
- **Issues**: Search existing issues or create new ones
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Ask for help in PR comments

### Contact

- **Maintainer**: Ankit Kuwadekar
- **Repository**: https://github.com/ankitkuwadekar/nodejs-short-uid
- **Issues**: https://github.com/ankitkuwadekar/nodejs-short-uid/issues

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- GitHub contributors list

Thank you for contributing to the Short UID Generator! Your contributions help make this project better for everyone.
