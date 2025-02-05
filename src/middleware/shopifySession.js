import Shopify from '@shopify/shopify-api';

export async function verifySession(req, res, next) {
    try {
        const session = await Shopify.Utils.loadCurrentSession(req, res, false);
        if (!session) {
            return res.redirect('/auth');
        }
        req.shopifySession = session;
        next();
    } catch (error) {
        console.error('Session error:', error);
        res.redirect('/auth');
    }
}
