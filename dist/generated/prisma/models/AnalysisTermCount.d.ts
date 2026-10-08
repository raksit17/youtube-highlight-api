import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AnalysisTermCountModel = runtime.Types.Result.DefaultSelection<Prisma.$AnalysisTermCountPayload>;
export type AggregateAnalysisTermCount = {
    _count: AnalysisTermCountCountAggregateOutputType | null;
    _avg: AnalysisTermCountAvgAggregateOutputType | null;
    _sum: AnalysisTermCountSumAggregateOutputType | null;
    _min: AnalysisTermCountMinAggregateOutputType | null;
    _max: AnalysisTermCountMaxAggregateOutputType | null;
};
export type AnalysisTermCountAvgAggregateOutputType = {
    count: number | null;
    score: number | null;
};
export type AnalysisTermCountSumAggregateOutputType = {
    count: number | null;
    score: number | null;
};
export type AnalysisTermCountMinAggregateOutputType = {
    id: string | null;
    analysisWindowId: string | null;
    source: $Enums.AnalysisTermSource | null;
    type: $Enums.AnalysisTermType | null;
    term: string | null;
    normalizedTerm: string | null;
    count: number | null;
    score: number | null;
    createdAt: Date | null;
};
export type AnalysisTermCountMaxAggregateOutputType = {
    id: string | null;
    analysisWindowId: string | null;
    source: $Enums.AnalysisTermSource | null;
    type: $Enums.AnalysisTermType | null;
    term: string | null;
    normalizedTerm: string | null;
    count: number | null;
    score: number | null;
    createdAt: Date | null;
};
export type AnalysisTermCountCountAggregateOutputType = {
    id: number;
    analysisWindowId: number;
    source: number;
    type: number;
    term: number;
    normalizedTerm: number;
    count: number;
    score: number;
    createdAt: number;
    _all: number;
};
export type AnalysisTermCountAvgAggregateInputType = {
    count?: true;
    score?: true;
};
export type AnalysisTermCountSumAggregateInputType = {
    count?: true;
    score?: true;
};
export type AnalysisTermCountMinAggregateInputType = {
    id?: true;
    analysisWindowId?: true;
    source?: true;
    type?: true;
    term?: true;
    normalizedTerm?: true;
    count?: true;
    score?: true;
    createdAt?: true;
};
export type AnalysisTermCountMaxAggregateInputType = {
    id?: true;
    analysisWindowId?: true;
    source?: true;
    type?: true;
    term?: true;
    normalizedTerm?: true;
    count?: true;
    score?: true;
    createdAt?: true;
};
export type AnalysisTermCountCountAggregateInputType = {
    id?: true;
    analysisWindowId?: true;
    source?: true;
    type?: true;
    term?: true;
    normalizedTerm?: true;
    count?: true;
    score?: true;
    createdAt?: true;
    _all?: true;
};
export type AnalysisTermCountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisTermCountWhereInput;
    orderBy?: Prisma.AnalysisTermCountOrderByWithRelationInput | Prisma.AnalysisTermCountOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisTermCountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AnalysisTermCountCountAggregateInputType;
    _avg?: AnalysisTermCountAvgAggregateInputType;
    _sum?: AnalysisTermCountSumAggregateInputType;
    _min?: AnalysisTermCountMinAggregateInputType;
    _max?: AnalysisTermCountMaxAggregateInputType;
};
export type GetAnalysisTermCountAggregateType<T extends AnalysisTermCountAggregateArgs> = {
    [P in keyof T & keyof AggregateAnalysisTermCount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAnalysisTermCount[P]> : Prisma.GetScalarType<T[P], AggregateAnalysisTermCount[P]>;
};
export type AnalysisTermCountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisTermCountWhereInput;
    orderBy?: Prisma.AnalysisTermCountOrderByWithAggregationInput | Prisma.AnalysisTermCountOrderByWithAggregationInput[];
    by: Prisma.AnalysisTermCountScalarFieldEnum[] | Prisma.AnalysisTermCountScalarFieldEnum;
    having?: Prisma.AnalysisTermCountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AnalysisTermCountCountAggregateInputType | true;
    _avg?: AnalysisTermCountAvgAggregateInputType;
    _sum?: AnalysisTermCountSumAggregateInputType;
    _min?: AnalysisTermCountMinAggregateInputType;
    _max?: AnalysisTermCountMaxAggregateInputType;
};
export type AnalysisTermCountGroupByOutputType = {
    id: string;
    analysisWindowId: string;
    source: $Enums.AnalysisTermSource;
    type: $Enums.AnalysisTermType;
    term: string;
    normalizedTerm: string;
    count: number;
    score: number;
    createdAt: Date;
    _count: AnalysisTermCountCountAggregateOutputType | null;
    _avg: AnalysisTermCountAvgAggregateOutputType | null;
    _sum: AnalysisTermCountSumAggregateOutputType | null;
    _min: AnalysisTermCountMinAggregateOutputType | null;
    _max: AnalysisTermCountMaxAggregateOutputType | null;
};
export type GetAnalysisTermCountGroupByPayload<T extends AnalysisTermCountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AnalysisTermCountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AnalysisTermCountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AnalysisTermCountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AnalysisTermCountGroupByOutputType[P]>;
}>>;
export type AnalysisTermCountWhereInput = {
    AND?: Prisma.AnalysisTermCountWhereInput | Prisma.AnalysisTermCountWhereInput[];
    OR?: Prisma.AnalysisTermCountWhereInput[];
    NOT?: Prisma.AnalysisTermCountWhereInput | Prisma.AnalysisTermCountWhereInput[];
    id?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    analysisWindowId?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    source?: Prisma.EnumAnalysisTermSourceFilter<"AnalysisTermCount"> | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFilter<"AnalysisTermCount"> | $Enums.AnalysisTermType;
    term?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    normalizedTerm?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    count?: Prisma.IntFilter<"AnalysisTermCount"> | number;
    score?: Prisma.FloatFilter<"AnalysisTermCount"> | number;
    createdAt?: Prisma.DateTimeFilter<"AnalysisTermCount"> | Date | string;
    analysisWindow?: Prisma.XOR<Prisma.AnalysisWindowScalarRelationFilter, Prisma.AnalysisWindowWhereInput>;
};
export type AnalysisTermCountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    term?: Prisma.SortOrder;
    normalizedTerm?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    analysisWindow?: Prisma.AnalysisWindowOrderByWithRelationInput;
};
export type AnalysisTermCountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    analysisWindowId_source_type_normalizedTerm?: Prisma.AnalysisTermCountAnalysisWindowIdSourceTypeNormalizedTermCompoundUniqueInput;
    AND?: Prisma.AnalysisTermCountWhereInput | Prisma.AnalysisTermCountWhereInput[];
    OR?: Prisma.AnalysisTermCountWhereInput[];
    NOT?: Prisma.AnalysisTermCountWhereInput | Prisma.AnalysisTermCountWhereInput[];
    analysisWindowId?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    source?: Prisma.EnumAnalysisTermSourceFilter<"AnalysisTermCount"> | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFilter<"AnalysisTermCount"> | $Enums.AnalysisTermType;
    term?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    normalizedTerm?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    count?: Prisma.IntFilter<"AnalysisTermCount"> | number;
    score?: Prisma.FloatFilter<"AnalysisTermCount"> | number;
    createdAt?: Prisma.DateTimeFilter<"AnalysisTermCount"> | Date | string;
    analysisWindow?: Prisma.XOR<Prisma.AnalysisWindowScalarRelationFilter, Prisma.AnalysisWindowWhereInput>;
}, "id" | "analysisWindowId_source_type_normalizedTerm">;
export type AnalysisTermCountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    term?: Prisma.SortOrder;
    normalizedTerm?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AnalysisTermCountCountOrderByAggregateInput;
    _avg?: Prisma.AnalysisTermCountAvgOrderByAggregateInput;
    _max?: Prisma.AnalysisTermCountMaxOrderByAggregateInput;
    _min?: Prisma.AnalysisTermCountMinOrderByAggregateInput;
    _sum?: Prisma.AnalysisTermCountSumOrderByAggregateInput;
};
export type AnalysisTermCountScalarWhereWithAggregatesInput = {
    AND?: Prisma.AnalysisTermCountScalarWhereWithAggregatesInput | Prisma.AnalysisTermCountScalarWhereWithAggregatesInput[];
    OR?: Prisma.AnalysisTermCountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AnalysisTermCountScalarWhereWithAggregatesInput | Prisma.AnalysisTermCountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AnalysisTermCount"> | string;
    analysisWindowId?: Prisma.StringWithAggregatesFilter<"AnalysisTermCount"> | string;
    source?: Prisma.EnumAnalysisTermSourceWithAggregatesFilter<"AnalysisTermCount"> | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeWithAggregatesFilter<"AnalysisTermCount"> | $Enums.AnalysisTermType;
    term?: Prisma.StringWithAggregatesFilter<"AnalysisTermCount"> | string;
    normalizedTerm?: Prisma.StringWithAggregatesFilter<"AnalysisTermCount"> | string;
    count?: Prisma.IntWithAggregatesFilter<"AnalysisTermCount"> | number;
    score?: Prisma.FloatWithAggregatesFilter<"AnalysisTermCount"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AnalysisTermCount"> | Date | string;
};
export type AnalysisTermCountCreateInput = {
    id?: string;
    source: $Enums.AnalysisTermSource;
    type?: $Enums.AnalysisTermType;
    term: string;
    normalizedTerm: string;
    count: number;
    score?: number;
    createdAt?: Date | string;
    analysisWindow: Prisma.AnalysisWindowCreateNestedOneWithoutTermsInput;
};
export type AnalysisTermCountUncheckedCreateInput = {
    id?: string;
    analysisWindowId: string;
    source: $Enums.AnalysisTermSource;
    type?: $Enums.AnalysisTermType;
    term: string;
    normalizedTerm: string;
    count: number;
    score?: number;
    createdAt?: Date | string;
};
export type AnalysisTermCountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.EnumAnalysisTermSourceFieldUpdateOperationsInput | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFieldUpdateOperationsInput | $Enums.AnalysisTermType;
    term?: Prisma.StringFieldUpdateOperationsInput | string;
    normalizedTerm?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    analysisWindow?: Prisma.AnalysisWindowUpdateOneRequiredWithoutTermsNestedInput;
};
export type AnalysisTermCountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    analysisWindowId?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.EnumAnalysisTermSourceFieldUpdateOperationsInput | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFieldUpdateOperationsInput | $Enums.AnalysisTermType;
    term?: Prisma.StringFieldUpdateOperationsInput | string;
    normalizedTerm?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisTermCountCreateManyInput = {
    id?: string;
    analysisWindowId: string;
    source: $Enums.AnalysisTermSource;
    type?: $Enums.AnalysisTermType;
    term: string;
    normalizedTerm: string;
    count: number;
    score?: number;
    createdAt?: Date | string;
};
export type AnalysisTermCountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.EnumAnalysisTermSourceFieldUpdateOperationsInput | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFieldUpdateOperationsInput | $Enums.AnalysisTermType;
    term?: Prisma.StringFieldUpdateOperationsInput | string;
    normalizedTerm?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisTermCountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    analysisWindowId?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.EnumAnalysisTermSourceFieldUpdateOperationsInput | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFieldUpdateOperationsInput | $Enums.AnalysisTermType;
    term?: Prisma.StringFieldUpdateOperationsInput | string;
    normalizedTerm?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisTermCountListRelationFilter = {
    every?: Prisma.AnalysisTermCountWhereInput;
    some?: Prisma.AnalysisTermCountWhereInput;
    none?: Prisma.AnalysisTermCountWhereInput;
};
export type AnalysisTermCountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AnalysisTermCountAnalysisWindowIdSourceTypeNormalizedTermCompoundUniqueInput = {
    analysisWindowId: string;
    source: $Enums.AnalysisTermSource;
    type: $Enums.AnalysisTermType;
    normalizedTerm: string;
};
export type AnalysisTermCountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    term?: Prisma.SortOrder;
    normalizedTerm?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnalysisTermCountAvgOrderByAggregateInput = {
    count?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type AnalysisTermCountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    term?: Prisma.SortOrder;
    normalizedTerm?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnalysisTermCountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    analysisWindowId?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    term?: Prisma.SortOrder;
    normalizedTerm?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnalysisTermCountSumOrderByAggregateInput = {
    count?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
};
export type AnalysisTermCountCreateNestedManyWithoutAnalysisWindowInput = {
    create?: Prisma.XOR<Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput> | Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput[] | Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput | Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput[];
    createMany?: Prisma.AnalysisTermCountCreateManyAnalysisWindowInputEnvelope;
    connect?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
};
export type AnalysisTermCountUncheckedCreateNestedManyWithoutAnalysisWindowInput = {
    create?: Prisma.XOR<Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput> | Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput[] | Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput | Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput[];
    createMany?: Prisma.AnalysisTermCountCreateManyAnalysisWindowInputEnvelope;
    connect?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
};
export type AnalysisTermCountUpdateManyWithoutAnalysisWindowNestedInput = {
    create?: Prisma.XOR<Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput> | Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput[] | Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput | Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput[];
    upsert?: Prisma.AnalysisTermCountUpsertWithWhereUniqueWithoutAnalysisWindowInput | Prisma.AnalysisTermCountUpsertWithWhereUniqueWithoutAnalysisWindowInput[];
    createMany?: Prisma.AnalysisTermCountCreateManyAnalysisWindowInputEnvelope;
    set?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    disconnect?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    delete?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    connect?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    update?: Prisma.AnalysisTermCountUpdateWithWhereUniqueWithoutAnalysisWindowInput | Prisma.AnalysisTermCountUpdateWithWhereUniqueWithoutAnalysisWindowInput[];
    updateMany?: Prisma.AnalysisTermCountUpdateManyWithWhereWithoutAnalysisWindowInput | Prisma.AnalysisTermCountUpdateManyWithWhereWithoutAnalysisWindowInput[];
    deleteMany?: Prisma.AnalysisTermCountScalarWhereInput | Prisma.AnalysisTermCountScalarWhereInput[];
};
export type AnalysisTermCountUncheckedUpdateManyWithoutAnalysisWindowNestedInput = {
    create?: Prisma.XOR<Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput> | Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput[] | Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput[];
    connectOrCreate?: Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput | Prisma.AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput[];
    upsert?: Prisma.AnalysisTermCountUpsertWithWhereUniqueWithoutAnalysisWindowInput | Prisma.AnalysisTermCountUpsertWithWhereUniqueWithoutAnalysisWindowInput[];
    createMany?: Prisma.AnalysisTermCountCreateManyAnalysisWindowInputEnvelope;
    set?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    disconnect?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    delete?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    connect?: Prisma.AnalysisTermCountWhereUniqueInput | Prisma.AnalysisTermCountWhereUniqueInput[];
    update?: Prisma.AnalysisTermCountUpdateWithWhereUniqueWithoutAnalysisWindowInput | Prisma.AnalysisTermCountUpdateWithWhereUniqueWithoutAnalysisWindowInput[];
    updateMany?: Prisma.AnalysisTermCountUpdateManyWithWhereWithoutAnalysisWindowInput | Prisma.AnalysisTermCountUpdateManyWithWhereWithoutAnalysisWindowInput[];
    deleteMany?: Prisma.AnalysisTermCountScalarWhereInput | Prisma.AnalysisTermCountScalarWhereInput[];
};
export type EnumAnalysisTermSourceFieldUpdateOperationsInput = {
    set?: $Enums.AnalysisTermSource;
};
export type EnumAnalysisTermTypeFieldUpdateOperationsInput = {
    set?: $Enums.AnalysisTermType;
};
export type AnalysisTermCountCreateWithoutAnalysisWindowInput = {
    id?: string;
    source: $Enums.AnalysisTermSource;
    type?: $Enums.AnalysisTermType;
    term: string;
    normalizedTerm: string;
    count: number;
    score?: number;
    createdAt?: Date | string;
};
export type AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput = {
    id?: string;
    source: $Enums.AnalysisTermSource;
    type?: $Enums.AnalysisTermType;
    term: string;
    normalizedTerm: string;
    count: number;
    score?: number;
    createdAt?: Date | string;
};
export type AnalysisTermCountCreateOrConnectWithoutAnalysisWindowInput = {
    where: Prisma.AnalysisTermCountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput>;
};
export type AnalysisTermCountCreateManyAnalysisWindowInputEnvelope = {
    data: Prisma.AnalysisTermCountCreateManyAnalysisWindowInput | Prisma.AnalysisTermCountCreateManyAnalysisWindowInput[];
    skipDuplicates?: boolean;
};
export type AnalysisTermCountUpsertWithWhereUniqueWithoutAnalysisWindowInput = {
    where: Prisma.AnalysisTermCountWhereUniqueInput;
    update: Prisma.XOR<Prisma.AnalysisTermCountUpdateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedUpdateWithoutAnalysisWindowInput>;
    create: Prisma.XOR<Prisma.AnalysisTermCountCreateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedCreateWithoutAnalysisWindowInput>;
};
export type AnalysisTermCountUpdateWithWhereUniqueWithoutAnalysisWindowInput = {
    where: Prisma.AnalysisTermCountWhereUniqueInput;
    data: Prisma.XOR<Prisma.AnalysisTermCountUpdateWithoutAnalysisWindowInput, Prisma.AnalysisTermCountUncheckedUpdateWithoutAnalysisWindowInput>;
};
export type AnalysisTermCountUpdateManyWithWhereWithoutAnalysisWindowInput = {
    where: Prisma.AnalysisTermCountScalarWhereInput;
    data: Prisma.XOR<Prisma.AnalysisTermCountUpdateManyMutationInput, Prisma.AnalysisTermCountUncheckedUpdateManyWithoutAnalysisWindowInput>;
};
export type AnalysisTermCountScalarWhereInput = {
    AND?: Prisma.AnalysisTermCountScalarWhereInput | Prisma.AnalysisTermCountScalarWhereInput[];
    OR?: Prisma.AnalysisTermCountScalarWhereInput[];
    NOT?: Prisma.AnalysisTermCountScalarWhereInput | Prisma.AnalysisTermCountScalarWhereInput[];
    id?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    analysisWindowId?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    source?: Prisma.EnumAnalysisTermSourceFilter<"AnalysisTermCount"> | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFilter<"AnalysisTermCount"> | $Enums.AnalysisTermType;
    term?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    normalizedTerm?: Prisma.StringFilter<"AnalysisTermCount"> | string;
    count?: Prisma.IntFilter<"AnalysisTermCount"> | number;
    score?: Prisma.FloatFilter<"AnalysisTermCount"> | number;
    createdAt?: Prisma.DateTimeFilter<"AnalysisTermCount"> | Date | string;
};
export type AnalysisTermCountCreateManyAnalysisWindowInput = {
    id?: string;
    source: $Enums.AnalysisTermSource;
    type?: $Enums.AnalysisTermType;
    term: string;
    normalizedTerm: string;
    count: number;
    score?: number;
    createdAt?: Date | string;
};
export type AnalysisTermCountUpdateWithoutAnalysisWindowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.EnumAnalysisTermSourceFieldUpdateOperationsInput | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFieldUpdateOperationsInput | $Enums.AnalysisTermType;
    term?: Prisma.StringFieldUpdateOperationsInput | string;
    normalizedTerm?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisTermCountUncheckedUpdateWithoutAnalysisWindowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.EnumAnalysisTermSourceFieldUpdateOperationsInput | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFieldUpdateOperationsInput | $Enums.AnalysisTermType;
    term?: Prisma.StringFieldUpdateOperationsInput | string;
    normalizedTerm?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisTermCountUncheckedUpdateManyWithoutAnalysisWindowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    source?: Prisma.EnumAnalysisTermSourceFieldUpdateOperationsInput | $Enums.AnalysisTermSource;
    type?: Prisma.EnumAnalysisTermTypeFieldUpdateOperationsInput | $Enums.AnalysisTermType;
    term?: Prisma.StringFieldUpdateOperationsInput | string;
    normalizedTerm?: Prisma.StringFieldUpdateOperationsInput | string;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    score?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisTermCountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    analysisWindowId?: boolean;
    source?: boolean;
    type?: boolean;
    term?: boolean;
    normalizedTerm?: boolean;
    count?: boolean;
    score?: boolean;
    createdAt?: boolean;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["analysisTermCount"]>;
export type AnalysisTermCountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    analysisWindowId?: boolean;
    source?: boolean;
    type?: boolean;
    term?: boolean;
    normalizedTerm?: boolean;
    count?: boolean;
    score?: boolean;
    createdAt?: boolean;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["analysisTermCount"]>;
export type AnalysisTermCountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    analysisWindowId?: boolean;
    source?: boolean;
    type?: boolean;
    term?: boolean;
    normalizedTerm?: boolean;
    count?: boolean;
    score?: boolean;
    createdAt?: boolean;
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["analysisTermCount"]>;
export type AnalysisTermCountSelectScalar = {
    id?: boolean;
    analysisWindowId?: boolean;
    source?: boolean;
    type?: boolean;
    term?: boolean;
    normalizedTerm?: boolean;
    count?: boolean;
    score?: boolean;
    createdAt?: boolean;
};
export type AnalysisTermCountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "analysisWindowId" | "source" | "type" | "term" | "normalizedTerm" | "count" | "score" | "createdAt", ExtArgs["result"]["analysisTermCount"]>;
export type AnalysisTermCountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
};
export type AnalysisTermCountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
};
export type AnalysisTermCountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analysisWindow?: boolean | Prisma.AnalysisWindowDefaultArgs<ExtArgs>;
};
export type $AnalysisTermCountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AnalysisTermCount";
    objects: {
        analysisWindow: Prisma.$AnalysisWindowPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        analysisWindowId: string;
        source: $Enums.AnalysisTermSource;
        type: $Enums.AnalysisTermType;
        term: string;
        normalizedTerm: string;
        count: number;
        score: number;
        createdAt: Date;
    }, ExtArgs["result"]["analysisTermCount"]>;
    composites: {};
};
export type AnalysisTermCountGetPayload<S extends boolean | null | undefined | AnalysisTermCountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload, S>;
export type AnalysisTermCountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AnalysisTermCountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AnalysisTermCountCountAggregateInputType | true;
};
export interface AnalysisTermCountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AnalysisTermCount'];
        meta: {
            name: 'AnalysisTermCount';
        };
    };
    findUnique<T extends AnalysisTermCountFindUniqueArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AnalysisTermCountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AnalysisTermCountFindFirstArgs>(args?: Prisma.SelectSubset<T, AnalysisTermCountFindFirstArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AnalysisTermCountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AnalysisTermCountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AnalysisTermCountFindManyArgs>(args?: Prisma.SelectSubset<T, AnalysisTermCountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AnalysisTermCountCreateArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountCreateArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AnalysisTermCountCreateManyArgs>(args?: Prisma.SelectSubset<T, AnalysisTermCountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AnalysisTermCountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AnalysisTermCountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AnalysisTermCountDeleteArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountDeleteArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AnalysisTermCountUpdateArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountUpdateArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AnalysisTermCountDeleteManyArgs>(args?: Prisma.SelectSubset<T, AnalysisTermCountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AnalysisTermCountUpdateManyArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AnalysisTermCountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AnalysisTermCountUpsertArgs>(args: Prisma.SelectSubset<T, AnalysisTermCountUpsertArgs<ExtArgs>>): Prisma.Prisma__AnalysisTermCountClient<runtime.Types.Result.GetResult<Prisma.$AnalysisTermCountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AnalysisTermCountCountArgs>(args?: Prisma.Subset<T, AnalysisTermCountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AnalysisTermCountCountAggregateOutputType> : number>;
    aggregate<T extends AnalysisTermCountAggregateArgs>(args: Prisma.Subset<T, AnalysisTermCountAggregateArgs>): Prisma.PrismaPromise<GetAnalysisTermCountAggregateType<T>>;
    groupBy<T extends AnalysisTermCountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AnalysisTermCountGroupByArgs['orderBy'];
    } : {
        orderBy?: AnalysisTermCountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AnalysisTermCountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisTermCountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AnalysisTermCountFieldRefs;
}
export interface Prisma__AnalysisTermCountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    analysisWindow<T extends Prisma.AnalysisWindowDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AnalysisWindowDefaultArgs<ExtArgs>>): Prisma.Prisma__AnalysisWindowClient<runtime.Types.Result.GetResult<Prisma.$AnalysisWindowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AnalysisTermCountFieldRefs {
    readonly id: Prisma.FieldRef<"AnalysisTermCount", 'String'>;
    readonly analysisWindowId: Prisma.FieldRef<"AnalysisTermCount", 'String'>;
    readonly source: Prisma.FieldRef<"AnalysisTermCount", 'AnalysisTermSource'>;
    readonly type: Prisma.FieldRef<"AnalysisTermCount", 'AnalysisTermType'>;
    readonly term: Prisma.FieldRef<"AnalysisTermCount", 'String'>;
    readonly normalizedTerm: Prisma.FieldRef<"AnalysisTermCount", 'String'>;
    readonly count: Prisma.FieldRef<"AnalysisTermCount", 'Int'>;
    readonly score: Prisma.FieldRef<"AnalysisTermCount", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"AnalysisTermCount", 'DateTime'>;
}
export type AnalysisTermCountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    where: Prisma.AnalysisTermCountWhereUniqueInput;
};
export type AnalysisTermCountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    where: Prisma.AnalysisTermCountWhereUniqueInput;
};
export type AnalysisTermCountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    where?: Prisma.AnalysisTermCountWhereInput;
    orderBy?: Prisma.AnalysisTermCountOrderByWithRelationInput | Prisma.AnalysisTermCountOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisTermCountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisTermCountScalarFieldEnum | Prisma.AnalysisTermCountScalarFieldEnum[];
};
export type AnalysisTermCountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    where?: Prisma.AnalysisTermCountWhereInput;
    orderBy?: Prisma.AnalysisTermCountOrderByWithRelationInput | Prisma.AnalysisTermCountOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisTermCountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisTermCountScalarFieldEnum | Prisma.AnalysisTermCountScalarFieldEnum[];
};
export type AnalysisTermCountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    where?: Prisma.AnalysisTermCountWhereInput;
    orderBy?: Prisma.AnalysisTermCountOrderByWithRelationInput | Prisma.AnalysisTermCountOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisTermCountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisTermCountScalarFieldEnum | Prisma.AnalysisTermCountScalarFieldEnum[];
};
export type AnalysisTermCountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisTermCountCreateInput, Prisma.AnalysisTermCountUncheckedCreateInput>;
};
export type AnalysisTermCountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AnalysisTermCountCreateManyInput | Prisma.AnalysisTermCountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AnalysisTermCountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    data: Prisma.AnalysisTermCountCreateManyInput | Prisma.AnalysisTermCountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AnalysisTermCountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AnalysisTermCountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisTermCountUpdateInput, Prisma.AnalysisTermCountUncheckedUpdateInput>;
    where: Prisma.AnalysisTermCountWhereUniqueInput;
};
export type AnalysisTermCountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AnalysisTermCountUpdateManyMutationInput, Prisma.AnalysisTermCountUncheckedUpdateManyInput>;
    where?: Prisma.AnalysisTermCountWhereInput;
    limit?: number;
};
export type AnalysisTermCountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisTermCountUpdateManyMutationInput, Prisma.AnalysisTermCountUncheckedUpdateManyInput>;
    where?: Prisma.AnalysisTermCountWhereInput;
    limit?: number;
    include?: Prisma.AnalysisTermCountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AnalysisTermCountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    where: Prisma.AnalysisTermCountWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnalysisTermCountCreateInput, Prisma.AnalysisTermCountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AnalysisTermCountUpdateInput, Prisma.AnalysisTermCountUncheckedUpdateInput>;
};
export type AnalysisTermCountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
    where: Prisma.AnalysisTermCountWhereUniqueInput;
};
export type AnalysisTermCountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisTermCountWhereInput;
    limit?: number;
};
export type AnalysisTermCountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisTermCountSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisTermCountOmit<ExtArgs> | null;
    include?: Prisma.AnalysisTermCountInclude<ExtArgs> | null;
};
