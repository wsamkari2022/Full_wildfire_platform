import mongoose from "mongoose";
const UserSessionSchema = new mongoose.Schema({
    session_id: { type: String, required: true, index: true, unique: true },
    experiment_condition: { type: String, required: true, index: true },
    demographics: {
        age: String,
        gender: String,
        aiExperience: String,
        moralReasoningExperience: String
    },
    age: Number,
    gender: String,
    ai_experience: String,
    moral_reasoning_experience: String,
    consent_agreed: { type: Boolean, default: false },
    consent_timestamp: { type: String },
    created_at: { type: Date, default: Date.now }
}, { versionKey: false });
export const UserSession = mongoose.model("user_sessions", UserSessionSchema);
//# sourceMappingURL=UserSession.js.map