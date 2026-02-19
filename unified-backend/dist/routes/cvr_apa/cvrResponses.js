import { Router } from "express";
import { CVRResponse } from "../../models/CVRResponse.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body ?? {};
        if (!body.session_id || body.scenario_id === undefined || body.cvr_question === undefined || body.user_answer === undefined) {
            return res.status(400).json({ ok: false, error: "session_id, scenario_id, cvr_question, user_answer are required" });
        }
        const doc = await CVRResponse.create(body);
        return res.status(201).json({ ok: true, id: doc._id });
    }
    catch (err) {
        console.error("POST /api/cvr-responses error:", err);
        return res.status(500).json({ ok: false, error: err.message });
    }
});
export default router;
//# sourceMappingURL=cvrResponses.js.map