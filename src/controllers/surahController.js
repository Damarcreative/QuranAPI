import { quranService } from '../services/quranService.js';

export const surahController = {
    async getAllSurahs(req, res) {
        try {
            const data = await quranService.getAllSurahInfo();
            res.json({
                status: 'success',
                count: data.length,
                data
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    async getSurah(req, res) {
        const { number, edition } = req.params;

        // Default to en-sahih if not provided, but route usually handles this
        const editionToUse = edition || req.query.edition || 'en-sahih';

        if (!number || isNaN(number) || number < 1 || number > 114) {
            return res.status(400).json({ status: 'error', message: 'Invalid Surah number (1-114)' });
        }

        try {
            const data = await quranService.getSurah(number, editionToUse);

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: `Surah ${number} with edition '${editionToUse}' not found.`
                });
            }

            res.json({
                status: 'success',
                data
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },

    async getEditions(req, res) {
        const { number } = req.params;
        try {
            // If number is provided, get editions for that surah, else could list all (not implemented yet)
            if (number) {
                const editions = await quranService.getAvailableEditions(number);
                return res.json({ status: 'success', surah: number, editions });
            }
            res.status(400).json({ status: 'error', message: 'Please provide surah number' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
};
