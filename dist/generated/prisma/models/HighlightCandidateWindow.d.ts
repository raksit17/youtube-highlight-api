import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HighlightCandidateWindowModel = runtime.Types.Result.DefaultSelection<Prisma.$HighlightCandidateWindowPayload>;
export type AggregateHighlightCandidateWindow = {
    _count: HighlightCandidateWindowCountAggregateOutputType | null;
    _avg: HighlightCandidateWindowAvgAggregateOutputType | null;
    _sum: HighlightCandidateWindowSumAggregateOutputType | null;
    _min: HighlightCandidateWindowMinAggregateOutputType | null;
    _max: HighlightCandidateWindowMaxAggregateOutputType | null;
};
export type HighlightCandidateWindowAvgAggregateOutputType = {
    position: number | null;
};
export type HighlightCandidateWindowSumAggregateOutputType = {
    position: number | null;
};
export type HighlightCandidateWindowMinAggregateOutputType = {
    highlightCandidateId: string | null;
    analysisWindowId: string | null;
    position: number | null;
};
export type HighlightCandidateWindowMaxAggregateOutputType = {
    highlightCandidateId: string | null;
    analysisWindowId: string | null;
    position: number | null;
};
export type HighlightCandidateWindowCountAggregateOutputType = {
    highlightCandidateId: number;
    analysisWindowId: number;
    position: number;
    _all: number;
};
export type HighlightCandidateWindowAvgAggregateInputType = {
    position?: true;
};
export type HighlightCandidateWindowSumAggregateInputType = {
    position?: true;
};
export type HighlightCandidateWindowMinAggregateInputType = {
    highlightCandidateId?: true;
    analysisWindowId?: true;
    position?: true;
};
export type HighlightCandidateWindowMaxAggregateInputType = {
    highlightCandidateId?: true;
    analysisWindowId?: true;
    position?: true;
};
export type HighlightCandidateWindowCountAggregateInputType = {
    highlightCandidateId?: true;
    analysisWindowId?: true;
    position?: true;
    _all?: true;
};
export type HighlightCandidateWindowAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HighlightCandidateWindowWhereInput;
    orderBy?: Prisma.HighlightCandidateWindowOrderByWithRelationInput | Prisma.HighlightCandidateWindowOrderByWithRelationInput[];
    cursor?: Prisma.HighlightCandidateWindowWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HighlightCandidateWindowCountAggregateInputType;
    _avg?: HighlightCandidateWindowAvgAggregateInputType;
    _sum?: HighlightCandidateWindowSumAggregateInputType;
    _min?: HighlightCandidateWindowMinAggregateInputType;
    _max?: HighlightCandidateWindowMaxAggregateInputType;
};
export type GetHighlightCandidateWindowAggregateType<T extends HighlightCandidateWindowAggregateArgs> = {
    [P in keyof T & keyof AggregateHighlightCandidateWindow]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHighlightCandidateWindow[P]> : Prisma.GetScalarType<T[P], AggregateHighlightCandidateWindow[P]>;
};
export type HighlightCandidateWindowGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HighlightCandidateWindowWhereInput;
    orderBy?: Prisma.HighlightCandidateWindowOrderByWithAggregationInput | Prisma.HighlightCandidateWindowOrderByWithAggregationInput[];
    by: Prisma.HighlightCandidateWindowScalarFieldEnum[] | Prisma.HighlightCandidateWindowScalarFieldEnum;
    having?: Prisma.HighlightCandidateWindowScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HighlightCandidateWindowCountAggregateInputType | true;
    _avg?: HighlightCandidateWindowAvgAggregateInputType;
    _sum?: HighlightCandidateWindowSumAggregateInputType;
    _min?: HighlightCandidateWindowMinAggregateInputType;
    _max?: HighlightCandidateWindowMaxAggregateInputType;
};
export type HighlightCandidateWindowGroupByOutputType = {
    highlightCandidateId: string;
    analysisWindowId: string;
    position: number;
    _count: HighlightCandidateWindowCountAggregateOutputType | null;
    _avg: HighlightCandidateWindowAvgAggregateOutputType | null;
    _sum: HighlightCandidateWindowSumAggregateOutputType | null;
    _min: HighlightCandidateWindowMinAggregateOutputType | null;
    _max: HighlightCandidateWindowMaxAggregateOutputType | null;
};
export type GetHighlightCandidateWindowGroupByPayload<T extends HighlightCandidateWindowGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HighlightCandidateWindowGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HighlightCandidateWindowGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HighlightCandidateWindowGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HighlightCandidateWindowGroupByOutputType[P]>;
}>>;
export type HighlightCandidateWindowWhereInput = {
    AND?: Prisma.HighlightCandidateWindowWhereInput | Prisma.HighlightCandidateWindowWhereInput[];
    OR?: Prisma.HighlightCandidateWindowWhereInput[];
    NOT?: Prisma.HighlightCandidateWindowWhereInput | Prisma.HighlightCandidateWindowWhereInput[];
    highlightCandidateId?: Prisma.StringFilter<"HighlightCandidateWindow"> | string;
    analysisWindowId?: Prisma.StringFilter<"HighlightCandidateWindow"> | string;
    position?: Prisma.IntFilter<"HighlightCandidateWindow"> | number;
    highlightCandidate?: Prisma.XOR<Prisma.HighlightCandidateScalarRelationFilter, Prisma.HighlightCandidateWhereInput>;
    analysisWindow?: Prisma.XOR<Prisma.AnalysisWindowScalarRelationFilter, Prisma.AnalysisWindowWhereInput>;
};
export type HighlightCandidateWindowOrderByWithRelationInput = {
    highlightCandidateId?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    highlightCandidate?: Prisma.HighlightCandidateOrderByWithRelationInput;
    analysisWindow?: Prisma.AnalysisWindowOrderByWithRelationInput;
};
export type HighlightCandidateWindowWhereUniqueInput = Prisma.AtLeast<{
    highlightCandidateId_analysisWindowId?: Prisma.HighlightCandidateWindowHighlightCandidateIdAnalysisWindowIdCompoundUniqueInput;
    AND?: Prisma.HighlightCandidateWindowWhereInput | Prisma.HighlightCandidateWindowWhereInput[];
    OR?: Prisma.HighlightCandidateWindowWhereInput[];
    NOT?: Prisma.HighlightCandidateWindowWhereInput | Prisma.HighlightCandidateWindowWhereInput[];
    highlightCandidateId?: Prisma.StringFilter<"HighlightCandidateWindow"> | string;
    analysisWindowId?: Prisma.StringFilter<"HighlightCandidateWindow"> | string;
    position?: Prisma.IntFilter<"HighlightCandidateWindow"> | number;
    highlightCandidate?: Prisma.XOR<Prisma.HighlightCandidateScalarRelationFilter, Prisma.HighlightCandidateWhereInput>;
    analysisWindow?: Prisma.XOR<Prisma.AnalysisWindowScalarRelationFilter, Prisma.AnalysisWindowWhereInput>;
}, "highlightCandidateId_analysisWindowId">;
export type HighlightCandidateWindowOrderByWithAggregationInput = {
    highlightCandidateId?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.HighlightCandidateWindowCountOrderByAggregateInput;
    _avg?: Prisma.HighlightCandidateWindowAvgOrderByAggregateInput;
    _max?: Prisma.HighlightCandidateWindowMaxOrderByAggregateInput;
    _min?: Prisma.HighlightCandidateWindowMinOrderByAggregateInput;
    _sum?: Prisma.HighlightCandidateWindowSumOrderByAggregateInput;
};
export type HighlightCandidateWindowScalarWhereWithAggregatesInput = {
    AND?: Prisma.HighlightCandidateWindowScalarWhereWithAggregatesInput | Prisma.HighlightCandidateWindowScalarWhereWithAggregatesInput[];
    OR?: Prisma.HighlightCandidateWindowScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HighlightCandidateWindowScalarWhereWithAggregatesInput | Prisma.HighlightCandidateWindowScalarWhereWithAggregatesInput[];
    highlightCandidateId?: Prisma.StringWithAggregatesFilter<"HighlightCandidateWindow"> | string;
    analysisWindowId?: Prisma.StringWithAggregatesFilter<"HighlightCandidateWindow"> | string;
    position?: Prisma.IntWithAggregatesFilter<"HighlightCandidateWindow"> | number;
};
export type HighlightCandidateWindowCreateInput = {
    position: number;
    highlightCandidate: Prisma.HighlightCandidateCreateNestedOneWithoutWindowsInput;
    analysisWindow: Prisma.AnalysisWindowCreateNestedOneWithoutHighlightLinksInput;
};
export type HighlightCandidateWindowUncheckedCreateInput = {
    highlightCandidateId: string;
    analysisWindowId: string;
    position: number;
};
export type HighlightCandidateWindowUpdateInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    highlightCandidate?: Prisma.HighlightCandidateUpdateOneRequiredWithoutWindowsNestedInput;
    analysisWindow?: Prisma.AnalysisWindowUpdateOneRequiredWithoutHighlightLinksNestedInput;
};
export type HighlightCandidateWindowUncheckedUpdateInput = {
    highlightCandidateId?: Prisma.StringFieldUpdateOperationsInput | string;
    analysisWindowId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HighlightCandidateWindowCreateManyInput = {
    highlightCandidateId: string;
    analysisWindowId: string;
    position: number;
};
export type HighlightCandidateWindowUpdateManyMutationInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HighlightCandidateWindowUncheckedUpdateManyInput = {
    highlightCandidateId?: Prisma.StringFieldUpdateOperationsInput | string;
    analysisWindowId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HighlightCandidateWindowListRelationFilter = {
    every?: Prisma.HighlightCandidateWindowWhereInput;
    some?: Prisma.HighlightCandidateWindowWhereInput;
    none?: Prisma.HighlightCandidateWindowWhereInput;
};
export type HighlightCandidateWindowOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HighlightCandidateWindowHighlightCandidateIdAnalysisWindowIdCompoundUniqueInput = {
    highlightCandidateId: string;
    analysisWindowId: string;
};
export type HighlightCandidateWindowCountOrderByAggregateInput = {
    highlightCandidateId?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type HighlightCandidateWindowAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type HighlightCandidateWindowMaxOrderByAggregateInput = {
    highlightCandidateId?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type HighlightCandidateWindowMinOrderByAggregateInput = {
    highlightCandidateId?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type HighlightCandidateWindowSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type HighlightCandidateWindowCreateNestedManyWithoutAnalysisWindowInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput> | Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyAnalysisWindowInputEnvelope;
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
};
export type HighlightCandidateWindowUncheckedCreateNestedManyWithoutAnalysisWindowInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput> | Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyAnalysisWindowInputEnvelope;
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
};
export type HighlightCandidateWindowUpdateManyWithoutAnalysisWindowNestedInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput> | Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput[];
    upsert?: Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutAnalysisWindowInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyAnalysisWindowInputEnvelope;
    set?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    disconnect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    delete?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    update?: Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutAnalysisWindowInput[];
    updateMany?: Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutAnalysisWindowInput[];
    deleteMany?: Prisma.HighlightCandidateWindowScalarWhereInput | Prisma.HighlightCandidateWindowScalarWhereInput[];
};
export type HighlightCandidateWindowUncheckedUpdateManyWithoutAnalysisWindowNestedInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput> | Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput[];
    upsert?: Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutAnalysisWindowInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyAnalysisWindowInputEnvelope;
    set?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    disconnect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    delete?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    update?: Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutAnalysisWindowInput[];
    updateMany?: Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutAnalysisWindowInput | Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutAnalysisWindowInput[];
    deleteMany?: Prisma.HighlightCandidateWindowScalarWhereInput | Prisma.HighlightCandidateWindowScalarWhereInput[];
};
export type HighlightCandidateWindowCreateNestedManyWithoutHighlightCandidateInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput> | Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyHighlightCandidateInputEnvelope;
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
};
export type HighlightCandidateWindowUncheckedCreateNestedManyWithoutHighlightCandidateInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput> | Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyHighlightCandidateInputEnvelope;
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
};
export type HighlightCandidateWindowUpdateManyWithoutHighlightCandidateNestedInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput> | Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput[];
    upsert?: Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutHighlightCandidateInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyHighlightCandidateInputEnvelope;
    set?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    disconnect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    delete?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    update?: Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutHighlightCandidateInput[];
    updateMany?: Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutHighlightCandidateInput[];
    deleteMany?: Prisma.HighlightCandidateWindowScalarWhereInput | Prisma.HighlightCandidateWindowScalarWhereInput[];
};
export type HighlightCandidateWindowUncheckedUpdateManyWithoutHighlightCandidateNestedInput = {
    create?: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput> | Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput[] | Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput[];
    connectOrCreate?: Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput[];
    upsert?: Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowUpsertWithWhereUniqueWithoutHighlightCandidateInput[];
    createMany?: Prisma.HighlightCandidateWindowCreateManyHighlightCandidateInputEnvelope;
    set?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    disconnect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    delete?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    connect?: Prisma.HighlightCandidateWindowWhereUniqueInput | Prisma.HighlightCandidateWindowWhereUniqueInput[];
    update?: Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowUpdateWithWhereUniqueWithoutHighlightCandidateInput[];
    updateMany?: Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutHighlightCandidateInput | Prisma.HighlightCandidateWindowUpdateManyWithWhereWithoutHighlightCandidateInput[];
    deleteMany?: Prisma.HighlightCandidateWindowScalarWhereInput | Prisma.HighlightCandidateWindowScalarWhereInput[];
};
export type HighlightCandidateWindowCreateWithoutAnalysisWindowInput = {
    position: number;
    highlightCandidate: Prisma.HighlightCandidateCreateNestedOneWithoutWindowsInput;
};
export type HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput = {
    highlightCandidateId: string;
    position: number;
};
export type HighlightCandidateWindowCreateOrConnectWithoutAnalysisWindowInput = {
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
    create: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput>;
};
export type HighlightCandidateWindowCreateManyAnalysisWindowInputEnvelope = {
    data: Prisma.HighlightCandidateWindowCreateManyAnalysisWindowInput | Prisma.HighlightCandidateWindowCreateManyAnalysisWindowInput[];
    skipDuplicates?: boolean;
};
export type HighlightCandidateWindowUpsertWithWhereUniqueWithoutAnalysisWindowInput = {
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
    update: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedUpdateWithoutAnalysisWindowInput>;
    create: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutAnalysisWindowInput>;
};
export type HighlightCandidateWindowUpdateWithWhereUniqueWithoutAnalysisWindowInput = {
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
    data: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateWithoutAnalysisWindowInput, Prisma.HighlightCandidateWindowUncheckedUpdateWithoutAnalysisWindowInput>;
};
export type HighlightCandidateWindowUpdateManyWithWhereWithoutAnalysisWindowInput = {
    where: Prisma.HighlightCandidateWindowScalarWhereInput;
    data: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateManyMutationInput, Prisma.HighlightCandidateWindowUncheckedUpdateManyWithoutAnalysisWindowInput>;
};
export type HighlightCandidateWindowScalarWhereInput = {
    AND?: Prisma.HighlightCandidateWindowScalarWhereInput | Prisma.HighlightCandidateWindowScalarWhereInput[];
    OR?: Prisma.HighlightCandidateWindowScalarWhereInput[];
    NOT?: Prisma.HighlightCandidateWindowScalarWhereInput | Prisma.HighlightCandidateWindowScalarWhereInput[];
    highlightCandidateId?: Prisma.StringFilter<"HighlightCandidateWindow"> | string;
    analysisWindowId?: Prisma.StringFilter<"HighlightCandidateWindow"> | string;
    position?: Prisma.IntFilter<"HighlightCandidateWindow"> | number;
};
export type HighlightCandidateWindowCreateWithoutHighlightCandidateInput = {
    position: number;
    analysisWindow: Prisma.AnalysisWindowCreateNestedOneWithoutHighlightLinksInput;
};
export type HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput = {
    analysisWindowId: string;
    position: number;
};
export type HighlightCandidateWindowCreateOrConnectWithoutHighlightCandidateInput = {
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
    create: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput>;
};
export type HighlightCandidateWindowCreateManyHighlightCandidateInputEnvelope = {
    data: Prisma.HighlightCandidateWindowCreateManyHighlightCandidateInput | Prisma.HighlightCandidateWindowCreateManyHighlightCandidateInput[];
    skipDuplicates?: boolean;
};
export type HighlightCandidateWindowUpsertWithWhereUniqueWithoutHighlightCandidateInput = {
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
    update: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedUpdateWithoutHighlightCandidateInput>;
    create: Prisma.XOR<Prisma.HighlightCandidateWindowCreateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedCreateWithoutHighlightCandidateInput>;
};
export type HighlightCandidateWindowUpdateWithWhereUniqueWithoutHighlightCandidateInput = {
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
    data: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateWithoutHighlightCandidateInput, Prisma.HighlightCandidateWindowUncheckedUpdateWithoutHighlightCandidateInput>;
};
export type HighlightCandidateWindowUpdateManyWithWhereWithoutHighlightCandidateInput = {
    where: Prisma.HighlightCandidateWindowScalarWhereInput;
    data: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateManyMutationInput, Prisma.HighlightCandidateWindowUncheckedUpdateManyWithoutHighlightCandidateInput>;
};
export type HighlightCandidateWindowCreateManyAnalysisWindowInput = {
    highlightCandidateId: string;
    position: number;
};
export type HighlightCandidateWindowUpdateWithoutAnalysisWindowInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    highlightCandidate?: Prisma.HighlightCandidateUpdateOneRequiredWithoutWindowsNestedInput;
};
export type HighlightCandidateWindowUncheckedUpdateWithoutAnalysisWindowInput = {
    highlightCandidateId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HighlightCandidateWindowUncheckedUpdateManyWithoutAnalysisWindowInput = {
    highlightCandidateId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HighlightCandidateWindowCreateManyHighlightCandidateInput = {
    analysisWindowId: string;
    position: number;
};
export type HighlightCandidateWindowUpdateWithoutHighlightCandidateInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    analysisWindow?: Prisma.AnalysisWindowUpdateOneRequiredWithoutHighlightLinksNestedInput;
};
export type HighlightCandidateWindowUncheckedUpdateWithoutHighlightCandidateInput = {
    analysisWindowId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HighlightCandidateWindowUncheckedUpdateManyWithoutHighlightCandidateInput = {
    analysisWindowId?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HighlightCandidateWindowSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    highlightCandidateId?: boolean;
    analysisWindowId?: boolean;
    position?: boolean;
    highlightCandidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["highlightCandidateWindow"]>;
export type HighlightCandidateWindowSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    highlightCandidateId?: boolean;
    analysisWindowId?: boolean;
    position?: boolean;
    highlightCandidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["highlightCandidateWindow"]>;
export type HighlightCandidateWindowSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    highlightCandidateId?: boolean;
    analysisWindowId?: boolean;
    position?: boolean;
    highlightCandidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["highlightCandidateWindow"]>;
export type HighlightCandidateWindowSelectScalar = {
    highlightCandidateId?: boolean;
    analysisWindowId?: boolean;
    position?: boolean;
};
export type HighlightCandidateWindowOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"highlightCandidateId" | "analysisWindowId" | "position", ExtArgs["result"]["highlightCandidateWindow"]>;
export type HighlightCandidateWindowInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    highlightCandidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
};
export type HighlightCandidateWindowIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    highlightCandidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
};
export type HighlightCandidateWindowIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    highlightCandidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
};
export type $HighlightCandidateWindowPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HighlightCandidateWindow";
    objects: {
        highlightCandidate: Prisma.$HighlightCandidatePayload<ExtArgs>;
        analysisWindow: Prisma.$AnalysisWindowPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        highlightCandidateId: string;
        analysisWindowId: string;
        position: number;
    }, ExtArgs["result"]["highlightCandidateWindow"]>;
    composites: {};
};
export type HighlightCandidateWindowGetPayload<S extends boolean | null | undefined | HighlightCandidateWindowDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload, S>;
export type HighlightCandidateWindowCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HighlightCandidateWindowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HighlightCandidateWindowCountAggregateInputType | true;
};
export interface HighlightCandidateWindowDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HighlightCandidateWindow'];
        meta: {
            name: 'HighlightCandidateWindow';
        };
    };
    findUnique<T extends HighlightCandidateWindowFindUniqueArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HighlightCandidateWindowFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HighlightCandidateWindowFindFirstArgs>(args?: Prisma.SelectSubset<T, HighlightCandidateWindowFindFirstArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HighlightCandidateWindowFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HighlightCandidateWindowFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HighlightCandidateWindowFindManyArgs>(args?: Prisma.SelectSubset<T, HighlightCandidateWindowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HighlightCandidateWindowCreateArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowCreateArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HighlightCandidateWindowCreateManyArgs>(args?: Prisma.SelectSubset<T, HighlightCandidateWindowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HighlightCandidateWindowCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HighlightCandidateWindowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HighlightCandidateWindowDeleteArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowDeleteArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HighlightCandidateWindowUpdateArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowUpdateArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HighlightCandidateWindowDeleteManyArgs>(args?: Prisma.SelectSubset<T, HighlightCandidateWindowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HighlightCandidateWindowUpdateManyArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HighlightCandidateWindowUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HighlightCandidateWindowUpsertArgs>(args: Prisma.SelectSubset<T, HighlightCandidateWindowUpsertArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateWindowClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidateWindowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HighlightCandidateWindowCountArgs>(args?: Prisma.Subset<T, HighlightCandidateWindowCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HighlightCandidateWindowCountAggregateOutputType> : number>;
    aggregate<T extends HighlightCandidateWindowAggregateArgs>(args: Prisma.Subset<T, HighlightCandidateWindowAggregateArgs>): Prisma.PrismaPromise<GetHighlightCandidateWindowAggregateType<T>>;
    groupBy<T extends HighlightCandidateWindowGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HighlightCandidateWindowGroupByArgs['orderBy'];
    } : {
        orderBy?: HighlightCandidateWindowGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HighlightCandidateWindowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHighlightCandidateWindowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HighlightCandidateWindowFieldRefs;
}
export interface Prisma__HighlightCandidateWindowClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    highlightCandidate<T extends Prisma.HighlightCandidateDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HighlightCandidateDefaultArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    analysisWindow<T extends Prisma.AnalysisWindowDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AnalysisWindowDefaultArgs<ExtArgs>>): Prisma.Prisma__AnalysisWindowClient<runtime.Types.Result.GetResult<Prisma.$AnalysisWindowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HighlightCandidateWindowFieldRefs {
    readonly highlightCandidateId: Prisma.FieldRef<"HighlightCandidateWindow", 'String'>;
    readonly analysisWindowId: Prisma.FieldRef<"HighlightCandidateWindow", 'String'>;
    readonly position: Prisma.FieldRef<"HighlightCandidateWindow", 'Int'>;
}
export type HighlightCandidateWindowFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
};
export type HighlightCandidateWindowFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
};
export type HighlightCandidateWindowFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    where?: Prisma.HighlightCandidateWindowWhereInput;
    orderBy?: Prisma.HighlightCandidateWindowOrderByWithRelationInput | Prisma.HighlightCandidateWindowOrderByWithRelationInput[];
    cursor?: Prisma.HighlightCandidateWindowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HighlightCandidateWindowScalarFieldEnum | Prisma.HighlightCandidateWindowScalarFieldEnum[];
};
export type HighlightCandidateWindowFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    where?: Prisma.HighlightCandidateWindowWhereInput;
    orderBy?: Prisma.HighlightCandidateWindowOrderByWithRelationInput | Prisma.HighlightCandidateWindowOrderByWithRelationInput[];
    cursor?: Prisma.HighlightCandidateWindowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HighlightCandidateWindowScalarFieldEnum | Prisma.HighlightCandidateWindowScalarFieldEnum[];
};
export type HighlightCandidateWindowFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    where?: Prisma.HighlightCandidateWindowWhereInput;
    orderBy?: Prisma.HighlightCandidateWindowOrderByWithRelationInput | Prisma.HighlightCandidateWindowOrderByWithRelationInput[];
    cursor?: Prisma.HighlightCandidateWindowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HighlightCandidateWindowScalarFieldEnum | Prisma.HighlightCandidateWindowScalarFieldEnum[];
};
export type HighlightCandidateWindowCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HighlightCandidateWindowCreateInput, Prisma.HighlightCandidateWindowUncheckedCreateInput>;
};
export type HighlightCandidateWindowCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HighlightCandidateWindowCreateManyInput | Prisma.HighlightCandidateWindowCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HighlightCandidateWindowCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    data: Prisma.HighlightCandidateWindowCreateManyInput | Prisma.HighlightCandidateWindowCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HighlightCandidateWindowIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HighlightCandidateWindowUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateInput, Prisma.HighlightCandidateWindowUncheckedUpdateInput>;
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
};
export type HighlightCandidateWindowUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateManyMutationInput, Prisma.HighlightCandidateWindowUncheckedUpdateManyInput>;
    where?: Prisma.HighlightCandidateWindowWhereInput;
    limit?: number;
};
export type HighlightCandidateWindowUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateManyMutationInput, Prisma.HighlightCandidateWindowUncheckedUpdateManyInput>;
    where?: Prisma.HighlightCandidateWindowWhereInput;
    limit?: number;
    include?: Prisma.HighlightCandidateWindowIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HighlightCandidateWindowUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
    create: Prisma.XOR<Prisma.HighlightCandidateWindowCreateInput, Prisma.HighlightCandidateWindowUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HighlightCandidateWindowUpdateInput, Prisma.HighlightCandidateWindowUncheckedUpdateInput>;
};
export type HighlightCandidateWindowDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
    where: Prisma.HighlightCandidateWindowWhereUniqueInput;
};
export type HighlightCandidateWindowDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HighlightCandidateWindowWhereInput;
    limit?: number;
};
export type HighlightCandidateWindowDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateWindowSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateWindowOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateWindowInclude<ExtArgs> | null;
};
