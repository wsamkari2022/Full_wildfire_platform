import mongoose from "mongoose";
export declare const CVRResponse: mongoose.Model<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    cvr_question: string;
    user_answer: boolean;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    response_time_ms?: number | null | undefined;
    decision_changed_after?: boolean | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    cvr_question: string;
    user_answer: boolean;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    response_time_ms?: number | null | undefined;
    decision_changed_after?: boolean | null | undefined;
}, {}, {
    versionKey: false;
}> & {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    cvr_question: string;
    user_answer: boolean;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    response_time_ms?: number | null | undefined;
    decision_changed_after?: boolean | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    cvr_question: string;
    user_answer: boolean;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    response_time_ms?: number | null | undefined;
    decision_changed_after?: boolean | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    cvr_question: string;
    user_answer: boolean;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    response_time_ms?: number | null | undefined;
    decision_changed_after?: boolean | null | undefined;
}>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    cvr_question: string;
    user_answer: boolean;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    response_time_ms?: number | null | undefined;
    decision_changed_after?: boolean | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=CVRResponse.d.ts.map