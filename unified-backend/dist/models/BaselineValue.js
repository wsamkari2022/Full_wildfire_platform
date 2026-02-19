import mongoose, { Schema } from 'mongoose';
const BaselineValueSchema = new Schema({
    session_id: { type: String, required: true, index: true },
    value_name: { type: String, required: true },
    match_percentage: { type: Number, required: true, min: 0, max: 100 },
    rank_order: { type: Number, required: true, min: 0 },
    value_type: { type: String }
}, {
    timestamps: true
});
BaselineValueSchema.index({ session_id: 1, value_name: 1 });
export default mongoose.model('BaselineValue', BaselineValueSchema);
//# sourceMappingURL=BaselineValue.js.map