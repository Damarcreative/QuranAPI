# Quran API

A high-performance REST API for the Quran, built with Node.js and Express.

This API is designed for speed and efficiency, utilizing a Hybrid Caching strategy (In-Memory LRU Cache) to serve requests instantly while maintaining low memory usage during startup.

## Features

- **High Performance**: Uses In-Memory Caching to serve repeated requests in under 1ms.
- **Lazy Loading**: Data is loaded from disk only when requested, ensuring fast server startup.
- **Multiple Editions**: Supports various translations and recitations (depending on data source).
- **Simple Architecture**: Built on standard Express.js and file-system based data storage.

## Installation

### Prerequisites

- Node.js (version 14 or higher is recommended)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Damarcreative/QuranAPI.git
   cd QuranAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

## API Endpoints

### Base URL

`http://localhost:3000/api`

### 1. List All Surahs

Get a list of all 114 Surahs with metadata (English name, Arabic name, type, verse count).

- **Endpoint**: `/surah`
- **Method**: `GET`
- **Example**: `http://localhost:3000/api/surah`

### 2. Get Specific Surah

Get the full text of a specific Surah. By default, it returns the English Sahih International translation if no edition is specified.

- **Endpoint**: `/surah/:number`
- **Method**: `GET`
- **Parameters**:
  - `number`: The Surah number (1-114).
- **Example**: `http://localhost:3000/api/surah/1`

### 3. Get Specific Edition

Get a Surah in a specific edition (translation or original Arabic).

- **Endpoint**: `/surah/:number/:edition`
- **Method**: `GET`
- **Parameters**:
  - `number`: The Surah number (1-114).
  - `edition`: The identifier for the edition (e.g., `id-indonesian`, `arabic`).
- **Example**: `http://localhost:3000/api/surah/1/id-indonesian`

### 4. Get Available Editions

List all available editions (translations) for a specific Surah.

- **Endpoint**: `/surah/:number/editions`
- **Method**: `GET`
- **Example**: `http://localhost:3000/api/surah/1/editions`

## Project Structure

- `src/app.js`: Main application entry point.
- `src/services/quranService.js`: Business logic handling data retrieval and caching.
- `src/controllers/surahController.js`: Request handlers for API endpoints.
- `src/routes/api.js`: API route definitions.
- `surah/`: Directory containing JSON data files.

## Credits

- **Author**: Damarcreative
- **Website**: damarcreative.my.id
- **Repository**: https://github.com/Damarcreative/QuranAPI
- **Support**: https://github.com/sponsors/Damarcreative

## License

This project is open source.
