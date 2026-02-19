import mongoose, { Schema } from "mongoose";
const InfeasibleOptionSchema = new Schema({
    id: String,
    label: String,
    title: String,
    checked: Boolean
}, { _id: false });
const FinalDecisionSchema = new mongoose.Schema({
    session_id: { type: String, required: true, index: true },
    scenario_id: { type: Number, required: true },
    scenario_title: { type: String },
    option_id: { type: String, required: true },
    option_label: { type: String, required: true },
    option_title: { type: String },
    is_aligned: { type: Boolean, required: true },
    from_top_two_ranked: { type: Boolean, default: false },
    total_switches: { type: Number, default: 0 },
    total_time_seconds: { type: Number, default: 0 },
    cvr_visited: { type: Boolean, default: false },
    cvr_visit_count: { type: Number, default: 0 },
    cvr_yes_answers: { type: Number, default: 0 },
    apa_reordered: { type: Boolean, default: false },
    apa_reorder_count: { type: Number, default: 0 },
    alternatives_explored: { type: Number, default: 0 },
    final_metrics: { type: Schema.Types.Mixed },
    infeasible_options_checked: { type: [InfeasibleOptionSchema], default: [] },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });
export const FinalDecision = mongoose.model("final_decisions", FinalDecisionSchema);
//# sourceMappingURL=FinalDecision.js.map