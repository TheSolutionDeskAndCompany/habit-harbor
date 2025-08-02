# 🏠 Habit Harbor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **Your personal harbor for building lasting habits** 🌊

A beautiful, intuitive habit tracking application that helps you build better routines and monitor your progress with elegant visualizations.

![Habit Harbor Demo](./docs/demo-placeholder.gif)
*Demo GIF placeholder - Add your actual demo here*

## ✨ Features

- 📅 **Calendar-style tracking** - Visual weekly habit grid
- 📊 **Progress analytics** - Beautiful charts and statistics
- 🌓 **Dark/Light mode** - Seamless theme switching
- 📱 **Responsive design** - Perfect on desktop and mobile
- 🔄 **Local persistence** - Your data stays with you
- 🎨 **Custom colors** - Personalize your habit cards
- 💬 **Daily quotes** - Motivational inspiration
- ⚡ **Fast & lightweight** - Built with modern React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/TheSolutionDeskAndCompany/habit-harbor.git
cd habit-harbor

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📖 Usage

1. **Add a habit** - Click "Add Habit" and enter your habit name
2. **Track daily** - Click on calendar days to mark habits complete
3. **View progress** - Check the stats dashboard for insights
4. **Customize** - Edit habit colors and settings
5. **Stay motivated** - Enjoy daily inspirational quotes

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 7
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: date-fns
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── HabitCard.tsx   # Individual habit display
│   ├── HabitTracker.tsx # Main tracking interface
│   ├── StatsDashboard.tsx # Analytics view
│   └── ...
├── contexts/           # React contexts
│   ├── HabitsContext.tsx # Habit state management
│   └── ThemeContext.tsx  # Theme state
├── types/              # TypeScript definitions
└── assets/             # Static assets
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the power of habit formation
- Built with modern React best practices
- Designed for simplicity and effectiveness

## 📞 Support

- 🐛 [Report a bug](https://github.com/TheSolutionDeskAndCompany/habit-harbor/issues)
- 💡 [Request a feature](https://github.com/TheSolutionDeskAndCompany/habit-harbor/issues)
- 💬 [Start a discussion](https://github.com/TheSolutionDeskAndCompany/habit-harbor/discussions)

---

<div align="center">
  <strong>Built with ❤️ for better habits</strong>
</div>
