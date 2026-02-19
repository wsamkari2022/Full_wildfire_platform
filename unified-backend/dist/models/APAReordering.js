import mongoose from "mongoose";
const APAReorderingSchema = new mongoose.Schema({
    session_id: { type: String, required: true, index: true },
    scenario_id: { type: Number, required: true },
    preference_type: { type: String, required: true },
    values_before: [{ type: String, default: [] }],
    values_after: [{ type: String, default: [] }],
    reorder_count: { type: Number },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });
export const APAReordering = mongoose.model("apa_reorderings", APAReorderingSchema);
//# sourceMappingURL=APAReordering.js.map