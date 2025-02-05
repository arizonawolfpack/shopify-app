import express from 'express';
import { gamificationTracking } from './gamification.js';

const router = express.Router();

router.get('/analytics', (req, res) => {
    const analyticsData = {
        totalSales: 10000,
        aov: 75,
        customerRetentionRate: '85%',
        gamificationInteractions: gamificationTracking,
    };

    res.json({ analytics: analyticsData });
});

export default router;
