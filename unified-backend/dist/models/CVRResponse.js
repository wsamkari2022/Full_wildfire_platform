import mongoose from "mongoose";
const CVRResponseSchema = new mongoose.Schema({
    session_id: { type: String, required: true, index: true },
    scenario_id: { type: Number, required: true },
    cvr_question: { type: String, required: true },
    user_answer: { type: Boolean, required: true },
    response_time_ms: { type: Number },
    decision_changed_after: { type: Boolean },
    option_id: { type: String },
    option_label: { type: String },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });
export const CVRResponse = mongoose.model("cvr_responses", CVRResponseSchema);
//# sourceMappingURL=CVRResponse.js.map