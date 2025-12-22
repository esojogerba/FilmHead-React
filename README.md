# FilmHead

<p align="center">
  <img src="src/assets/images/FilmHead-logo.png" alt="FilmHead logo" width="180">
</p>

<br>
<br>

<p align="center">
  <a href="https://esojogerba.github.io/FilmHead-React/">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-Open-2ea44f?style=for-the-badge&logo=github&logoColor=white">
  </a>
</p>

<br>
<br>

<p align="center">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=111">
  <img alt="React Router" src="https://img.shields.io/badge/React%20Router-7.x-CA4245?logo=reactrouter&logoColor=white">
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-Deploy-success?logo=github&logoColor=white">
  <img alt="TMDB" src="https://img.shields.io/badge/TMDB-API-01B4E4?logo=themoviedatabase&logoColor=white">
</p>

FilmHead is a media backlog manager for movies and TV shows, built with React and Vite. Discover titles from TMDB, organize them into folders, and keep your watchlist tidy.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Data & Storage](#data-storage)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Acknowledgements](#acknowledgements)
- [License](#license)

<a id="overview"></a>
## Overview 🎬
FilmHead focuses on fast discovery and clean organization. Browse curated lists, open rich detail pages, and drop titles into custom folders so you always know what is next in your queue.

<a id="features"></a>
## Features ✨
- Browse movies and TV shows with curated and genre-based lists
- Hero slider for popular titles and featured picks
- Global search overlay with loading skeletons
- Details pages with trailers, recommendations, and streaming availability
- Backlog folders with add/remove and duplicate protection
- Local persistence and responsive UI for desktop and mobile

<a id="data-storage"></a>
## Data & Storage 💾
This demo runs entirely in the browser with no backend database or server-side accounts. That is a deliberate choice that keeps the app fully static, fast, and ideal for GitHub Pages hosting.

- Backlog data is stored in `localStorage` under the key `filmhead.backlog`
- The app hydrates folders on load and keeps storage in sync as you add or remove items
- Data stays private to the device and works even on free static hosting
- Clearing site data or switching browsers resets the demo backlog

<a id="tech-stack"></a>
## Tech Stack 🧰
- React 19
- React Router 7
- Vite 6
- TMDB API
- LocalStorage
- ESLint

<a id="getting-started"></a>
## Getting Started 🚀
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open the local URL printed in the terminal

<a id="environment-variables"></a>
## Environment Variables 🔐
Create a `.env` file in the project root:

```env
VITE_API_KEY=your_tmdb_key_here
```

You can generate a key at https://www.themoviedb.org.

<a id="scripts"></a>
## Scripts 🛠️
- `npm run dev` - Start local dev server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

<a id="deployment"></a>
## Deployment 📦
This project is configured for GitHub Pages using `gh-pages` and the `homepage` field in `package.json`. The production build is output to `dist`.

<a id="project-structure"></a>
## Project Structure 🗂️
- `src/components` - Reusable UI components
- `src/pages` - Route-level pages
- `src/contexts` - App state and global providers
- `src/utils` - API helpers
- `src/assets` - Images and icons

<a id="acknowledgements"></a>
## Acknowledgements 🙌
This product uses the TMDB API but is not endorsed or certified by TMDB.

<a id="license"></a>
## License 📄
No license file is included yet. Add one if you plan to open-source this project.
