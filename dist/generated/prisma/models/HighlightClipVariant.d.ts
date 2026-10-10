import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HighlightClipVariantModel = runtime.Types.Result.DefaultSelection<Prisma.$HighlightClipVariantPayload>;
export type AggregateHighlightClipVariant = {
    _count: HighlightClipVariantCountAggregateOutputType | null;
    _avg: HighlightClipVariantAvgAggregateOutputType | null;
    _sum: HighlightClipVariantSumAggregateOutputType | null;
    _min: HighlightClipVariantMinAggregateOutputType | null;
    _max: HighlightClipVariantMaxAggregateOutputType | null;
};
export type HighlightClipVariantAvgAggregateOutputType = {
    startMs: number | null;
    endMs: number | null;
    durationMs: number | null;
};
export type HighlightClipVariantSumAggregateOutputType = {
    startMs: number | null;
    endMs: number | null;
    durationMs: number | null;
};
export type HighlightClipVariantMinAggregateOutputType = {
    id: string | null;
    candidateId: string | null;
    preset: $Enums.HighlightLengthPreset | null;
    startMs: number | null;
    endMs: number | null;
    durationMs: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HighlightClipVariantMaxAggregateOutputType = {
    id: string | null;
    candidateId: string | null;
    preset: $Enums.HighlightLengthPreset | null;
    startMs: number | null;
    endMs: number | null;
    durationMs: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HighlightClipVariantCountAggregateOutputType = {
    id: number;
    candidateId: number;
    preset: number;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type HighlightClipVariantAvgAggregateInputType = {
    startMs?: true;
    endMs?: true;
    durationMs?: true;
};
export type HighlightClipVariantSumAggregateInputType = {
    startMs?: true;
    endMs?: true;
    durationMs?: true;
};
export type HighlightClipVariantMinAggregateInputType = {
    id?: true;
    candidateId?: true;
    preset?: true;
    startMs?: true;
    endMs?: true;
    durationMs?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HighlightClipVariantMaxAggregateInputType = {
    id?: true;
    candidateId?: true;
    preset?: true;
    startMs?: true;
    endMs?: true;
    durationMs?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HighlightClipVariantCountAggregateInputType = {
    id?: true;
    candidateId?: true;
    preset?: true;
    startMs?: true;
    endMs?: true;
    durationMs?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type HighlightClipVariantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HighlightClipVariantWhereInput;
    orderBy?: Prisma.HighlightClipVariantOrderByWithRelationInput | Prisma.HighlightClipVariantOrderByWithRelationInput[];
    cursor?: Prisma.HighlightClipVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HighlightClipVariantCountAggregateInputType;
    _avg?: HighlightClipVariantAvgAggregateInputType;
    _sum?: HighlightClipVariantSumAggregateInputType;
    _min?: HighlightClipVariantMinAggregateInputType;
    _max?: HighlightClipVariantMaxAggregateInputType;
};
export type GetHighlightClipVariantAggregateType<T extends HighlightClipVariantAggregateArgs> = {
    [P in keyof T & keyof AggregateHighlightClipVariant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHighlightClipVariant[P]> : Prisma.GetScalarType<T[P], AggregateHighlightClipVariant[P]>;
};
export type HighlightClipVariantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HighlightClipVariantWhereInput;
    orderBy?: Prisma.HighlightClipVariantOrderByWithAggregationInput | Prisma.HighlightClipVariantOrderByWithAggregationInput[];
    by: Prisma.HighlightClipVariantScalarFieldEnum[] | Prisma.HighlightClipVariantScalarFieldEnum;
    having?: Prisma.HighlightClipVariantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HighlightClipVariantCountAggregateInputType | true;
    _avg?: HighlightClipVariantAvgAggregateInputType;
    _sum?: HighlightClipVariantSumAggregateInputType;
    _min?: HighlightClipVariantMinAggregateInputType;
    _max?: HighlightClipVariantMaxAggregateInputType;
};
export type HighlightClipVariantGroupByOutputType = {
    id: string;
    candidateId: string;
    preset: $Enums.HighlightLengthPreset;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt: Date;
    updatedAt: Date;
    _count: HighlightClipVariantCountAggregateOutputType | null;
    _avg: HighlightClipVariantAvgAggregateOutputType | null;
    _sum: HighlightClipVariantSumAggregateOutputType | null;
    _min: HighlightClipVariantMinAggregateOutputType | null;
    _max: HighlightClipVariantMaxAggregateOutputType | null;
};
export type GetHighlightClipVariantGroupByPayload<T extends HighlightClipVariantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HighlightClipVariantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HighlightClipVariantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HighlightClipVariantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HighlightClipVariantGroupByOutputType[P]>;
}>>;
export type HighlightClipVariantWhereInput = {
    AND?: Prisma.HighlightClipVariantWhereInput | Prisma.HighlightClipVariantWhereInput[];
    OR?: Prisma.HighlightClipVariantWhereInput[];
    NOT?: Prisma.HighlightClipVariantWhereInput | Prisma.HighlightClipVariantWhereInput[];
    id?: Prisma.StringFilter<"HighlightClipVariant"> | string;
    candidateId?: Prisma.StringFilter<"HighlightClipVariant"> | string;
    preset?: Prisma.EnumHighlightLengthPresetFilter<"HighlightClipVariant"> | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    endMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    durationMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    createdAt?: Prisma.DateTimeFilter<"HighlightClipVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HighlightClipVariant"> | Date | string;
    candidate?: Prisma.XOR<Prisma.HighlightCandidateScalarRelationFilter, Prisma.HighlightCandidateWhereInput>;
};
export type HighlightClipVariantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    preset?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    candidate?: Prisma.HighlightCandidateOrderByWithRelationInput;
};
export type HighlightClipVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    candidateId_preset?: Prisma.HighlightClipVariantCandidateIdPresetCompoundUniqueInput;
    AND?: Prisma.HighlightClipVariantWhereInput | Prisma.HighlightClipVariantWhereInput[];
    OR?: Prisma.HighlightClipVariantWhereInput[];
    NOT?: Prisma.HighlightClipVariantWhereInput | Prisma.HighlightClipVariantWhereInput[];
    candidateId?: Prisma.StringFilter<"HighlightClipVariant"> | string;
    preset?: Prisma.EnumHighlightLengthPresetFilter<"HighlightClipVariant"> | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    endMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    durationMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    createdAt?: Prisma.DateTimeFilter<"HighlightClipVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HighlightClipVariant"> | Date | string;
    candidate?: Prisma.XOR<Prisma.HighlightCandidateScalarRelationFilter, Prisma.HighlightCandidateWhereInput>;
}, "id" | "candidateId_preset">;
export type HighlightClipVariantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    preset?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.HighlightClipVariantCountOrderByAggregateInput;
    _avg?: Prisma.HighlightClipVariantAvgOrderByAggregateInput;
    _max?: Prisma.HighlightClipVariantMaxOrderByAggregateInput;
    _min?: Prisma.HighlightClipVariantMinOrderByAggregateInput;
    _sum?: Prisma.HighlightClipVariantSumOrderByAggregateInput;
};
export type HighlightClipVariantScalarWhereWithAggregatesInput = {
    AND?: Prisma.HighlightClipVariantScalarWhereWithAggregatesInput | Prisma.HighlightClipVariantScalarWhereWithAggregatesInput[];
    OR?: Prisma.HighlightClipVariantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HighlightClipVariantScalarWhereWithAggregatesInput | Prisma.HighlightClipVariantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"HighlightClipVariant"> | string;
    candidateId?: Prisma.StringWithAggregatesFilter<"HighlightClipVariant"> | string;
    preset?: Prisma.EnumHighlightLengthPresetWithAggregatesFilter<"HighlightClipVariant"> | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntWithAggregatesFilter<"HighlightClipVariant"> | number;
    endMs?: Prisma.IntWithAggregatesFilter<"HighlightClipVariant"> | number;
    durationMs?: Prisma.IntWithAggregatesFilter<"HighlightClipVariant"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HighlightClipVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"HighlightClipVariant"> | Date | string;
};
export type HighlightClipVariantCreateInput = {
    id?: string;
    preset: $Enums.HighlightLengthPreset;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    candidate: Prisma.HighlightCandidateCreateNestedOneWithoutClipVariantsInput;
};
export type HighlightClipVariantUncheckedCreateInput = {
    id?: string;
    candidateId: string;
    preset: $Enums.HighlightLengthPreset;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HighlightClipVariantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preset?: Prisma.EnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    candidate?: Prisma.HighlightCandidateUpdateOneRequiredWithoutClipVariantsNestedInput;
};
export type HighlightClipVariantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    candidateId?: Prisma.StringFieldUpdateOperationsInput | string;
    preset?: Prisma.EnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HighlightClipVariantCreateManyInput = {
    id?: string;
    candidateId: string;
    preset: $Enums.HighlightLengthPreset;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HighlightClipVariantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preset?: Prisma.EnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HighlightClipVariantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    candidateId?: Prisma.StringFieldUpdateOperationsInput | string;
    preset?: Prisma.EnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HighlightClipVariantListRelationFilter = {
    every?: Prisma.HighlightClipVariantWhereInput;
    some?: Prisma.HighlightClipVariantWhereInput;
    none?: Prisma.HighlightClipVariantWhereInput;
};
export type HighlightClipVariantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HighlightClipVariantCandidateIdPresetCompoundUniqueInput = {
    candidateId: string;
    preset: $Enums.HighlightLengthPreset;
};
export type HighlightClipVariantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    preset?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HighlightClipVariantAvgOrderByAggregateInput = {
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
};
export type HighlightClipVariantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    preset?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HighlightClipVariantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    preset?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HighlightClipVariantSumOrderByAggregateInput = {
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
};
export type HighlightClipVariantCreateNestedManyWithoutCandidateInput = {
    create?: Prisma.XOR<Prisma.HighlightClipVariantCreateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput> | Prisma.HighlightClipVariantCreateWithoutCandidateInput[] | Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput | Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput[];
    createMany?: Prisma.HighlightClipVariantCreateManyCandidateInputEnvelope;
    connect?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
};
export type HighlightClipVariantUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: Prisma.XOR<Prisma.HighlightClipVariantCreateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput> | Prisma.HighlightClipVariantCreateWithoutCandidateInput[] | Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput | Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput[];
    createMany?: Prisma.HighlightClipVariantCreateManyCandidateInputEnvelope;
    connect?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
};
export type HighlightClipVariantUpdateManyWithoutCandidateNestedInput = {
    create?: Prisma.XOR<Prisma.HighlightClipVariantCreateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput> | Prisma.HighlightClipVariantCreateWithoutCandidateInput[] | Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput | Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput[];
    upsert?: Prisma.HighlightClipVariantUpsertWithWhereUniqueWithoutCandidateInput | Prisma.HighlightClipVariantUpsertWithWhereUniqueWithoutCandidateInput[];
    createMany?: Prisma.HighlightClipVariantCreateManyCandidateInputEnvelope;
    set?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    disconnect?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    delete?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    connect?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    update?: Prisma.HighlightClipVariantUpdateWithWhereUniqueWithoutCandidateInput | Prisma.HighlightClipVariantUpdateWithWhereUniqueWithoutCandidateInput[];
    updateMany?: Prisma.HighlightClipVariantUpdateManyWithWhereWithoutCandidateInput | Prisma.HighlightClipVariantUpdateManyWithWhereWithoutCandidateInput[];
    deleteMany?: Prisma.HighlightClipVariantScalarWhereInput | Prisma.HighlightClipVariantScalarWhereInput[];
};
export type HighlightClipVariantUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: Prisma.XOR<Prisma.HighlightClipVariantCreateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput> | Prisma.HighlightClipVariantCreateWithoutCandidateInput[] | Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput | Prisma.HighlightClipVariantCreateOrConnectWithoutCandidateInput[];
    upsert?: Prisma.HighlightClipVariantUpsertWithWhereUniqueWithoutCandidateInput | Prisma.HighlightClipVariantUpsertWithWhereUniqueWithoutCandidateInput[];
    createMany?: Prisma.HighlightClipVariantCreateManyCandidateInputEnvelope;
    set?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    disconnect?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    delete?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    connect?: Prisma.HighlightClipVariantWhereUniqueInput | Prisma.HighlightClipVariantWhereUniqueInput[];
    update?: Prisma.HighlightClipVariantUpdateWithWhereUniqueWithoutCandidateInput | Prisma.HighlightClipVariantUpdateWithWhereUniqueWithoutCandidateInput[];
    updateMany?: Prisma.HighlightClipVariantUpdateManyWithWhereWithoutCandidateInput | Prisma.HighlightClipVariantUpdateManyWithWhereWithoutCandidateInput[];
    deleteMany?: Prisma.HighlightClipVariantScalarWhereInput | Prisma.HighlightClipVariantScalarWhereInput[];
};
export type EnumHighlightLengthPresetFieldUpdateOperationsInput = {
    set?: $Enums.HighlightLengthPreset;
};
export type HighlightClipVariantCreateWithoutCandidateInput = {
    id?: string;
    preset: $Enums.HighlightLengthPreset;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HighlightClipVariantUncheckedCreateWithoutCandidateInput = {
    id?: string;
    preset: $Enums.HighlightLengthPreset;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HighlightClipVariantCreateOrConnectWithoutCandidateInput = {
    where: Prisma.HighlightClipVariantWhereUniqueInput;
    create: Prisma.XOR<Prisma.HighlightClipVariantCreateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput>;
};
export type HighlightClipVariantCreateManyCandidateInputEnvelope = {
    data: Prisma.HighlightClipVariantCreateManyCandidateInput | Prisma.HighlightClipVariantCreateManyCandidateInput[];
    skipDuplicates?: boolean;
};
export type HighlightClipVariantUpsertWithWhereUniqueWithoutCandidateInput = {
    where: Prisma.HighlightClipVariantWhereUniqueInput;
    update: Prisma.XOR<Prisma.HighlightClipVariantUpdateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedUpdateWithoutCandidateInput>;
    create: Prisma.XOR<Prisma.HighlightClipVariantCreateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedCreateWithoutCandidateInput>;
};
export type HighlightClipVariantUpdateWithWhereUniqueWithoutCandidateInput = {
    where: Prisma.HighlightClipVariantWhereUniqueInput;
    data: Prisma.XOR<Prisma.HighlightClipVariantUpdateWithoutCandidateInput, Prisma.HighlightClipVariantUncheckedUpdateWithoutCandidateInput>;
};
export type HighlightClipVariantUpdateManyWithWhereWithoutCandidateInput = {
    where: Prisma.HighlightClipVariantScalarWhereInput;
    data: Prisma.XOR<Prisma.HighlightClipVariantUpdateManyMutationInput, Prisma.HighlightClipVariantUncheckedUpdateManyWithoutCandidateInput>;
};
export type HighlightClipVariantScalarWhereInput = {
    AND?: Prisma.HighlightClipVariantScalarWhereInput | Prisma.HighlightClipVariantScalarWhereInput[];
    OR?: Prisma.HighlightClipVariantScalarWhereInput[];
    NOT?: Prisma.HighlightClipVariantScalarWhereInput | Prisma.HighlightClipVariantScalarWhereInput[];
    id?: Prisma.StringFilter<"HighlightClipVariant"> | string;
    candidateId?: Prisma.StringFilter<"HighlightClipVariant"> | string;
    preset?: Prisma.EnumHighlightLengthPresetFilter<"HighlightClipVariant"> | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    endMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    durationMs?: Prisma.IntFilter<"HighlightClipVariant"> | number;
    createdAt?: Prisma.DateTimeFilter<"HighlightClipVariant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HighlightClipVariant"> | Date | string;
};
export type HighlightClipVariantCreateManyCandidateInput = {
    id?: string;
    preset: $Enums.HighlightLengthPreset;
    startMs: number;
    endMs: number;
    durationMs: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HighlightClipVariantUpdateWithoutCandidateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preset?: Prisma.EnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HighlightClipVariantUncheckedUpdateWithoutCandidateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preset?: Prisma.EnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HighlightClipVariantUncheckedUpdateManyWithoutCandidateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    preset?: Prisma.EnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMs?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HighlightClipVariantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    candidateId?: boolean;
    preset?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    durationMs?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    candidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["highlightClipVariant"]>;
export type HighlightClipVariantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    candidateId?: boolean;
    preset?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    durationMs?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    candidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["highlightClipVariant"]>;
export type HighlightClipVariantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    candidateId?: boolean;
    preset?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    durationMs?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    candidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["highlightClipVariant"]>;
export type HighlightClipVariantSelectScalar = {
    id?: boolean;
    candidateId?: boolean;
    preset?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    durationMs?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type HighlightClipVariantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "candidateId" | "preset" | "startMs" | "endMs" | "durationMs" | "createdAt" | "updatedAt", ExtArgs["result"]["highlightClipVariant"]>;
export type HighlightClipVariantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    candidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
};
export type HighlightClipVariantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    candidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
};
export type HighlightClipVariantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    candidate?: boolean | Prisma.HighlightCandidateDefaultArgs<ExtArgs>;
};
export type $HighlightClipVariantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HighlightClipVariant";
    objects: {
        candidate: Prisma.$HighlightCandidatePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        candidateId: string;
        preset: $Enums.HighlightLengthPreset;
        startMs: number;
        endMs: number;
        durationMs: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["highlightClipVariant"]>;
    composites: {};
};
export type HighlightClipVariantGetPayload<S extends boolean | null | undefined | HighlightClipVariantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload, S>;
export type HighlightClipVariantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HighlightClipVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HighlightClipVariantCountAggregateInputType | true;
};
export interface HighlightClipVariantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HighlightClipVariant'];
        meta: {
            name: 'HighlightClipVariant';
        };
    };
    findUnique<T extends HighlightClipVariantFindUniqueArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HighlightClipVariantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HighlightClipVariantFindFirstArgs>(args?: Prisma.SelectSubset<T, HighlightClipVariantFindFirstArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HighlightClipVariantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HighlightClipVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HighlightClipVariantFindManyArgs>(args?: Prisma.SelectSubset<T, HighlightClipVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HighlightClipVariantCreateArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantCreateArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HighlightClipVariantCreateManyArgs>(args?: Prisma.SelectSubset<T, HighlightClipVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HighlightClipVariantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HighlightClipVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HighlightClipVariantDeleteArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantDeleteArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HighlightClipVariantUpdateArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantUpdateArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HighlightClipVariantDeleteManyArgs>(args?: Prisma.SelectSubset<T, HighlightClipVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HighlightClipVariantUpdateManyArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HighlightClipVariantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HighlightClipVariantUpsertArgs>(args: Prisma.SelectSubset<T, HighlightClipVariantUpsertArgs<ExtArgs>>): Prisma.Prisma__HighlightClipVariantClient<runtime.Types.Result.GetResult<Prisma.$HighlightClipVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HighlightClipVariantCountArgs>(args?: Prisma.Subset<T, HighlightClipVariantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HighlightClipVariantCountAggregateOutputType> : number>;
    aggregate<T extends HighlightClipVariantAggregateArgs>(args: Prisma.Subset<T, HighlightClipVariantAggregateArgs>): Prisma.PrismaPromise<GetHighlightClipVariantAggregateType<T>>;
    groupBy<T extends HighlightClipVariantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HighlightClipVariantGroupByArgs['orderBy'];
    } : {
        orderBy?: HighlightClipVariantGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HighlightClipVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHighlightClipVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HighlightClipVariantFieldRefs;
}
export interface Prisma__HighlightClipVariantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    candidate<T extends Prisma.HighlightCandidateDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HighlightCandidateDefaultArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HighlightClipVariantFieldRefs {
    readonly id: Prisma.FieldRef<"HighlightClipVariant", 'String'>;
    readonly candidateId: Prisma.FieldRef<"HighlightClipVariant", 'String'>;
    readonly preset: Prisma.FieldRef<"HighlightClipVariant", 'HighlightLengthPreset'>;
    readonly startMs: Prisma.FieldRef<"HighlightClipVariant", 'Int'>;
    readonly endMs: Prisma.FieldRef<"HighlightClipVariant", 'Int'>;
    readonly durationMs: Prisma.FieldRef<"HighlightClipVariant", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"HighlightClipVariant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"HighlightClipVariant", 'DateTime'>;
}
export type HighlightClipVariantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    where: Prisma.HighlightClipVariantWhereUniqueInput;
};
export type HighlightClipVariantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    where: Prisma.HighlightClipVariantWhereUniqueInput;
};
export type HighlightClipVariantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    where?: Prisma.HighlightClipVariantWhereInput;
    orderBy?: Prisma.HighlightClipVariantOrderByWithRelationInput | Prisma.HighlightClipVariantOrderByWithRelationInput[];
    cursor?: Prisma.HighlightClipVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HighlightClipVariantScalarFieldEnum | Prisma.HighlightClipVariantScalarFieldEnum[];
};
export type HighlightClipVariantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    where?: Prisma.HighlightClipVariantWhereInput;
    orderBy?: Prisma.HighlightClipVariantOrderByWithRelationInput | Prisma.HighlightClipVariantOrderByWithRelationInput[];
    cursor?: Prisma.HighlightClipVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HighlightClipVariantScalarFieldEnum | Prisma.HighlightClipVariantScalarFieldEnum[];
};
export type HighlightClipVariantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    where?: Prisma.HighlightClipVariantWhereInput;
    orderBy?: Prisma.HighlightClipVariantOrderByWithRelationInput | Prisma.HighlightClipVariantOrderByWithRelationInput[];
    cursor?: Prisma.HighlightClipVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HighlightClipVariantScalarFieldEnum | Prisma.HighlightClipVariantScalarFieldEnum[];
};
export type HighlightClipVariantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HighlightClipVariantCreateInput, Prisma.HighlightClipVariantUncheckedCreateInput>;
};
export type HighlightClipVariantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HighlightClipVariantCreateManyInput | Prisma.HighlightClipVariantCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HighlightClipVariantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    data: Prisma.HighlightClipVariantCreateManyInput | Prisma.HighlightClipVariantCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HighlightClipVariantIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HighlightClipVariantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HighlightClipVariantUpdateInput, Prisma.HighlightClipVariantUncheckedUpdateInput>;
    where: Prisma.HighlightClipVariantWhereUniqueInput;
};
export type HighlightClipVariantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HighlightClipVariantUpdateManyMutationInput, Prisma.HighlightClipVariantUncheckedUpdateManyInput>;
    where?: Prisma.HighlightClipVariantWhereInput;
    limit?: number;
};
export type HighlightClipVariantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HighlightClipVariantUpdateManyMutationInput, Prisma.HighlightClipVariantUncheckedUpdateManyInput>;
    where?: Prisma.HighlightClipVariantWhereInput;
    limit?: number;
    include?: Prisma.HighlightClipVariantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HighlightClipVariantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    where: Prisma.HighlightClipVariantWhereUniqueInput;
    create: Prisma.XOR<Prisma.HighlightClipVariantCreateInput, Prisma.HighlightClipVariantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HighlightClipVariantUpdateInput, Prisma.HighlightClipVariantUncheckedUpdateInput>;
};
export type HighlightClipVariantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
    where: Prisma.HighlightClipVariantWhereUniqueInput;
};
export type HighlightClipVariantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HighlightClipVariantWhereInput;
    limit?: number;
};
export type HighlightClipVariantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightClipVariantSelect<ExtArgs> | null;
    omit?: Prisma.HighlightClipVariantOmit<ExtArgs> | null;
    include?: Prisma.HighlightClipVariantInclude<ExtArgs> | null;
};
