# AudioWave

**AudioWave** is a full-stack, modern music streaming web application built to demonstrate advanced frontend UI/UX design, complex state management, and real-time audio playback control.

> [!IMPORTANT]
> **Legal Disclaimer & Educational Notice**
> 
> This project is strictly for **educational and portfolio purposes only**. It was built to demonstrate full-stack web development skills, API integration, and custom audio player engineering in React. 
> - **Non-Commercial:** This application is not intended for commercial use or public distribution.
> - **Copyright:** No copyrighted material is hosted on this repository. The application aggregates data from public third-party APIs. I do not own, nor do I claim to own, any copyrights to the music, artwork, or lyrics streamed through this application. 
> - **API Usage:** The music data and streams are pulled via third-party APIs. This project should not be used as a substitute for official music streaming platforms. Please support artists by listening to their music on official platforms.

## ✨ Features

- **Modern & Responsive UI:** Beautiful, glassmorphic design built with TailwindCSS, optimized for both desktop and mobile viewing.
- **Custom Audio Player:** A fully engineered audio player capable of sequential playback, shuffling, looping, and real-time progress tracking.
- **Custom Playlists:** Users can create, edit, and manage their own custom playlists, which persist locally.
- **Robust Search:** Search for artists, albums, and specific tracks dynamically.
- **Persistent State:** Uses `@tanstack/react-query` and local storage to sync playback state and user libraries seamlessly.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion (for animations)
- **Backend:** Node.js, Express.js
- **State Management:** TanStack React Query (custom `useRQGlobalState` wrapper)
- **Styling:** TailwindCSS, Styled-Components

## 🚀 Getting Started (Local Development)

If you'd like to run this project locally to explore the codebase:

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NandanNayak-dev/AudioWave.git
   cd AudioWave
   ```

2. **Start the Backend Server:**
   ```bash
   cd server
   npm install
   npm start
   ```
   *The backend runs on `http://localhost:3000`.*

3. **Start the Frontend Client:**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *The frontend runs on `http://localhost:5173`.*

## 🤝 Contact / Connect

Created by Nandan Nayak.
Feel free to reach out to me on LinkedIn if you'd like to discuss the technical implementation or state management architecture of this project!

---
*Note: If you are reviewing this project for recruitment purposes, please see the provided demo video on my LinkedIn profile for a complete walkthrough of the UI and features.*