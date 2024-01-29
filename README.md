# Star Minus - Streaming Platform

Welcome to Star Minus, a streaming platform for movies and series built with Vue.js and Vuetify.

## Prerequisites

Before running the project, ensure you have the following:

- Node.js and npm installed
- The backend server (Star Minus Backend) set up. You can find it [here](https://github.com/Arthurandradens/star-minus-backend).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Arthurandradens/star-minus.git
2. Navigate to the project directory:

   ```bash
    cd star-minus
3. Install dependencies:

     ```bash
    npm install
4. Create a .env file in the root directory, following the structure in .env.example. Obtain your TMDB API key [here](https://www.themoviedb.org/login?to=read_me&redirect=%2Freference%2Fintro%2Fgetting-started).

5. Run the development server:

     ```bash
    npm run dev
The application will be accessible at http://localhost:8080.

## Features
### Home Page
- Displays a selection of movies and series fetched from the TMDB API.
### Search
- Allows users to search for any movie or series.
### Most Viewed
- Dedicated pages for both movies and series showcasing the currently most viewed content.
  Includes genre-based filtering.
### Watchlist
- Users can add movies and series to their watchlist for future viewing.

### Acknowledgments
- This project utilizes TMDB API for fetching movie and s
