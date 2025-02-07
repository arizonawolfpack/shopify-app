import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { validateEnvVars } from './utils/envValidation.js';
import authRoutes from './routes/auth.js';
import gamificationRoutes from './routes/gamification.js';
import incentiveRoutes from './routes/incentives.js';
import analyticsRoutes from './routes/analytics.js';
import { verifySession } from './middleware/shopifySession.js';

// Fix Shopify API import style
import ShopifyPkg from '@shopify/shopify-api';
const { Shopify, Context } = ShopifyPkg;

dotenv.config();
validateEnvVars();

Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
    SCOPES: ['read_products', 'write_orders'],
    HOST_NAME: process.env.HOST.replace(/https?:\/\//, ''), // Remove protocol
    IS_EMBEDDED_APP: true,
    API_VERSION: '2023-01',
});

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/gamification', verifySession, gamificationRoutes);
app.use('/incentives', verifySession, incentiveRoutes);
app.use('/analytics', verifySession, analyticsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Shopify app running on port ${PORT}`);
});
