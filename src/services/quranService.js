import fs from 'fs/promises';
import path from 'path';
import { LRUCache } from 'lru-cache';
import { fileURLToPath } from 'url';

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Assuming structure: src/services -> Documents/QuranAPI
const DATA_ROOT = path.resolve(__dirname, '../../');
const SURAH_DIR = path.join(DATA_ROOT, 'surah');
const INFO_FILE = path.join(DATA_ROOT, 'surah-info.json');

// Initialize Cache
// Max 50MB equivalent (approx item count or size calculation)
// A surah file varies from 1KB to 50KB.
// 200 items * 50KB = 10MB approx usage. Safe for free tier RAM.
const surahCache = new LRUCache({
    max: 200, // Keep max 200 surah-edition combinations in memory
    ttl: 1000 * 60 * 60, // 1 hour TTL
});

let surahInfoCache = null;

export const quranService = {
    /**
     * Get list of all Surahs (Metadata)
     * Loads from disk once, then serves from variable.
     */
    async getAllSurahInfo() {
        if (surahInfoCache) {
            return surahInfoCache;
        }

        try {
            const data = await fs.readFile(INFO_FILE, 'utf-8');
            surahInfoCache = JSON.parse(data);
            return surahInfoCache;
        } catch (error) {
            console.error('Error reading surah-info.json:', error);
            throw new Error('Failed to load Surah metadata');
        }
    },

    /**
     * Get specific Surah with Edition
     * Uses LRU Cache to store results.
     */
    async getSurah(number, edition = 'en-sahih') {
        const cacheKey = `${number}-${edition}`;

        if (surahCache.has(cacheKey)) {
            console.log(`[CACHE HIT] ${cacheKey}`);
            return surahCache.get(cacheKey);
        }

        console.log(`[DISK READ] ${cacheKey}`);
        const filePath = path.join(SURAH_DIR, String(number), `${edition}.json`);

        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(fileContent);

            // Cache the result
            surahCache.set(cacheKey, data);

            return data;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return null; // File not found
            }
            throw error;
        }
    },

    /**
     * Get available editions for a specific Surah
     */
    async getAvailableEditions(number) {
        const targetDir = path.join(SURAH_DIR, String(number));

        try {
            const files = await fs.readdir(targetDir);
            // Filter JSON files and remove extension
            return files
                .filter(f => f.endsWith('.json'))
                .map(f => f.replace('.json', ''));
        } catch (error) {
            return [];
        }
    }
};
