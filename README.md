# Movies App

A modern, responsive web application for browsing movies and TV shows, built with Angular and powered by the TMDB API.

## Features

- 🎬 Browse trending movies and TV shows
- 📺 Detailed information for movies and TV shows
- 🔍 Advanced search functionality
- 🎯 Filter movies and TV shows by:
  - Genres
  - Certifications
  - Language
  - User Score
  - Runtime
- 📱 Fully responsive design for all screen sizes
- 🎨 Modern UI with smooth animations
- 🌙 Dark theme support

## Tech Stack

- Angular 17
- TypeScript
- SCSS
- Angular Material
- TMDB API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movies-app.git
cd movies-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key:
```
TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/         # TypeScript interfaces
│   │   ├── services/       # Core services (TMDB, etc.)
│   │   └── utils/          # Utility functions
│   ├── features/
│   │   ├── home/           # Home page component
│   │   ├── movie-details/  # Movie details page
│   │   ├── movie-list/     # Movies listing page
│   │   ├── tv-show-details/# TV show details page
│   │   ├── tv-show-list/   # TV shows listing page
│   │   └── search/         # Search page
│   └── shared/
│       ├── components/     # Reusable components
│       └── pipes/          # Custom pipes
├── assets/
│   ├── images/            # Static images
│   └── styles/            # Global styles
└── environments/          # Environment configurations
```

## Responsive Design

The application is built with a mobile-first approach and includes responsive features:

- Fluid typography using `clamp()`
- Responsive grid layouts
- Mobile-optimized navigation
- Touch-friendly interfaces
- Adaptive component layouts

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Angular](https://angular.io/) for the amazing framework
- [Angular Material](https://material.angular.io/) for UI components
