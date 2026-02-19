import mongoose, { Document } from 'mongoose';
export interface IBaselineValue extends Document {
    session_id: string;
    value_name: string;
    match_percentage: number;
    rank_order: number;
    value_type?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IBaselineValue, {}, {}, {}, mongoose.Document<unknown, {}, IBaselineValue, {}, {}> & IBaselineValue & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=BaselineValue.d.ts.map