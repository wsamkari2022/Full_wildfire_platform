import { Router } from "express";
import { ScenarioInteraction } from "../../models/ScenarioInteraction.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body ?? {};
        if (!body.session_id || body.scenario_id === undefined) {
            return res.status(400).json({ ok: false, error: "session_id and scenario_id are required" });
        }
        const doc = await ScenarioInteraction.create(body);
        return res.status(201).json({ ok: true, id: doc._id });
    }
    catch (err) {
        console.error("POST /api/scenario-interactions error:", err);
        return res.status(500).json({ ok: false, error: err.message });
    }
});
export default router;
//# sourceMappingURL=scenarioInteractions.js.map