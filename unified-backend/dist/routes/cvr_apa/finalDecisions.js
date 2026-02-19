import { Router } from "express";
import { FinalDecision } from "../../models/FinalDecision.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body ?? {};
        if (!body.session_id || body.scenario_id === undefined || !body.option_id || !body.option_label) {
            return res.status(400).json({ ok: false, error: "session_id, scenario_id, option_id, option_label are required" });
        }
        const doc = await FinalDecision.create(body);
        return res.status(201).json({ ok: true, id: doc._id });
    }
    catch (err) {
        console.error("POST /api/final-decisions error:", err);
        return res.status(500).json({ ok: false, error: err.message });
    }
});
export default router;
//# sourceMappingURL=finalDecisions.js.map