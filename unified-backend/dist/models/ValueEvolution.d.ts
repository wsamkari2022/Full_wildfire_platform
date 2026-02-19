import mongoose from "mongoose";
export declare const ValueEvolution: mongoose.Model<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    value_list_snapshot: mongoose.Types.DocumentArray<{
        name: string;
        matchPercentage: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        matchPercentage: number;
    }> & {
        name: string;
        matchPercentage: number;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    value_list_snapshot: mongoose.Types.DocumentArray<{
        name: string;
        matchPercentage: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        matchPercentage: number;
    }> & {
        name: string;
        matchPercentage: number;
    }>;
}, {}, {
    versionKey: false;
}> & {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    value_list_snapshot: mongoose.Types.DocumentArray<{
        name: string;
        matchPercentage: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        matchPercentage: number;
    }> & {
        name: string;
        matchPercentage: number;
    }>;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    value_list_snapshot: mongoose.Types.DocumentArray<{
        name: string;
        matchPercentage: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        matchPercentage: number;
    }> & {
        name: string;
        matchPercentage: number;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    value_list_snapshot: mongoose.Types.DocumentArray<{
        name: string;
        matchPercentage: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        matchPercentage: number;
    }> & {
        name: string;
        matchPercentage: number;
    }>;
}>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    created_at: NativeDate;
    scenario_id: number;
    value_list_snapshot: mongoose.Types.DocumentArray<{
        name: string;
        matchPercentage: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        matchPercentage: number;
    }> & {
        name: string;
        matchPercentage: number;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=ValueEvolution.d.ts.map