import mongoose from "mongoose";
export declare const ScenarioInteraction: mongoose.Model<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    event_type: string;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    option_title?: string | null | undefined;
    is_aligned?: boolean | null | undefined;
    time_since_start_ms?: number | null | undefined;
    switch_count?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    event_type: string;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    option_title?: string | null | undefined;
    is_aligned?: boolean | null | undefined;
    time_since_start_ms?: number | null | undefined;
    switch_count?: number | null | undefined;
}, {}, {
    versionKey: false;
}> & {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    event_type: string;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    option_title?: string | null | undefined;
    is_aligned?: boolean | null | undefined;
    time_since_start_ms?: number | null | undefined;
    switch_count?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    event_type: string;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    option_title?: string | null | undefined;
    is_aligned?: boolean | null | undefined;
    time_since_start_ms?: number | null | undefined;
    switch_count?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    event_type: string;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    option_title?: string | null | undefined;
    is_aligned?: boolean | null | undefined;
    time_since_start_ms?: number | null | undefined;
    switch_count?: number | null | undefined;
}>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    event_type: string;
    option_id?: string | null | undefined;
    option_label?: string | null | undefined;
    option_title?: string | null | undefined;
    is_aligned?: boolean | null | undefined;
    time_since_start_ms?: number | null | undefined;
    switch_count?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=ScenarioInteraction.d.ts.map