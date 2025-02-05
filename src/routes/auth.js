import express from 'express';
import Shopify from '@shopify/shopify-api';

const router = express.Router();

router.get('/auth', async (req, res) => {
    const shop = req.query.shop;
    if (!shop || !Shopify.Utils.validateShop(shop)) {
        return res.status(400).send('Invalid or missing "shop" parameter');
    }

    try {
        const authRoute = await Shopify.Auth.beginAuth(req, res, shop, '/auth/callback', true);
        return res.redirect(authRoute);
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Authentication error. Please try again.');
    }
});

router.get('/auth/callback', async (req, res) => {
    try {
        const session = await Shopify.Auth.validateAuthCallback(req, res, req.query);
        // Store session data in your database
        res.redirect('/');

    } catch (error) {
        console.error('Authentication callback error:', error);
        res.status(500).send('Authentication failed. Please try again.');
    }
});

export default router;
