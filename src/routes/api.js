import express from 'express';
import { surahController } from '../controllers/surahController.js';

const router = express.Router();

router.get('/surah', surahController.getAllSurahs);
router.get('/surah/:number', surahController.getSurah);
router.get('/surah/:number/editions', surahController.getEditions);
router.get('/surah/:number/:edition', surahController.getSurah);

export default router;
