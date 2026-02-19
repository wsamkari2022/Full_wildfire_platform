import { Router } from "express";
import { UserSession } from "../../models/UserSession.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const { session_id, experiment_condition, demographics, consent_agreed, consent_timestamp } = req.body || {};
        if (!session_id || !demographics) {
            return res.status(400).json({ ok: false, error: "session_id and demographics are required" });
        }
        const ageNum = Number(demographics?.age);
        const doc = await UserSession.create({
            session_id,
            experiment_condition,
            demographics,
            age: Number.isNaN(ageNum) ? undefined : ageNum,
            gender: demographics?.gender,
            ai_experience: demographics?.aiExperience,
            moral_reasoning_experience: demographics?.moralReasoningExperience,
            consent_agreed: !!consent_agreed,
            consent_timestamp: consent_timestamp || null
        });
        return res.status(201).json({ ok: true, id: doc._id });
    }
    catch (err) {
        console.error("POST /api/user-sessions error:", err.message);
        return res.status(500).json({ ok: false, error: err.message });
    }
});
router.patch("/:sessionId", async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        if (!sessionId) {
            return res.status(400).json({ ok: false, error: "Missing sessionId param" });
        }
        const doc = await UserSession.findOneAndUpdate({ session_id: sessionId }, { $set: req.body }, { new: true });
        if (!doc) {
            return res.status(404).json({ ok: false, error: "Session not found" });
        }
        return res.status(200).json({ ok: true, id: doc._id });
    }
    catch (err) {
        return res.status(500).json({ ok: false, error: err.message });
    }
});
export default router;
//# sourceMappingURL=userSessions.js.map