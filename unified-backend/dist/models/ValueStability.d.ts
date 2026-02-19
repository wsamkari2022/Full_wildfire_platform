import mongoose from "mongoose";
export declare const ValueStability: mongoose.Model<{
    session_id: string;
    weights: {
        explicitWeight: number;
        implicitWeight: number;
    };
    overallStabilityScorePercent: number;
    scenarios: mongoose.Types.DocumentArray<{
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }> & {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }>;
    summary?: {
        totalStableCount: number;
        totalScenarios: number;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    weights: {
        explicitWeight: number;
        implicitWeight: number;
    };
    overallStabilityScorePercent: number;
    scenarios: mongoose.Types.DocumentArray<{
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }> & {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }>;
    summary?: {
        totalStableCount: number;
        totalScenarios: number;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    session_id: string;
    weights: {
        explicitWeight: number;
        implicitWeight: number;
    };
    overallStabilityScorePercent: number;
    scenarios: mongoose.Types.DocumentArray<{
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }> & {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }>;
    summary?: {
        totalStableCount: number;
        totalScenarios: number;
    } | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    session_id: string;
    weights: {
        explicitWeight: number;
        implicitWeight: number;
    };
    overallStabilityScorePercent: number;
    scenarios: mongoose.Types.DocumentArray<{
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }> & {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }>;
    summary?: {
        totalStableCount: number;
        totalScenarios: number;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    weights: {
        explicitWeight: number;
        implicitWeight: number;
    };
    overallStabilityScorePercent: number;
    scenarios: mongoose.Types.DocumentArray<{
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }> & {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }>;
    summary?: {
        totalStableCount: number;
        totalScenarios: number;
    } | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    weights: {
        explicitWeight: number;
        implicitWeight: number;
    };
    overallStabilityScorePercent: number;
    scenarios: mongoose.Types.DocumentArray<{
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }> & {
        scenarioId: number;
        scenarioLabel: string;
        selectedValue: string;
        matches: {
            explicitValuesMatch: boolean;
            implicitValuesMatch: boolean;
            simulationValuesMatch: boolean;
        };
        stabilityStatus: string;
        scorePercent: number;
    }>;
    summary?: {
        totalStableCount: number;
        totalScenarios: number;
    } | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=ValueStability.d.ts.map