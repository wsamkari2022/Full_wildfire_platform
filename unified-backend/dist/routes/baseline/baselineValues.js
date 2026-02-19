import { Router } from 'express';
import BaselineValue from '../../models/BaselineValue.js';
const router = Router();
router.post('/', async (req, res) => {
    try {
        const values = Array.isArray(req.body) ? req.body : [req.body];
        const savedValues = await BaselineValue.insertMany(values);
        res.status(201).json({ success: true, data: savedValues });
    }
    catch (error) {
        console.error('Error creating baseline values:', error);
        res.status(500).json({ success: false, message: 'Failed to create baseline values', error: error.message });
    }
});
router.get('/session/:session_id', async (req, res) => {
    try {
        const { session_id } = req.params;
        const values = await BaselineValue.find({ session_id }).sort({ rank_order: 1 });
        res.json({ success: true, data: values });
    }
    catch (error) {
        console.error('Error fetching baseline values:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch baseline values', error: error.message });
    }
});
export default router;
//# sourceMappingURL=baselineValues.js.map