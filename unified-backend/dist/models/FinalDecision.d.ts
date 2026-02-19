import mongoose from "mongoose";
export declare const FinalDecision: mongoose.Model<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    option_id: string;
    option_label: string;
    is_aligned: boolean;
    from_top_two_ranked: boolean;
    total_switches: number;
    total_time_seconds: number;
    cvr_visited: boolean;
    cvr_visit_count: number;
    cvr_yes_answers: number;
    apa_reordered: boolean;
    apa_reorder_count: number;
    alternatives_explored: number;
    infeasible_options_checked: mongoose.Types.DocumentArray<{
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }> & {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }>;
    scenario_title?: string | null | undefined;
    option_title?: string | null | undefined;
    final_metrics?: any;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    option_id: string;
    option_label: string;
    is_aligned: boolean;
    from_top_two_ranked: boolean;
    total_switches: number;
    total_time_seconds: number;
    cvr_visited: boolean;
    cvr_visit_count: number;
    cvr_yes_answers: number;
    apa_reordered: boolean;
    apa_reorder_count: number;
    alternatives_explored: number;
    infeasible_options_checked: mongoose.Types.DocumentArray<{
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }> & {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }>;
    scenario_title?: string | null | undefined;
    option_title?: string | null | undefined;
    final_metrics?: any;
}, {}, {
    versionKey: false;
}> & {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    option_id: string;
    option_label: string;
    is_aligned: boolean;
    from_top_two_ranked: boolean;
    total_switches: number;
    total_time_seconds: number;
    cvr_visited: boolean;
    cvr_visit_count: number;
    cvr_yes_answers: number;
    apa_reordered: boolean;
    apa_reorder_count: number;
    alternatives_explored: number;
    infeasible_options_checked: mongoose.Types.DocumentArray<{
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }> & {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }>;
    scenario_title?: string | null | undefined;
    option_title?: string | null | undefined;
    final_metrics?: any;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    option_id: string;
    option_label: string;
    is_aligned: boolean;
    from_top_two_ranked: boolean;
    total_switches: number;
    total_time_seconds: number;
    cvr_visited: boolean;
    cvr_visit_count: number;
    cvr_yes_answers: number;
    apa_reordered: boolean;
    apa_reorder_count: number;
    alternatives_explored: number;
    infeasible_options_checked: mongoose.Types.DocumentArray<{
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }> & {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }>;
    scenario_title?: string | null | undefined;
    option_title?: string | null | undefined;
    final_metrics?: any;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    option_id: string;
    option_label: string;
    is_aligned: boolean;
    from_top_two_ranked: boolean;
    total_switches: number;
    total_time_seconds: number;
    cvr_visited: boolean;
    cvr_visit_count: number;
    cvr_yes_answers: number;
    apa_reordered: boolean;
    apa_reorder_count: number;
    alternatives_explored: number;
    infeasible_options_checked: mongoose.Types.DocumentArray<{
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }> & {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }>;
    scenario_title?: string | null | undefined;
    option_title?: string | null | undefined;
    final_metrics?: any;
}>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    option_id: string;
    option_label: string;
    is_aligned: boolean;
    from_top_two_ranked: boolean;
    total_switches: number;
    total_time_seconds: number;
    cvr_visited: boolean;
    cvr_visit_count: number;
    cvr_yes_answers: number;
    apa_reordered: boolean;
    apa_reorder_count: number;
    alternatives_explored: number;
    infeasible_options_checked: mongoose.Types.DocumentArray<{
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }> & {
        id?: string | null | undefined;
        label?: string | null | undefined;
        title?: string | null | undefined;
        checked?: boolean | null | undefined;
    }>;
    scenario_title?: string | null | undefined;
    option_title?: string | null | undefined;
    final_metrics?: any;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=FinalDecision.d.ts.map