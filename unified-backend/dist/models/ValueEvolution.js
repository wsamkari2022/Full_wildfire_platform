import mongoose from "mongoose";
const ValueSnapshotItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    matchPercentage: { type: Number, required: true },
}, { _id: false });
const ValueEvolutionSchema = new mongoose.Schema({
    session_id: { type: String, required: true, index: true },
    scenario_id: { type: Number, default: 0 },
    value_list_snapshot: { type: [ValueSnapshotItemSchema], default: [] },
    created_at: { type: Date, default: Date.now },
}, { versionKey: false });
export const ValueEvolution = mongoose.model("value_evolution", ValueEvolutionSchema);
//# sourceMappingURL=ValueEvolution.js.map