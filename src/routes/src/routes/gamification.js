import express from 'express';

const router = express.Router();
const gamificationTracking = {};

router.post('/gamification', (req, res) => {
    const { customerId } = req.body;
    const games = [
        { type: 'spin-the-wheel', options: ['5% off', '10% off', 'Free Shipping'] },
        { type: 'tier-rewards', tiers: ['Spend $50 for free item'] },
        { type: 'quiz', questions: ['What do you prefer: discounts or free gifts?'] },
    ];

    const selectedGame = games[Math.floor(Math.random() * games.length)];

    // Track user interaction
    gamificationTracking[customerId] = (gamificationTracking[customerId] || 0) + 1;

    res.json({ game: selectedGame }); 
});

export default router;
export { gamificationTracking };
