import mongoose from "mongoose";
export declare const SessionFeedback: mongoose.Model<{
    session_id: string;
    cvr: {
        purposeClarity: number;
        confidenceChange: number;
        helpfulness: number;
        clarity: number;
        comfortLevel: number;
        perceivedValue: number;
        overallImpact: number;
        comments: string;
        initialReconsideration?: boolean | null | undefined;
        finalReconsideration?: boolean | null | undefined;
    };
    apa: {
        purposeClarity: number;
        perceivedValue: number;
        comments: string;
        easeOfUse: number;
        controlUnderstanding: number;
        comparisonUsefulness: number;
        perspectiveValue: number;
        confidenceAfterReordering: number;
        tradeoffChallenge: number;
        reflectionDepth: number;
        decisionReflection?: boolean | null | undefined;
        scenarioAlignment?: boolean | null | undefined;
    };
    visualization: {
        clarity: number;
        comments: string;
        usefulness: number;
        tradeoffEvaluation: number;
        tradeoffJustification: number;
        expertUsefulness: number;
        helpfulness?: boolean | null | undefined;
        usedTradeoffComparison?: boolean | null | undefined;
        expertConfidenceImpact?: boolean | null | undefined;
    };
    overall: {
        comments: string;
        decisionSatisfaction: number;
        processSatisfaction: number;
        confidenceConsistency: number;
        learningInsight: number;
        scenarioAlignment?: boolean | null | undefined;
    };
    metricsSnapshot: {
        cvrYesCount: number;
        cvrNoCount: number;
        cvrArrivals: number;
        apaReorderings: number;
        avgDecisionTime: number;
        valueConsistencyIndex: number;
        performanceComposite: number;
        balanceIndex: number;
        totalSwitches: number;
        scenariosFinalDecisionLabels: string[];
        checkingAlignmentList: string[];
    };
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    cvr: {
        purposeClarity: number;
        confidenceChange: number;
        helpfulness: number;
        clarity: number;
        comfortLevel: number;
        perceivedValue: number;
        overallImpact: number;
        comments: string;
        initialReconsideration?: boolean | null | undefined;
        finalReconsideration?: boolean | null | undefined;
    };
    apa: {
        purposeClarity: number;
        perceivedValue: number;
        comments: string;
        easeOfUse: number;
        controlUnderstanding: number;
        comparisonUsefulness: number;
        perspectiveValue: number;
        confidenceAfterReordering: number;
        tradeoffChallenge: number;
        reflectionDepth: number;
        decisionReflection?: boolean | null | undefined;
        scenarioAlignment?: boolean | null | undefined;
    };
    visualization: {
        clarity: number;
        comments: string;
        usefulness: number;
        tradeoffEvaluation: number;
        tradeoffJustification: number;
        expertUsefulness: number;
        helpfulness?: boolean | null | undefined;
        usedTradeoffComparison?: boolean | null | undefined;
        expertConfidenceImpact?: boolean | null | undefined;
    };
    overall: {
        comments: string;
        decisionSatisfaction: number;
        processSatisfaction: number;
        confidenceConsistency: number;
        learningInsight: number;
        scenarioAlignment?: boolean | null | undefined;
    };
    metricsSnapshot: {
        cvrYesCount: number;
        cvrNoCount: number;
        cvrArrivals: number;
        apaReorderings: number;
        avgDecisionTime: number;
        valueConsistencyIndex: number;
        performanceComposite: number;
        balanceIndex: number;
        totalSwitches: number;
        scenariosFinalDecisionLabels: string[];
        checkingAlignmentList: string[];
    };
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    session_id: string;
    cvr: {
        purposeClarity: number;
        confidenceChange: number;
        helpfulness: number;
        clarity: number;
        comfortLevel: number;
        perceivedValue: number;
        overallImpact: number;
        comments: string;
        initialReconsideration?: boolean | null | undefined;
        finalReconsideration?: boolean | null | undefined;
    };
    apa: {
        purposeClarity: number;
        perceivedValue: number;
        comments: string;
        easeOfUse: number;
        controlUnderstanding: number;
        comparisonUsefulness: number;
        perspectiveValue: number;
        confidenceAfterReordering: number;
        tradeoffChallenge: number;
        reflectionDepth: number;
        decisionReflection?: boolean | null | undefined;
        scenarioAlignment?: boolean | null | undefined;
    };
    visualization: {
        clarity: number;
        comments: string;
        usefulness: number;
        tradeoffEvaluation: number;
        tradeoffJustification: number;
        expertUsefulness: number;
        helpfulness?: boolean | null | undefined;
        usedTradeoffComparison?: boolean | null | undefined;
        expertConfidenceImpact?: boolean | null | undefined;
    };
    overall: {
        comments: string;
        decisionSatisfaction: number;
        processSatisfaction: number;
        confidenceConsistency: number;
        learningInsight: number;
        scenarioAlignment?: boolean | null | undefined;
    };
    metricsSnapshot: {
        cvrYesCount: number;
        cvrNoCount: number;
        cvrArrivals: number;
        apaReorderings: number;
        avgDecisionTime: number;
        valueConsistencyIndex: number;
        performanceComposite: number;
        balanceIndex: number;
        totalSwitches: number;
        scenariosFinalDecisionLabels: string[];
        checkingAlignmentList: string[];
    };
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    session_id: string;
    cvr: {
        purposeClarity: number;
        confidenceChange: number;
        helpfulness: number;
        clarity: number;
        comfortLevel: number;
        perceivedValue: number;
        overallImpact: number;
        comments: string;
        initialReconsideration?: boolean | null | undefined;
        finalReconsideration?: boolean | null | undefined;
    };
    apa: {
        purposeClarity: number;
        perceivedValue: number;
        comments: string;
        easeOfUse: number;
        controlUnderstanding: number;
        comparisonUsefulness: number;
        perspectiveValue: number;
        confidenceAfterReordering: number;
        tradeoffChallenge: number;
        reflectionDepth: number;
        decisionReflection?: boolean | null | undefined;
        scenarioAlignment?: boolean | null | undefined;
    };
    visualization: {
        clarity: number;
        comments: string;
        usefulness: number;
        tradeoffEvaluation: number;
        tradeoffJustification: number;
        expertUsefulness: number;
        helpfulness?: boolean | null | undefined;
        usedTradeoffComparison?: boolean | null | undefined;
        expertConfidenceImpact?: boolean | null | undefined;
    };
    overall: {
        comments: string;
        decisionSatisfaction: number;
        processSatisfaction: number;
        confidenceConsistency: number;
        learningInsight: number;
        scenarioAlignment?: boolean | null | undefined;
    };
    metricsSnapshot: {
        cvrYesCount: number;
        cvrNoCount: number;
        cvrArrivals: number;
        apaReorderings: number;
        avgDecisionTime: number;
        valueConsistencyIndex: number;
        performanceComposite: number;
        balanceIndex: number;
        totalSwitches: number;
        scenariosFinalDecisionLabels: string[];
        checkingAlignmentList: string[];
    };
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    cvr: {
        purposeClarity: number;
        confidenceChange: number;
        helpfulness: number;
        clarity: number;
        comfortLevel: number;
        perceivedValue: number;
        overallImpact: number;
        comments: string;
        initialReconsideration?: boolean | null | undefined;
        finalReconsideration?: boolean | null | undefined;
    };
    apa: {
        purposeClarity: number;
        perceivedValue: number;
        comments: string;
        easeOfUse: number;
        controlUnderstanding: number;
        comparisonUsefulness: number;
        perspectiveValue: number;
        confidenceAfterReordering: number;
        tradeoffChallenge: number;
        reflectionDepth: number;
        decisionReflection?: boolean | null | undefined;
        scenarioAlignment?: boolean | null | undefined;
    };
    visualization: {
        clarity: number;
        comments: string;
        usefulness: number;
        tradeoffEvaluation: number;
        tradeoffJustification: number;
        expertUsefulness: number;
        helpfulness?: boolean | null | undefined;
        usedTradeoffComparison?: boolean | null | undefined;
        expertConfidenceImpact?: boolean | null | undefined;
    };
    overall: {
        comments: string;
        decisionSatisfaction: number;
        processSatisfaction: number;
        confidenceConsistency: number;
        learningInsight: number;
        scenarioAlignment?: boolean | null | undefined;
    };
    metricsSnapshot: {
        cvrYesCount: number;
        cvrNoCount: number;
        cvrArrivals: number;
        apaReorderings: number;
        avgDecisionTime: number;
        valueConsistencyIndex: number;
        performanceComposite: number;
        balanceIndex: number;
        totalSwitches: number;
        scenariosFinalDecisionLabels: string[];
        checkingAlignmentList: string[];
    };
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    cvr: {
        purposeClarity: number;
        confidenceChange: number;
        helpfulness: number;
        clarity: number;
        comfortLevel: number;
        perceivedValue: number;
        overallImpact: number;
        comments: string;
        initialReconsideration?: boolean | null | undefined;
        finalReconsideration?: boolean | null | undefined;
    };
    apa: {
        purposeClarity: number;
        perceivedValue: number;
        comments: string;
        easeOfUse: number;
        controlUnderstanding: number;
        comparisonUsefulness: number;
        perspectiveValue: number;
        confidenceAfterReordering: number;
        tradeoffChallenge: number;
        reflectionDepth: number;
        decisionReflection?: boolean | null | undefined;
        scenarioAlignment?: boolean | null | undefined;
    };
    visualization: {
        clarity: number;
        comments: string;
        usefulness: number;
        tradeoffEvaluation: number;
        tradeoffJustification: number;
        expertUsefulness: number;
        helpfulness?: boolean | null | undefined;
        usedTradeoffComparison?: boolean | null | undefined;
        expertConfidenceImpact?: boolean | null | undefined;
    };
    overall: {
        comments: string;
        decisionSatisfaction: number;
        processSatisfaction: number;
        confidenceConsistency: number;
        learningInsight: number;
        scenarioAlignment?: boolean | null | undefined;
    };
    metricsSnapshot: {
        cvrYesCount: number;
        cvrNoCount: number;
        cvrArrivals: number;
        apaReorderings: number;
        avgDecisionTime: number;
        valueConsistencyIndex: number;
        performanceComposite: number;
        balanceIndex: number;
        totalSwitches: number;
        scenariosFinalDecisionLabels: string[];
        checkingAlignmentList: string[];
    };
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=SessionFeedback.d.ts.map