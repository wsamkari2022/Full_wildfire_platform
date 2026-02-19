import mongoose from "mongoose";
export declare const UserSession: mongoose.Model<{
    session_id: string;
    experiment_condition: string;
    consent_agreed: boolean;
    created_at: NativeDate;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    ai_experience?: string | null | undefined;
    moral_reasoning_experience?: string | null | undefined;
    demographics?: {
        age?: string | null | undefined;
        gender?: string | null | undefined;
        aiExperience?: string | null | undefined;
        moralReasoningExperience?: string | null | undefined;
    } | null | undefined;
    consent_timestamp?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    experiment_condition: string;
    consent_agreed: boolean;
    created_at: NativeDate;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    ai_experience?: string | null | undefined;
    moral_reasoning_experience?: string | null | undefined;
    demographics?: {
        age?: string | null | undefined;
        gender?: string | null | undefined;
        aiExperience?: string | null | undefined;
        moralReasoningExperience?: string | null | undefined;
    } | null | undefined;
    consent_timestamp?: string | null | undefined;
}, {}, {
    versionKey: false;
}> & {
    session_id: string;
    experiment_condition: string;
    consent_agreed: boolean;
    created_at: NativeDate;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    ai_experience?: string | null | undefined;
    moral_reasoning_experience?: string | null | undefined;
    demographics?: {
        age?: string | null | undefined;
        gender?: string | null | undefined;
        aiExperience?: string | null | undefined;
        moralReasoningExperience?: string | null | undefined;
    } | null | undefined;
    consent_timestamp?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    session_id: string;
    experiment_condition: string;
    consent_agreed: boolean;
    created_at: NativeDate;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    ai_experience?: string | null | undefined;
    moral_reasoning_experience?: string | null | undefined;
    demographics?: {
        age?: string | null | undefined;
        gender?: string | null | undefined;
        aiExperience?: string | null | undefined;
        moralReasoningExperience?: string | null | undefined;
    } | null | undefined;
    consent_timestamp?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    experiment_condition: string;
    consent_agreed: boolean;
    created_at: NativeDate;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    ai_experience?: string | null | undefined;
    moral_reasoning_experience?: string | null | undefined;
    demographics?: {
        age?: string | null | undefined;
        gender?: string | null | undefined;
        aiExperience?: string | null | undefined;
        moralReasoningExperience?: string | null | undefined;
    } | null | undefined;
    consent_timestamp?: string | null | undefined;
}>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    experiment_condition: string;
    consent_agreed: boolean;
    created_at: NativeDate;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    ai_experience?: string | null | undefined;
    moral_reasoning_experience?: string | null | undefined;
    demographics?: {
        age?: string | null | undefined;
        gender?: string | null | undefined;
        aiExperience?: string | null | undefined;
        moralReasoningExperience?: string | null | undefined;
    } | null | undefined;
    consent_timestamp?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=UserSession.d.ts.map