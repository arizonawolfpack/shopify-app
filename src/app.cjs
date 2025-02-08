const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Shopify = require('@shopify/shopify-api');
const dotenv = require('dotenv');
const { validateEnvVars } = require('./utils/envValidation.js');
const authRoutes = require('./routes/auth.js');
const gamificationRoutes = require('./routes/gamification.js');
const incentiveRoutes = require('./routes/incentives.js');
const analyticsRoutes = require('./routes/analytics.js');
const { verifySession } = require('./middleware/shopifySession.js');

dotenv.config();
validateEnvVars();

Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
    SCOPES: ['read_products', 'write_orders'],
    HOST_NAME: process.env.HOST.replace(/https?:\/\//, ''),
    IS_EMBEDDED_APP: true,
    API_VERSION: '2023-01',
});

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));

app.use('/auth', authRoutes);
app.use('/gamification', verifySession, gamificationRoutes);
app.use('/incentives', verifySession, incentiveRoutes);
app.use('/analytics', verifySession, analyticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Shopify app running on port ${PORT}`);
});
