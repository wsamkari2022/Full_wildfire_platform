import mongoose from "mongoose";
export declare const SessionMetrics: mongoose.Model<{
    session_id: string;
    cvrYesCount: number;
    cvrNoCount: number;
    cvrArrivals: number;
    apaReorderings: number;
    misalignAfterCvrApaCount: number;
    realignAfterCvrApaCount: number;
    switchCountTotal: number;
    avgDecisionTime: number;
    decisionTimes: number[];
    valueConsistencyIndex: number;
    performanceComposite: number;
    balanceIndex: number;
    finalAlignmentByScenario: boolean[];
    scenarioDetails: mongoose.Types.DocumentArray<{
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }> & {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }>;
    valueOrderTrajectories: mongoose.Types.DocumentArray<{
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }> & {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }>;
    debug_tracking: {
        rows: mongoose.Types.DocumentArray<{
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }> & {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }>;
    };
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    session_id: string;
    cvrYesCount: number;
    cvrNoCount: number;
    cvrArrivals: number;
    apaReorderings: number;
    misalignAfterCvrApaCount: number;
    realignAfterCvrApaCount: number;
    switchCountTotal: number;
    avgDecisionTime: number;
    decisionTimes: number[];
    valueConsistencyIndex: number;
    performanceComposite: number;
    balanceIndex: number;
    finalAlignmentByScenario: boolean[];
    scenarioDetails: mongoose.Types.DocumentArray<{
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }> & {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }>;
    valueOrderTrajectories: mongoose.Types.DocumentArray<{
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }> & {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }>;
    debug_tracking: {
        rows: mongoose.Types.DocumentArray<{
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }> & {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }>;
    };
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    session_id: string;
    cvrYesCount: number;
    cvrNoCount: number;
    cvrArrivals: number;
    apaReorderings: number;
    misalignAfterCvrApaCount: number;
    realignAfterCvrApaCount: number;
    switchCountTotal: number;
    avgDecisionTime: number;
    decisionTimes: number[];
    valueConsistencyIndex: number;
    performanceComposite: number;
    balanceIndex: number;
    finalAlignmentByScenario: boolean[];
    scenarioDetails: mongoose.Types.DocumentArray<{
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }> & {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }>;
    valueOrderTrajectories: mongoose.Types.DocumentArray<{
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }> & {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }>;
    debug_tracking: {
        rows: mongoose.Types.DocumentArray<{
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }> & {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }>;
    };
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    session_id: string;
    cvrYesCount: number;
    cvrNoCount: number;
    cvrArrivals: number;
    apaReorderings: number;
    misalignAfterCvrApaCount: number;
    realignAfterCvrApaCount: number;
    switchCountTotal: number;
    avgDecisionTime: number;
    decisionTimes: number[];
    valueConsistencyIndex: number;
    performanceComposite: number;
    balanceIndex: number;
    finalAlignmentByScenario: boolean[];
    scenarioDetails: mongoose.Types.DocumentArray<{
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }> & {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }>;
    valueOrderTrajectories: mongoose.Types.DocumentArray<{
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }> & {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }>;
    debug_tracking: {
        rows: mongoose.Types.DocumentArray<{
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }> & {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }>;
    };
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    session_id: string;
    cvrYesCount: number;
    cvrNoCount: number;
    cvrArrivals: number;
    apaReorderings: number;
    misalignAfterCvrApaCount: number;
    realignAfterCvrApaCount: number;
    switchCountTotal: number;
    avgDecisionTime: number;
    decisionTimes: number[];
    valueConsistencyIndex: number;
    performanceComposite: number;
    balanceIndex: number;
    finalAlignmentByScenario: boolean[];
    scenarioDetails: mongoose.Types.DocumentArray<{
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }> & {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }>;
    valueOrderTrajectories: mongoose.Types.DocumentArray<{
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }> & {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }>;
    debug_tracking: {
        rows: mongoose.Types.DocumentArray<{
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }> & {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }>;
    };
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    session_id: string;
    cvrYesCount: number;
    cvrNoCount: number;
    cvrArrivals: number;
    apaReorderings: number;
    misalignAfterCvrApaCount: number;
    realignAfterCvrApaCount: number;
    switchCountTotal: number;
    avgDecisionTime: number;
    decisionTimes: number[];
    valueConsistencyIndex: number;
    performanceComposite: number;
    balanceIndex: number;
    finalAlignmentByScenario: boolean[];
    scenarioDetails: mongoose.Types.DocumentArray<{
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }> & {
        scenarioId: number;
        finalChoice: string;
        aligned: boolean;
        switches: number;
        timeSeconds: number;
        cvrVisited: boolean;
        cvrVisitCount: number;
        cvrYesAnswers: number;
        apaReordered: boolean;
        apaReorderCount: number;
    }>;
    valueOrderTrajectories: mongoose.Types.DocumentArray<{
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }> & {
        values: string[];
        scenarioId: number;
        preferenceType: string;
    }>;
    debug_tracking: {
        rows: mongoose.Types.DocumentArray<{
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }> & {
            scenarioId: number;
            valueListsUsed: {
                scenarioMoralValueReordered: string[];
                finalTopTwoValues: string[];
                infeasibleOptions: mongoose.Types.DocumentArray<{
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }> & {
                    label?: string | null | undefined;
                    title?: string | null | undefined;
                    checked?: boolean | null | undefined;
                }>;
                scenarioMoralValueReorderedName?: string | null | undefined;
            };
            finalDecisionLabel: string;
            alignmentStatus: string;
            flagsAtConfirmation: {
                apaReordered: boolean;
                cvrYes: boolean;
                cvrNo: boolean;
                simMetricsReordered: boolean;
                moralValuesReordered: boolean;
            };
            interactionCounters: {
                switches: number;
                apaReorders: number;
                cvrYesCount: number;
                cvrNoCount: number;
                alternativesAdded: number;
            };
        }>;
    };
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=SessionMetrics.d.ts.map