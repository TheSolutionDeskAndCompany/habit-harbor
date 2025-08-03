# 🏠 Habit Harbor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![SPDX-License-Identifier: MIT](https://img.shields.io/badge/SPDX--License--Identifier-MIT-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TheSolutionDeskAndCompany/habit-harbor/ci.yml?branch=main)](https://github.com/TheSolutionDeskAndCompany/habit-harbor/actions)
[![Last Commit](https://img.shields.io/github/last-commit/TheSolutionDeskAndCompany/habit-harbor)](https://github.com/TheSolutionDeskAndCompany/habit-harbor/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **Your personal harbor for building lasting habits** 🌊

A beautiful, cross-platform desktop application that helps you build better routines and monitor your progress with elegant visualizations. Built with Electron to deliver a native desktop experience while leveraging modern web technologies.

<div align="center">
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/📥_Download-Get_App-blue?style=for-the-badge" alt="Download App" height="40">
  </a>
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/🍎_macOS-Download-black?style=for-the-badge" alt="macOS Download" height="40">
  </a>
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/🪟_Windows-Download-blue?style=for-the-badge" alt="Windows Download" height="40">
  </a>
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/🐧_Linux-Download-orange?style=for-the-badge" alt="Linux Download" height="40">
  </a>
</div>

<br>

## 🎬 Demo

![Habit Harbor Demo](./docs/demo-placeholder.gif)
*Experience Habit Harbor in action - habit creation, tracking, and analytics*

<details>
<summary>📸 Click to view screenshots</summary>

![Habit Harbor Screenshot](./docs/screenshot-placeholder.png)
*Main dashboard with habit tracking grid and progress visualization*

</details>

*Ready to build better habits? [Get started now!](#-quick-start)*

## ✨ Features

### 📊 **Tracking & Analytics**
- **📅 Calendar-style tracking** - Visual weekly habit grid with intuitive click-to-mark
- **📊 Progress analytics** - Beautiful charts and comprehensive statistics
- **💾 File-based storage** - Your data stays local and secure, no internet required
- **📤 Data export/import** - Full control over your habit data

### 🖥️ **Desktop Experience**
- **🔔 System notifications** - Native desktop reminders for your habits
- **🎯 System tray integration** - Quick access from your taskbar/menu bar
- **🌍 Cross-platform** - Runs natively on Windows, macOS, and Linux
- **⚡ Always accessible** - No browser required, launches instantly
- **🔒 Offline-first** - Works completely offline, your data never leaves your device

### 🎨 **Personalization & UI**
- **🌓 Dark/Light mode** - Seamless theme switching for any time of day
- **🎨 Custom colors** - Personalize your habit cards with your favorite colors
- **♿ Accessibility focused** - Keyboard navigation and screen reader support
- **🏆 Progress celebrations** - Visual feedback for your achievements

## 🚀 Quick Start

### 📥 **Download & Install**

**For Users:**
1. Download the latest release for your platform:
   - [Windows (.exe)](https://github.com/TheSolutionDeskAndCompany/habit-harbor/releases)
   - [macOS (.dmg)](https://github.com/TheSolutionDeskAndCompany/habit-harbor/releases)
   - [Linux (.AppImage)](https://github.com/TheSolutionDeskAndCompany/habit-harbor/releases)
2. Install and launch Habit Harbor
3. Start tracking your habits!

### 🛠️ **Development Setup**

**Prerequisites:**
- Node.js 18+ and npm
- Git

**Installation:**
```bash
# Clone the repository
git clone https://github.com/TheSolutionDeskAndCompany/habit-harbor.git
cd habit-harbor

# Install dependencies
npm install

# Start development (Electron app)
npm run electron:dev

# Or run web version for development
npm run dev
```

### 📦 **Build Desktop App**

```bash
# Build for current platform
npm run electron:build

# Build for all platforms (requires platform-specific setup)
npm run electron:build:all

# Build web version
npm run build
```

## 📖 Usage

1. **Launch the app** - Double-click the Habit Harbor icon on your desktop
2. **Add a habit** - Click "Add Habit" and enter your habit name
3. **Track daily** - Click on calendar days to mark habits complete
4. **Get reminded** - Enable system notifications for habit reminders
5. **View progress** - Check the stats dashboard for insights
6. **Stay accessible** - Use the system tray icon for quick access
7. **Customize** - Edit habit colors, notification settings, and preferences

## 🛠️ Tech Stack

- **Desktop Framework**: Electron (cross-platform desktop apps)
- **Frontend**: React 19, TypeScript (90% code reuse from web version)
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 7 + Electron Builder
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: date-fns
- **State Management**: React Context API
- **Storage**: Local file system (JSON-based)
- **Notifications**: Native system notifications

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

### 🚀 **Good First Issues**
- 🐛 [Bug fixes](https://github.com/TheSolutionDeskAndCompany/habit-harbor/labels/good%20first%20issue)
- 📚 [Documentation improvements](https://github.com/TheSolutionDeskAndCompany/habit-harbor/labels/documentation)
- ✨ [Feature enhancements](https://github.com/TheSolutionDeskAndCompany/habit-harbor/labels/enhancement)

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 💬 **Community**
- Join our discussions for feature requests and general chat
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Questions? Start a [GitHub Discussion](https://github.com/TheSolutionDeskAndCompany/habit-harbor/discussions)

## ❓ FAQ

<details>
<summary><strong>Q: My habits aren't saving - what should I do?</strong></summary>

A: Habit Harbor uses local browser storage. Make sure:
- You're not in incognito/private browsing mode
- Your browser allows local storage
- Try refreshing the page and check if data persists
- Clear browser cache if issues persist

</details>

<details>
<summary><strong>Q: Does this sync across devices?</strong></summary>

A: Habit Harbor is designed as an offline-first desktop application. Your data is stored locally on each device for privacy and reliability. You can export your data from one device and import it on another to transfer your habits.

</details>

<details>
<summary><strong>Q: Can I export my habit data?</strong></summary>

A: Yes! Use the export feature in Settings to download your habit data as JSON. You can also import this data to restore your habits.

</details>

## 🗺️ Roadmap

- [ ] **Auto-updater** - Automatic app updates
- [ ] **Enhanced notifications** - Smart reminder scheduling
- [ ] **Habit streaks** - Track consecutive days with celebrations
- [ ] **Data backup** - Automated local backup system
- [ ] **Themes & customization** - More visual customization options
- [ ] **Advanced analytics** - Deeper insights and trend analysis
- [ ] **Plugin system** - Extensible habit tracking features
- [ ] **Multi-language support** - Internationalization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**SPDX-License-Identifier: MIT**

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
  <strong>Built with ❤️ for better habits by <a href="https://github.com/TheSolutionDeskAndCompany">The Solution Desk & Company</a></strong>
  <br><br>
  <a href="#-habit-harbor">⬆️ Back to top</a>
</div>
