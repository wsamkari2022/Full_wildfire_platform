import { Router } from "express";
import { APAReordering } from "../../models/APAReordering.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body ?? {};
        if (!body.session_id || body.scenario_id === undefined || !body.preference_type) {
            return res.status(400).json({ ok: false, error: "session_id, scenario_id, preference_type are required" });
        }
        const doc = await APAReordering.create(body);
        return res.status(201).json({ ok: true, id: doc._id });
    }
    catch (err) {
        console.error("POST /api/apa-reorderings error:", err);
        return res.status(500).json({ ok: false, error: err.message });
    }
});
export default router;
//# sourceMappingURL=apaReorderings.js.map