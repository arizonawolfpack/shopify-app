import express from 'express';

const router = express.Router();

router.post('/smart-incentive', async (req, res) => {
    const { customerId } = req.body;

    // Fetch customer data (mocked here; replace with actual data fetching)
    const customerData = {
        purchaseHistory: ['Product A', 'Product B'],
        totalSpent: 300,
    };

    let selectedIncentive;

    if (customerData.totalSpent > 200) {
        selectedIncentive = { type: 'discount', value: '20%' };
    } else if (customerData.purchaseHistory.includes('Product A')) {
        selectedIncentive = { type: 'gift', description: 'Free gift with your next purchase' };
    } else {
        selectedIncentive = { type: 'free_shipping', threshold: 50 };
    }

    res.json({ incentive: selectedIncentive });
});

export default router;
