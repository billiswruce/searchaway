<img width="1675" alt="Skärmavbild 2024-03-14 kl  09 47 43" src="https://github.com/billiswruce/imgsearch/assets/98770226/e5e40a7a-5b0e-4841-916f-a0b630838746">

# Search Away!

Fullstack Image Search App with Google Custom Search and Auth0

## Key Features

- User authentication with Google/Github using Auth0.
- Search for images with suggestions if mispelled.
- Display search results and duration of search time.
- Function to save your favorite pictures.
- A favorite page with all your chosen favorites.

## Set up

- Make sure you have node.js installed
- Clone repository from [Github](https://github.com/billiswruce/imagesearchapp/)
- Open your Terminal in VS Code (or preferred developing tool)
- New Terminal for Client: First `cd client` then run `npm i` and `npm run dev`
- New Terminal for Server: First`cd server` Run `npm i` and `node server`
- Navigate to http://localhost:5173/ in your browser to use the app

## API Endpoints

- POST /users
- GET /users/{userId}/favorites
