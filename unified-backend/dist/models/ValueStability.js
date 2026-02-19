import mongoose, { Schema } from "mongoose";
const MatchFlagsSchema = new Schema({
    explicitValuesMatch: { type: Boolean, required: true },
    implicitValuesMatch: { type: Boolean, required: true },
    simulationValuesMatch: { type: Boolean, required: true },
}, { _id: false });
const ScenarioStabilityRowSchema = new Schema({
    scenarioId: { type: Number, required: true },
    scenarioLabel: { type: String, default: "" },
    selectedValue: { type: String, required: true },
    matches: { type: MatchFlagsSchema, required: true },
    stabilityStatus: { type: String, required: true },
    scorePercent: { type: Number, required: true },
}, { _id: false });
const WeightsSchema = new Schema({
    explicitWeight: { type: Number, default: 0.4 },
    implicitWeight: { type: Number, default: 0.6 },
}, { _id: false });
const ValueStabilitySchema = new Schema({
    session_id: { type: String, required: true, unique: true, index: true },
    overallStabilityScorePercent: { type: Number, required: true },
    weights: { type: WeightsSchema, default: () => ({ explicitWeight: 0.4, implicitWeight: 0.6 }) },
    scenarios: { type: [ScenarioStabilityRowSchema], default: [] },
    summary: {
        totalStableCount: { type: Number, default: 0 },
        totalScenarios: { type: Number, default: 0 }
    }
}, { timestamps: true, versionKey: false });
export const ValueStability = mongoose.model("value_stability", ValueStabilitySchema);
//# sourceMappingURL=ValueStability.js.map