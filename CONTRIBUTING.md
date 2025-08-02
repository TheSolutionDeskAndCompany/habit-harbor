# Contributing to Habit Harbor

Thank you for your interest in contributing to Habit Harbor! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of React and TypeScript

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/habit-harbor.git
   cd habit-harbor
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow existing naming conventions
- Use functional components with hooks
- Maintain consistent indentation (2 spaces)
- Add JSDoc comments for complex functions

### ESLint Configuration

For production development, we recommend updating the ESLint configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // For stricter rules:
      ...tseslint.configs.strictTypeChecked,
      // For stylistic rules:
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install additional React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### Component Guidelines
- Keep components focused and single-purpose
- Use proper TypeScript interfaces for props
- Implement proper error boundaries
- Follow the existing file structure

### Testing
- Write unit tests for new components
- Ensure existing tests pass: `npm run test`
- Test both light and dark themes
- Test responsive design on different screen sizes

## 📝 Making Changes

### Commit Messages
Use clear, descriptive commit messages:
- `feat: add habit export functionality`
- `fix: resolve dark mode toggle issue`
- `docs: update installation instructions`
- `refactor: improve habit card component`

### Pull Request Process

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run linting and tests:
   ```bash
   npm run lint
   npm run build
   ```
4. Commit your changes
5. Push to your fork
6. Create a Pull Request with:
   - Clear title and description
   - Screenshots for UI changes
   - Reference any related issues

## 🐛 Reporting Issues

When reporting bugs, please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Check existing issues first
- Provide clear use case
- Consider implementation complexity
- Be open to discussion

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── HabitCard.tsx   # Individual habit display
│   ├── HabitTracker.tsx # Main tracking interface
│   ├── StatsDashboard.tsx # Analytics view
│   ├── QuoteBox.tsx    # Daily quotes
│   ├── EditHabitModal.tsx # Habit editing
│   └── ThemeToggle.tsx # Theme switcher
├── contexts/           # React contexts
│   ├── HabitsContext.tsx # Habit state management
│   └── ThemeContext.tsx  # Theme state
├── types/              # TypeScript definitions
├── constants/          # App constants
└── assets/             # Static assets
```

## 📋 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🎯 Areas for Contribution

- **Testing**: Add unit tests for components
- **Accessibility**: Improve ARIA labels and keyboard navigation
- **Features**: Export/import habits, notifications, habit streaks
- **UI/UX**: Animations, better mobile experience
- **Documentation**: Code comments, user guides

## 📞 Questions?

- Open a discussion on GitHub
- Check existing issues and PRs
- Review the README for basic setup

Thank you for contributing to Habit Harbor! 🏠
