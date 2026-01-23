import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Quran API is running',
        "credits": {
            "author": "Damarcreative",
            "link": "damarcreative.my.id",
            "repo": "https://github.com/Damarcreative/QuranAPI",
            "donation": "https://github.com/sponsors/Damarcreative"
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
