import { Router } from "express";
import { SessionMetrics } from "../../models/SessionMetrics.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body ?? {};
        const sid = (body.session_id ?? "").toString().trim();
        if (!sid) {
            return res.status(400).json({ ok: false, error: "Missing session_id" });
        }
        const updated = await SessionMetrics.findOneAndUpdate({ session_id: sid }, { $set: body }, { upsert: true, new: true });
        return res.status(200).json({ ok: true, id: updated._id });
    }
    catch (err) {
        return res.status(500).json({ ok: false, error: err.message });
    }
});
export default router;
//# sourceMappingURL=sessionMetrics.js.map