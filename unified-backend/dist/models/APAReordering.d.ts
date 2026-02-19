import mongoose from "mongoose";
export declare const APAReordering: mongoose.Model<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    preference_type: string;
    values_before: string[];
    values_after: string[];
    reorder_count?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    preference_type: string;
    values_before: string[];
    values_after: string[];
    reorder_count?: number | null | undefined;
}, {}, {
    versionKey: false;
}> & {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    preference_type: string;
    values_before: string[];
    values_after: string[];
    reorder_count?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    preference_type: string;
    values_before: string[];
    values_after: string[];
    reorder_count?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    preference_type: string;
    values_before: string[];
    values_after: string[];
    reorder_count?: number | null | undefined;
}>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    preference_type: string;
    values_before: string[];
    values_after: string[];
    reorder_count?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=APAReordering.d.ts.map