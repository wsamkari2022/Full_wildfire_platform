import mongoose from "mongoose";
const ScenarioInteractionSchema = new mongoose.Schema({
    session_id: { type: String, required: true, index: true },
    scenario_id: { type: Number, required: true },
    event_type: { type: String, required: true },
    option_id: { type: String },
    option_label: { type: String },
    option_title: { type: String },
    is_aligned: { type: Boolean },
    time_since_start_ms: { type: Number },
    switch_count: { type: Number },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });
export const ScenarioInteraction = mongoose.model("scenario_interactions", ScenarioInteractionSchema);
//# sourceMappingURL=ScenarioInteraction.js.map