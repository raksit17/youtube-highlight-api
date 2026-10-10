import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ClipDraftModel = runtime.Types.Result.DefaultSelection<Prisma.$ClipDraftPayload>;
export type AggregateClipDraft = {
    _count: ClipDraftCountAggregateOutputType | null;
    _avg: ClipDraftAvgAggregateOutputType | null;
    _sum: ClipDraftSumAggregateOutputType | null;
    _min: ClipDraftMinAggregateOutputType | null;
    _max: ClipDraftMaxAggregateOutputType | null;
};
export type ClipDraftAvgAggregateOutputType = {
    startMs: number | null;
    endMs: number | null;
    peakMs: number | null;
};
export type ClipDraftSumAggregateOutputType = {
    startMs: number | null;
    endMs: number | null;
    peakMs: number | null;
};
export type ClipDraftMinAggregateOutputType = {
    id: string | null;
    videoId: string | null;
    candidateId: string | null;
    startMs: number | null;
    endMs: number | null;
    peakMs: number | null;
    title: string | null;
    note: string | null;
    status: $Enums.ClipDraftStatus | null;
    sourcePreset: $Enums.HighlightLengthPreset | null;
    isCustomized: boolean | null;
    exportedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ClipDraftMaxAggregateOutputType = {
    id: string | null;
    videoId: string | null;
    candidateId: string | null;
    startMs: number | null;
    endMs: number | null;
    peakMs: number | null;
    title: string | null;
    note: string | null;
    status: $Enums.ClipDraftStatus | null;
    sourcePreset: $Enums.HighlightLengthPreset | null;
    isCustomized: boolean | null;
    exportedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ClipDraftCountAggregateOutputType = {
    id: number;
    videoId: number;
    candidateId: number;
    startMs: number;
    endMs: number;
    peakMs: number;
    title: number;
    note: number;
    status: number;
    sourcePreset: number;
    isCustomized: number;
    candidateSnapshot: number;
    exportedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ClipDraftAvgAggregateInputType = {
    startMs?: true;
    endMs?: true;
    peakMs?: true;
};
export type ClipDraftSumAggregateInputType = {
    startMs?: true;
    endMs?: true;
    peakMs?: true;
};
export type ClipDraftMinAggregateInputType = {
    id?: true;
    videoId?: true;
    candidateId?: true;
    startMs?: true;
    endMs?: true;
    peakMs?: true;
    title?: true;
    note?: true;
    status?: true;
    sourcePreset?: true;
    isCustomized?: true;
    exportedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ClipDraftMaxAggregateInputType = {
    id?: true;
    videoId?: true;
    candidateId?: true;
    startMs?: true;
    endMs?: true;
    peakMs?: true;
    title?: true;
    note?: true;
    status?: true;
    sourcePreset?: true;
    isCustomized?: true;
    exportedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ClipDraftCountAggregateInputType = {
    id?: true;
    videoId?: true;
    candidateId?: true;
    startMs?: true;
    endMs?: true;
    peakMs?: true;
    title?: true;
    note?: true;
    status?: true;
    sourcePreset?: true;
    isCustomized?: true;
    candidateSnapshot?: true;
    exportedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ClipDraftAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClipDraftWhereInput;
    orderBy?: Prisma.ClipDraftOrderByWithRelationInput | Prisma.ClipDraftOrderByWithRelationInput[];
    cursor?: Prisma.ClipDraftWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ClipDraftCountAggregateInputType;
    _avg?: ClipDraftAvgAggregateInputType;
    _sum?: ClipDraftSumAggregateInputType;
    _min?: ClipDraftMinAggregateInputType;
    _max?: ClipDraftMaxAggregateInputType;
};
export type GetClipDraftAggregateType<T extends ClipDraftAggregateArgs> = {
    [P in keyof T & keyof AggregateClipDraft]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClipDraft[P]> : Prisma.GetScalarType<T[P], AggregateClipDraft[P]>;
};
export type ClipDraftGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClipDraftWhereInput;
    orderBy?: Prisma.ClipDraftOrderByWithAggregationInput | Prisma.ClipDraftOrderByWithAggregationInput[];
    by: Prisma.ClipDraftScalarFieldEnum[] | Prisma.ClipDraftScalarFieldEnum;
    having?: Prisma.ClipDraftScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClipDraftCountAggregateInputType | true;
    _avg?: ClipDraftAvgAggregateInputType;
    _sum?: ClipDraftSumAggregateInputType;
    _min?: ClipDraftMinAggregateInputType;
    _max?: ClipDraftMaxAggregateInputType;
};
export type ClipDraftGroupByOutputType = {
    id: string;
    videoId: string;
    candidateId: string | null;
    startMs: number;
    endMs: number;
    peakMs: number | null;
    title: string | null;
    note: string | null;
    status: $Enums.ClipDraftStatus;
    sourcePreset: $Enums.HighlightLengthPreset | null;
    isCustomized: boolean;
    candidateSnapshot: runtime.JsonValue | null;
    exportedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ClipDraftCountAggregateOutputType | null;
    _avg: ClipDraftAvgAggregateOutputType | null;
    _sum: ClipDraftSumAggregateOutputType | null;
    _min: ClipDraftMinAggregateOutputType | null;
    _max: ClipDraftMaxAggregateOutputType | null;
};
export type GetClipDraftGroupByPayload<T extends ClipDraftGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClipDraftGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClipDraftGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClipDraftGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClipDraftGroupByOutputType[P]>;
}>>;
export type ClipDraftWhereInput = {
    AND?: Prisma.ClipDraftWhereInput | Prisma.ClipDraftWhereInput[];
    OR?: Prisma.ClipDraftWhereInput[];
    NOT?: Prisma.ClipDraftWhereInput | Prisma.ClipDraftWhereInput[];
    id?: Prisma.StringFilter<"ClipDraft"> | string;
    videoId?: Prisma.StringFilter<"ClipDraft"> | string;
    candidateId?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    startMs?: Prisma.IntFilter<"ClipDraft"> | number;
    endMs?: Prisma.IntFilter<"ClipDraft"> | number;
    peakMs?: Prisma.IntNullableFilter<"ClipDraft"> | number | null;
    title?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    note?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    status?: Prisma.EnumClipDraftStatusFilter<"ClipDraft"> | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.EnumHighlightLengthPresetNullableFilter<"ClipDraft"> | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFilter<"ClipDraft"> | boolean;
    candidateSnapshot?: Prisma.JsonNullableFilter<"ClipDraft">;
    exportedAt?: Prisma.DateTimeNullableFilter<"ClipDraft"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClipDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ClipDraft"> | Date | string;
    video?: Prisma.XOR<Prisma.VideoScalarRelationFilter, Prisma.VideoWhereInput>;
    candidate?: Prisma.XOR<Prisma.HighlightCandidateNullableScalarRelationFilter, Prisma.HighlightCandidateWhereInput> | null;
    renderJobs?: Prisma.RenderJobListRelationFilter;
};
export type ClipDraftOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    videoId?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    peakMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcePreset?: Prisma.SortOrderInput | Prisma.SortOrder;
    isCustomized?: Prisma.SortOrder;
    candidateSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    video?: Prisma.VideoOrderByWithRelationInput;
    candidate?: Prisma.HighlightCandidateOrderByWithRelationInput;
    renderJobs?: Prisma.RenderJobOrderByRelationAggregateInput;
};
export type ClipDraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ClipDraftWhereInput | Prisma.ClipDraftWhereInput[];
    OR?: Prisma.ClipDraftWhereInput[];
    NOT?: Prisma.ClipDraftWhereInput | Prisma.ClipDraftWhereInput[];
    videoId?: Prisma.StringFilter<"ClipDraft"> | string;
    candidateId?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    startMs?: Prisma.IntFilter<"ClipDraft"> | number;
    endMs?: Prisma.IntFilter<"ClipDraft"> | number;
    peakMs?: Prisma.IntNullableFilter<"ClipDraft"> | number | null;
    title?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    note?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    status?: Prisma.EnumClipDraftStatusFilter<"ClipDraft"> | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.EnumHighlightLengthPresetNullableFilter<"ClipDraft"> | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFilter<"ClipDraft"> | boolean;
    candidateSnapshot?: Prisma.JsonNullableFilter<"ClipDraft">;
    exportedAt?: Prisma.DateTimeNullableFilter<"ClipDraft"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClipDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ClipDraft"> | Date | string;
    video?: Prisma.XOR<Prisma.VideoScalarRelationFilter, Prisma.VideoWhereInput>;
    candidate?: Prisma.XOR<Prisma.HighlightCandidateNullableScalarRelationFilter, Prisma.HighlightCandidateWhereInput> | null;
    renderJobs?: Prisma.RenderJobListRelationFilter;
}, "id">;
export type ClipDraftOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    videoId?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    peakMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcePreset?: Prisma.SortOrderInput | Prisma.SortOrder;
    isCustomized?: Prisma.SortOrder;
    candidateSnapshot?: Prisma.SortOrderInput | Prisma.SortOrder;
    exportedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ClipDraftCountOrderByAggregateInput;
    _avg?: Prisma.ClipDraftAvgOrderByAggregateInput;
    _max?: Prisma.ClipDraftMaxOrderByAggregateInput;
    _min?: Prisma.ClipDraftMinOrderByAggregateInput;
    _sum?: Prisma.ClipDraftSumOrderByAggregateInput;
};
export type ClipDraftScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClipDraftScalarWhereWithAggregatesInput | Prisma.ClipDraftScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClipDraftScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClipDraftScalarWhereWithAggregatesInput | Prisma.ClipDraftScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ClipDraft"> | string;
    videoId?: Prisma.StringWithAggregatesFilter<"ClipDraft"> | string;
    candidateId?: Prisma.StringNullableWithAggregatesFilter<"ClipDraft"> | string | null;
    startMs?: Prisma.IntWithAggregatesFilter<"ClipDraft"> | number;
    endMs?: Prisma.IntWithAggregatesFilter<"ClipDraft"> | number;
    peakMs?: Prisma.IntNullableWithAggregatesFilter<"ClipDraft"> | number | null;
    title?: Prisma.StringNullableWithAggregatesFilter<"ClipDraft"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"ClipDraft"> | string | null;
    status?: Prisma.EnumClipDraftStatusWithAggregatesFilter<"ClipDraft"> | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.EnumHighlightLengthPresetNullableWithAggregatesFilter<"ClipDraft"> | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolWithAggregatesFilter<"ClipDraft"> | boolean;
    candidateSnapshot?: Prisma.JsonNullableWithAggregatesFilter<"ClipDraft">;
    exportedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ClipDraft"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ClipDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ClipDraft"> | Date | string;
};
export type ClipDraftCreateInput = {
    id?: string;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    video: Prisma.VideoCreateNestedOneWithoutClipDraftsInput;
    candidate?: Prisma.HighlightCandidateCreateNestedOneWithoutClipDraftsInput;
    renderJobs?: Prisma.RenderJobCreateNestedManyWithoutClipInput;
};
export type ClipDraftUncheckedCreateInput = {
    id?: string;
    videoId: string;
    candidateId?: string | null;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    renderJobs?: Prisma.RenderJobUncheckedCreateNestedManyWithoutClipInput;
};
export type ClipDraftUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    video?: Prisma.VideoUpdateOneRequiredWithoutClipDraftsNestedInput;
    candidate?: Prisma.HighlightCandidateUpdateOneWithoutClipDraftsNestedInput;
    renderJobs?: Prisma.RenderJobUpdateManyWithoutClipNestedInput;
};
export type ClipDraftUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    videoId?: Prisma.StringFieldUpdateOperationsInput | string;
    candidateId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    renderJobs?: Prisma.RenderJobUncheckedUpdateManyWithoutClipNestedInput;
};
export type ClipDraftCreateManyInput = {
    id?: string;
    videoId: string;
    candidateId?: string | null;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ClipDraftUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClipDraftUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    videoId?: Prisma.StringFieldUpdateOperationsInput | string;
    candidateId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClipDraftListRelationFilter = {
    every?: Prisma.ClipDraftWhereInput;
    some?: Prisma.ClipDraftWhereInput;
    none?: Prisma.ClipDraftWhereInput;
};
export type ClipDraftOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ClipDraftCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    videoId?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    peakMs?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcePreset?: Prisma.SortOrder;
    isCustomized?: Prisma.SortOrder;
    candidateSnapshot?: Prisma.SortOrder;
    exportedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ClipDraftAvgOrderByAggregateInput = {
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    peakMs?: Prisma.SortOrder;
};
export type ClipDraftMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    videoId?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    peakMs?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcePreset?: Prisma.SortOrder;
    isCustomized?: Prisma.SortOrder;
    exportedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ClipDraftMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    videoId?: Prisma.SortOrder;
    candidateId?: Prisma.SortOrder;
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    peakMs?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcePreset?: Prisma.SortOrder;
    isCustomized?: Prisma.SortOrder;
    exportedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ClipDraftSumOrderByAggregateInput = {
    startMs?: Prisma.SortOrder;
    endMs?: Prisma.SortOrder;
    peakMs?: Prisma.SortOrder;
};
export type ClipDraftScalarRelationFilter = {
    is?: Prisma.ClipDraftWhereInput;
    isNot?: Prisma.ClipDraftWhereInput;
};
export type ClipDraftCreateNestedManyWithoutVideoInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutVideoInput, Prisma.ClipDraftUncheckedCreateWithoutVideoInput> | Prisma.ClipDraftCreateWithoutVideoInput[] | Prisma.ClipDraftUncheckedCreateWithoutVideoInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutVideoInput | Prisma.ClipDraftCreateOrConnectWithoutVideoInput[];
    createMany?: Prisma.ClipDraftCreateManyVideoInputEnvelope;
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
};
export type ClipDraftUncheckedCreateNestedManyWithoutVideoInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutVideoInput, Prisma.ClipDraftUncheckedCreateWithoutVideoInput> | Prisma.ClipDraftCreateWithoutVideoInput[] | Prisma.ClipDraftUncheckedCreateWithoutVideoInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutVideoInput | Prisma.ClipDraftCreateOrConnectWithoutVideoInput[];
    createMany?: Prisma.ClipDraftCreateManyVideoInputEnvelope;
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
};
export type ClipDraftUpdateManyWithoutVideoNestedInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutVideoInput, Prisma.ClipDraftUncheckedCreateWithoutVideoInput> | Prisma.ClipDraftCreateWithoutVideoInput[] | Prisma.ClipDraftUncheckedCreateWithoutVideoInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutVideoInput | Prisma.ClipDraftCreateOrConnectWithoutVideoInput[];
    upsert?: Prisma.ClipDraftUpsertWithWhereUniqueWithoutVideoInput | Prisma.ClipDraftUpsertWithWhereUniqueWithoutVideoInput[];
    createMany?: Prisma.ClipDraftCreateManyVideoInputEnvelope;
    set?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    disconnect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    delete?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    update?: Prisma.ClipDraftUpdateWithWhereUniqueWithoutVideoInput | Prisma.ClipDraftUpdateWithWhereUniqueWithoutVideoInput[];
    updateMany?: Prisma.ClipDraftUpdateManyWithWhereWithoutVideoInput | Prisma.ClipDraftUpdateManyWithWhereWithoutVideoInput[];
    deleteMany?: Prisma.ClipDraftScalarWhereInput | Prisma.ClipDraftScalarWhereInput[];
};
export type ClipDraftUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutVideoInput, Prisma.ClipDraftUncheckedCreateWithoutVideoInput> | Prisma.ClipDraftCreateWithoutVideoInput[] | Prisma.ClipDraftUncheckedCreateWithoutVideoInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutVideoInput | Prisma.ClipDraftCreateOrConnectWithoutVideoInput[];
    upsert?: Prisma.ClipDraftUpsertWithWhereUniqueWithoutVideoInput | Prisma.ClipDraftUpsertWithWhereUniqueWithoutVideoInput[];
    createMany?: Prisma.ClipDraftCreateManyVideoInputEnvelope;
    set?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    disconnect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    delete?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    update?: Prisma.ClipDraftUpdateWithWhereUniqueWithoutVideoInput | Prisma.ClipDraftUpdateWithWhereUniqueWithoutVideoInput[];
    updateMany?: Prisma.ClipDraftUpdateManyWithWhereWithoutVideoInput | Prisma.ClipDraftUpdateManyWithWhereWithoutVideoInput[];
    deleteMany?: Prisma.ClipDraftScalarWhereInput | Prisma.ClipDraftScalarWhereInput[];
};
export type ClipDraftCreateNestedManyWithoutCandidateInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutCandidateInput, Prisma.ClipDraftUncheckedCreateWithoutCandidateInput> | Prisma.ClipDraftCreateWithoutCandidateInput[] | Prisma.ClipDraftUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutCandidateInput | Prisma.ClipDraftCreateOrConnectWithoutCandidateInput[];
    createMany?: Prisma.ClipDraftCreateManyCandidateInputEnvelope;
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
};
export type ClipDraftUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutCandidateInput, Prisma.ClipDraftUncheckedCreateWithoutCandidateInput> | Prisma.ClipDraftCreateWithoutCandidateInput[] | Prisma.ClipDraftUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutCandidateInput | Prisma.ClipDraftCreateOrConnectWithoutCandidateInput[];
    createMany?: Prisma.ClipDraftCreateManyCandidateInputEnvelope;
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
};
export type ClipDraftUpdateManyWithoutCandidateNestedInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutCandidateInput, Prisma.ClipDraftUncheckedCreateWithoutCandidateInput> | Prisma.ClipDraftCreateWithoutCandidateInput[] | Prisma.ClipDraftUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutCandidateInput | Prisma.ClipDraftCreateOrConnectWithoutCandidateInput[];
    upsert?: Prisma.ClipDraftUpsertWithWhereUniqueWithoutCandidateInput | Prisma.ClipDraftUpsertWithWhereUniqueWithoutCandidateInput[];
    createMany?: Prisma.ClipDraftCreateManyCandidateInputEnvelope;
    set?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    disconnect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    delete?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    update?: Prisma.ClipDraftUpdateWithWhereUniqueWithoutCandidateInput | Prisma.ClipDraftUpdateWithWhereUniqueWithoutCandidateInput[];
    updateMany?: Prisma.ClipDraftUpdateManyWithWhereWithoutCandidateInput | Prisma.ClipDraftUpdateManyWithWhereWithoutCandidateInput[];
    deleteMany?: Prisma.ClipDraftScalarWhereInput | Prisma.ClipDraftScalarWhereInput[];
};
export type ClipDraftUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutCandidateInput, Prisma.ClipDraftUncheckedCreateWithoutCandidateInput> | Prisma.ClipDraftCreateWithoutCandidateInput[] | Prisma.ClipDraftUncheckedCreateWithoutCandidateInput[];
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutCandidateInput | Prisma.ClipDraftCreateOrConnectWithoutCandidateInput[];
    upsert?: Prisma.ClipDraftUpsertWithWhereUniqueWithoutCandidateInput | Prisma.ClipDraftUpsertWithWhereUniqueWithoutCandidateInput[];
    createMany?: Prisma.ClipDraftCreateManyCandidateInputEnvelope;
    set?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    disconnect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    delete?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    connect?: Prisma.ClipDraftWhereUniqueInput | Prisma.ClipDraftWhereUniqueInput[];
    update?: Prisma.ClipDraftUpdateWithWhereUniqueWithoutCandidateInput | Prisma.ClipDraftUpdateWithWhereUniqueWithoutCandidateInput[];
    updateMany?: Prisma.ClipDraftUpdateManyWithWhereWithoutCandidateInput | Prisma.ClipDraftUpdateManyWithWhereWithoutCandidateInput[];
    deleteMany?: Prisma.ClipDraftScalarWhereInput | Prisma.ClipDraftScalarWhereInput[];
};
export type EnumClipDraftStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClipDraftStatus;
};
export type NullableEnumHighlightLengthPresetFieldUpdateOperationsInput = {
    set?: $Enums.HighlightLengthPreset | null;
};
export type ClipDraftCreateNestedOneWithoutRenderJobsInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutRenderJobsInput, Prisma.ClipDraftUncheckedCreateWithoutRenderJobsInput>;
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutRenderJobsInput;
    connect?: Prisma.ClipDraftWhereUniqueInput;
};
export type ClipDraftUpdateOneRequiredWithoutRenderJobsNestedInput = {
    create?: Prisma.XOR<Prisma.ClipDraftCreateWithoutRenderJobsInput, Prisma.ClipDraftUncheckedCreateWithoutRenderJobsInput>;
    connectOrCreate?: Prisma.ClipDraftCreateOrConnectWithoutRenderJobsInput;
    upsert?: Prisma.ClipDraftUpsertWithoutRenderJobsInput;
    connect?: Prisma.ClipDraftWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClipDraftUpdateToOneWithWhereWithoutRenderJobsInput, Prisma.ClipDraftUpdateWithoutRenderJobsInput>, Prisma.ClipDraftUncheckedUpdateWithoutRenderJobsInput>;
};
export type ClipDraftCreateWithoutVideoInput = {
    id?: string;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    candidate?: Prisma.HighlightCandidateCreateNestedOneWithoutClipDraftsInput;
    renderJobs?: Prisma.RenderJobCreateNestedManyWithoutClipInput;
};
export type ClipDraftUncheckedCreateWithoutVideoInput = {
    id?: string;
    candidateId?: string | null;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    renderJobs?: Prisma.RenderJobUncheckedCreateNestedManyWithoutClipInput;
};
export type ClipDraftCreateOrConnectWithoutVideoInput = {
    where: Prisma.ClipDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClipDraftCreateWithoutVideoInput, Prisma.ClipDraftUncheckedCreateWithoutVideoInput>;
};
export type ClipDraftCreateManyVideoInputEnvelope = {
    data: Prisma.ClipDraftCreateManyVideoInput | Prisma.ClipDraftCreateManyVideoInput[];
    skipDuplicates?: boolean;
};
export type ClipDraftUpsertWithWhereUniqueWithoutVideoInput = {
    where: Prisma.ClipDraftWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClipDraftUpdateWithoutVideoInput, Prisma.ClipDraftUncheckedUpdateWithoutVideoInput>;
    create: Prisma.XOR<Prisma.ClipDraftCreateWithoutVideoInput, Prisma.ClipDraftUncheckedCreateWithoutVideoInput>;
};
export type ClipDraftUpdateWithWhereUniqueWithoutVideoInput = {
    where: Prisma.ClipDraftWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClipDraftUpdateWithoutVideoInput, Prisma.ClipDraftUncheckedUpdateWithoutVideoInput>;
};
export type ClipDraftUpdateManyWithWhereWithoutVideoInput = {
    where: Prisma.ClipDraftScalarWhereInput;
    data: Prisma.XOR<Prisma.ClipDraftUpdateManyMutationInput, Prisma.ClipDraftUncheckedUpdateManyWithoutVideoInput>;
};
export type ClipDraftScalarWhereInput = {
    AND?: Prisma.ClipDraftScalarWhereInput | Prisma.ClipDraftScalarWhereInput[];
    OR?: Prisma.ClipDraftScalarWhereInput[];
    NOT?: Prisma.ClipDraftScalarWhereInput | Prisma.ClipDraftScalarWhereInput[];
    id?: Prisma.StringFilter<"ClipDraft"> | string;
    videoId?: Prisma.StringFilter<"ClipDraft"> | string;
    candidateId?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    startMs?: Prisma.IntFilter<"ClipDraft"> | number;
    endMs?: Prisma.IntFilter<"ClipDraft"> | number;
    peakMs?: Prisma.IntNullableFilter<"ClipDraft"> | number | null;
    title?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    note?: Prisma.StringNullableFilter<"ClipDraft"> | string | null;
    status?: Prisma.EnumClipDraftStatusFilter<"ClipDraft"> | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.EnumHighlightLengthPresetNullableFilter<"ClipDraft"> | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFilter<"ClipDraft"> | boolean;
    candidateSnapshot?: Prisma.JsonNullableFilter<"ClipDraft">;
    exportedAt?: Prisma.DateTimeNullableFilter<"ClipDraft"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClipDraft"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ClipDraft"> | Date | string;
};
export type ClipDraftCreateWithoutCandidateInput = {
    id?: string;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    video: Prisma.VideoCreateNestedOneWithoutClipDraftsInput;
    renderJobs?: Prisma.RenderJobCreateNestedManyWithoutClipInput;
};
export type ClipDraftUncheckedCreateWithoutCandidateInput = {
    id?: string;
    videoId: string;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    renderJobs?: Prisma.RenderJobUncheckedCreateNestedManyWithoutClipInput;
};
export type ClipDraftCreateOrConnectWithoutCandidateInput = {
    where: Prisma.ClipDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClipDraftCreateWithoutCandidateInput, Prisma.ClipDraftUncheckedCreateWithoutCandidateInput>;
};
export type ClipDraftCreateManyCandidateInputEnvelope = {
    data: Prisma.ClipDraftCreateManyCandidateInput | Prisma.ClipDraftCreateManyCandidateInput[];
    skipDuplicates?: boolean;
};
export type ClipDraftUpsertWithWhereUniqueWithoutCandidateInput = {
    where: Prisma.ClipDraftWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClipDraftUpdateWithoutCandidateInput, Prisma.ClipDraftUncheckedUpdateWithoutCandidateInput>;
    create: Prisma.XOR<Prisma.ClipDraftCreateWithoutCandidateInput, Prisma.ClipDraftUncheckedCreateWithoutCandidateInput>;
};
export type ClipDraftUpdateWithWhereUniqueWithoutCandidateInput = {
    where: Prisma.ClipDraftWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClipDraftUpdateWithoutCandidateInput, Prisma.ClipDraftUncheckedUpdateWithoutCandidateInput>;
};
export type ClipDraftUpdateManyWithWhereWithoutCandidateInput = {
    where: Prisma.ClipDraftScalarWhereInput;
    data: Prisma.XOR<Prisma.ClipDraftUpdateManyMutationInput, Prisma.ClipDraftUncheckedUpdateManyWithoutCandidateInput>;
};
export type ClipDraftCreateWithoutRenderJobsInput = {
    id?: string;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    video: Prisma.VideoCreateNestedOneWithoutClipDraftsInput;
    candidate?: Prisma.HighlightCandidateCreateNestedOneWithoutClipDraftsInput;
};
export type ClipDraftUncheckedCreateWithoutRenderJobsInput = {
    id?: string;
    videoId: string;
    candidateId?: string | null;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ClipDraftCreateOrConnectWithoutRenderJobsInput = {
    where: Prisma.ClipDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClipDraftCreateWithoutRenderJobsInput, Prisma.ClipDraftUncheckedCreateWithoutRenderJobsInput>;
};
export type ClipDraftUpsertWithoutRenderJobsInput = {
    update: Prisma.XOR<Prisma.ClipDraftUpdateWithoutRenderJobsInput, Prisma.ClipDraftUncheckedUpdateWithoutRenderJobsInput>;
    create: Prisma.XOR<Prisma.ClipDraftCreateWithoutRenderJobsInput, Prisma.ClipDraftUncheckedCreateWithoutRenderJobsInput>;
    where?: Prisma.ClipDraftWhereInput;
};
export type ClipDraftUpdateToOneWithWhereWithoutRenderJobsInput = {
    where?: Prisma.ClipDraftWhereInput;
    data: Prisma.XOR<Prisma.ClipDraftUpdateWithoutRenderJobsInput, Prisma.ClipDraftUncheckedUpdateWithoutRenderJobsInput>;
};
export type ClipDraftUpdateWithoutRenderJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    video?: Prisma.VideoUpdateOneRequiredWithoutClipDraftsNestedInput;
    candidate?: Prisma.HighlightCandidateUpdateOneWithoutClipDraftsNestedInput;
};
export type ClipDraftUncheckedUpdateWithoutRenderJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    videoId?: Prisma.StringFieldUpdateOperationsInput | string;
    candidateId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClipDraftCreateManyVideoInput = {
    id?: string;
    candidateId?: string | null;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ClipDraftUpdateWithoutVideoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    candidate?: Prisma.HighlightCandidateUpdateOneWithoutClipDraftsNestedInput;
    renderJobs?: Prisma.RenderJobUpdateManyWithoutClipNestedInput;
};
export type ClipDraftUncheckedUpdateWithoutVideoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    candidateId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    renderJobs?: Prisma.RenderJobUncheckedUpdateManyWithoutClipNestedInput;
};
export type ClipDraftUncheckedUpdateManyWithoutVideoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    candidateId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClipDraftCreateManyCandidateInput = {
    id?: string;
    videoId: string;
    startMs: number;
    endMs: number;
    peakMs?: number | null;
    title?: string | null;
    note?: string | null;
    status?: $Enums.ClipDraftStatus;
    sourcePreset?: $Enums.HighlightLengthPreset | null;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ClipDraftUpdateWithoutCandidateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    video?: Prisma.VideoUpdateOneRequiredWithoutClipDraftsNestedInput;
    renderJobs?: Prisma.RenderJobUpdateManyWithoutClipNestedInput;
};
export type ClipDraftUncheckedUpdateWithoutCandidateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    videoId?: Prisma.StringFieldUpdateOperationsInput | string;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    renderJobs?: Prisma.RenderJobUncheckedUpdateManyWithoutClipNestedInput;
};
export type ClipDraftUncheckedUpdateManyWithoutCandidateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    videoId?: Prisma.StringFieldUpdateOperationsInput | string;
    startMs?: Prisma.IntFieldUpdateOperationsInput | number;
    endMs?: Prisma.IntFieldUpdateOperationsInput | number;
    peakMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumClipDraftStatusFieldUpdateOperationsInput | $Enums.ClipDraftStatus;
    sourcePreset?: Prisma.NullableEnumHighlightLengthPresetFieldUpdateOperationsInput | $Enums.HighlightLengthPreset | null;
    isCustomized?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    candidateSnapshot?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    exportedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClipDraftCountOutputType = {
    renderJobs: number;
};
export type ClipDraftCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    renderJobs?: boolean | ClipDraftCountOutputTypeCountRenderJobsArgs;
};
export type ClipDraftCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftCountOutputTypeSelect<ExtArgs> | null;
};
export type ClipDraftCountOutputTypeCountRenderJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RenderJobWhereInput;
};
export type ClipDraftSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    videoId?: boolean;
    candidateId?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    peakMs?: boolean;
    title?: boolean;
    note?: boolean;
    status?: boolean;
    sourcePreset?: boolean;
    isCustomized?: boolean;
    candidateSnapshot?: boolean;
    exportedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    video?: boolean | Prisma.VideoDefaultArgs<ExtArgs>;
    candidate?: boolean | Prisma.ClipDraft$candidateArgs<ExtArgs>;
    renderJobs?: boolean | Prisma.ClipDraft$renderJobsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClipDraftCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["clipDraft"]>;
export type ClipDraftSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    videoId?: boolean;
    candidateId?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    peakMs?: boolean;
    title?: boolean;
    note?: boolean;
    status?: boolean;
    sourcePreset?: boolean;
    isCustomized?: boolean;
    candidateSnapshot?: boolean;
    exportedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    video?: boolean | Prisma.VideoDefaultArgs<ExtArgs>;
    candidate?: boolean | Prisma.ClipDraft$candidateArgs<ExtArgs>;
}, ExtArgs["result"]["clipDraft"]>;
export type ClipDraftSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    videoId?: boolean;
    candidateId?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    peakMs?: boolean;
    title?: boolean;
    note?: boolean;
    status?: boolean;
    sourcePreset?: boolean;
    isCustomized?: boolean;
    candidateSnapshot?: boolean;
    exportedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    video?: boolean | Prisma.VideoDefaultArgs<ExtArgs>;
    candidate?: boolean | Prisma.ClipDraft$candidateArgs<ExtArgs>;
}, ExtArgs["result"]["clipDraft"]>;
export type ClipDraftSelectScalar = {
    id?: boolean;
    videoId?: boolean;
    candidateId?: boolean;
    startMs?: boolean;
    endMs?: boolean;
    peakMs?: boolean;
    title?: boolean;
    note?: boolean;
    status?: boolean;
    sourcePreset?: boolean;
    isCustomized?: boolean;
    candidateSnapshot?: boolean;
    exportedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ClipDraftOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "videoId" | "candidateId" | "startMs" | "endMs" | "peakMs" | "title" | "note" | "status" | "sourcePreset" | "isCustomized" | "candidateSnapshot" | "exportedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["clipDraft"]>;
export type ClipDraftInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    video?: boolean | Prisma.VideoDefaultArgs<ExtArgs>;
    candidate?: boolean | Prisma.ClipDraft$candidateArgs<ExtArgs>;
    renderJobs?: boolean | Prisma.ClipDraft$renderJobsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClipDraftCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ClipDraftIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    video?: boolean | Prisma.VideoDefaultArgs<ExtArgs>;
    candidate?: boolean | Prisma.ClipDraft$candidateArgs<ExtArgs>;
};
export type ClipDraftIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    video?: boolean | Prisma.VideoDefaultArgs<ExtArgs>;
    candidate?: boolean | Prisma.ClipDraft$candidateArgs<ExtArgs>;
};
export type $ClipDraftPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ClipDraft";
    objects: {
        video: Prisma.$VideoPayload<ExtArgs>;
        candidate: Prisma.$HighlightCandidatePayload<ExtArgs> | null;
        renderJobs: Prisma.$RenderJobPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        videoId: string;
        candidateId: string | null;
        startMs: number;
        endMs: number;
        peakMs: number | null;
        title: string | null;
        note: string | null;
        status: $Enums.ClipDraftStatus;
        sourcePreset: $Enums.HighlightLengthPreset | null;
        isCustomized: boolean;
        candidateSnapshot: runtime.JsonValue | null;
        exportedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["clipDraft"]>;
    composites: {};
};
export type ClipDraftGetPayload<S extends boolean | null | undefined | ClipDraftDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload, S>;
export type ClipDraftCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClipDraftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClipDraftCountAggregateInputType | true;
};
export interface ClipDraftDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ClipDraft'];
        meta: {
            name: 'ClipDraft';
        };
    };
    findUnique<T extends ClipDraftFindUniqueArgs>(args: Prisma.SelectSubset<T, ClipDraftFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ClipDraftFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClipDraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ClipDraftFindFirstArgs>(args?: Prisma.SelectSubset<T, ClipDraftFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ClipDraftFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClipDraftFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ClipDraftFindManyArgs>(args?: Prisma.SelectSubset<T, ClipDraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ClipDraftCreateArgs>(args: Prisma.SelectSubset<T, ClipDraftCreateArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ClipDraftCreateManyArgs>(args?: Prisma.SelectSubset<T, ClipDraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ClipDraftCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ClipDraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ClipDraftDeleteArgs>(args: Prisma.SelectSubset<T, ClipDraftDeleteArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ClipDraftUpdateArgs>(args: Prisma.SelectSubset<T, ClipDraftUpdateArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ClipDraftDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClipDraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ClipDraftUpdateManyArgs>(args: Prisma.SelectSubset<T, ClipDraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ClipDraftUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ClipDraftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ClipDraftUpsertArgs>(args: Prisma.SelectSubset<T, ClipDraftUpsertArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ClipDraftCountArgs>(args?: Prisma.Subset<T, ClipDraftCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClipDraftCountAggregateOutputType> : number>;
    aggregate<T extends ClipDraftAggregateArgs>(args: Prisma.Subset<T, ClipDraftAggregateArgs>): Prisma.PrismaPromise<GetClipDraftAggregateType<T>>;
    groupBy<T extends ClipDraftGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClipDraftGroupByArgs['orderBy'];
    } : {
        orderBy?: ClipDraftGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClipDraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClipDraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ClipDraftFieldRefs;
}
export interface Prisma__ClipDraftClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    video<T extends Prisma.VideoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VideoDefaultArgs<ExtArgs>>): Prisma.Prisma__VideoClient<runtime.Types.Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    candidate<T extends Prisma.ClipDraft$candidateArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClipDraft$candidateArgs<ExtArgs>>): Prisma.Prisma__HighlightCandidateClient<runtime.Types.Result.GetResult<Prisma.$HighlightCandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    renderJobs<T extends Prisma.ClipDraft$renderJobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClipDraft$renderJobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ClipDraftFieldRefs {
    readonly id: Prisma.FieldRef<"ClipDraft", 'String'>;
    readonly videoId: Prisma.FieldRef<"ClipDraft", 'String'>;
    readonly candidateId: Prisma.FieldRef<"ClipDraft", 'String'>;
    readonly startMs: Prisma.FieldRef<"ClipDraft", 'Int'>;
    readonly endMs: Prisma.FieldRef<"ClipDraft", 'Int'>;
    readonly peakMs: Prisma.FieldRef<"ClipDraft", 'Int'>;
    readonly title: Prisma.FieldRef<"ClipDraft", 'String'>;
    readonly note: Prisma.FieldRef<"ClipDraft", 'String'>;
    readonly status: Prisma.FieldRef<"ClipDraft", 'ClipDraftStatus'>;
    readonly sourcePreset: Prisma.FieldRef<"ClipDraft", 'HighlightLengthPreset'>;
    readonly isCustomized: Prisma.FieldRef<"ClipDraft", 'Boolean'>;
    readonly candidateSnapshot: Prisma.FieldRef<"ClipDraft", 'Json'>;
    readonly exportedAt: Prisma.FieldRef<"ClipDraft", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ClipDraft", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ClipDraft", 'DateTime'>;
}
export type ClipDraftFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    where: Prisma.ClipDraftWhereUniqueInput;
};
export type ClipDraftFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    where: Prisma.ClipDraftWhereUniqueInput;
};
export type ClipDraftFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    where?: Prisma.ClipDraftWhereInput;
    orderBy?: Prisma.ClipDraftOrderByWithRelationInput | Prisma.ClipDraftOrderByWithRelationInput[];
    cursor?: Prisma.ClipDraftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClipDraftScalarFieldEnum | Prisma.ClipDraftScalarFieldEnum[];
};
export type ClipDraftFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    where?: Prisma.ClipDraftWhereInput;
    orderBy?: Prisma.ClipDraftOrderByWithRelationInput | Prisma.ClipDraftOrderByWithRelationInput[];
    cursor?: Prisma.ClipDraftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClipDraftScalarFieldEnum | Prisma.ClipDraftScalarFieldEnum[];
};
export type ClipDraftFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    where?: Prisma.ClipDraftWhereInput;
    orderBy?: Prisma.ClipDraftOrderByWithRelationInput | Prisma.ClipDraftOrderByWithRelationInput[];
    cursor?: Prisma.ClipDraftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClipDraftScalarFieldEnum | Prisma.ClipDraftScalarFieldEnum[];
};
export type ClipDraftCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClipDraftCreateInput, Prisma.ClipDraftUncheckedCreateInput>;
};
export type ClipDraftCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ClipDraftCreateManyInput | Prisma.ClipDraftCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClipDraftCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    data: Prisma.ClipDraftCreateManyInput | Prisma.ClipDraftCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ClipDraftIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ClipDraftUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClipDraftUpdateInput, Prisma.ClipDraftUncheckedUpdateInput>;
    where: Prisma.ClipDraftWhereUniqueInput;
};
export type ClipDraftUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ClipDraftUpdateManyMutationInput, Prisma.ClipDraftUncheckedUpdateManyInput>;
    where?: Prisma.ClipDraftWhereInput;
    limit?: number;
};
export type ClipDraftUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClipDraftUpdateManyMutationInput, Prisma.ClipDraftUncheckedUpdateManyInput>;
    where?: Prisma.ClipDraftWhereInput;
    limit?: number;
    include?: Prisma.ClipDraftIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ClipDraftUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    where: Prisma.ClipDraftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClipDraftCreateInput, Prisma.ClipDraftUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ClipDraftUpdateInput, Prisma.ClipDraftUncheckedUpdateInput>;
};
export type ClipDraftDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
    where: Prisma.ClipDraftWhereUniqueInput;
};
export type ClipDraftDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClipDraftWhereInput;
    limit?: number;
};
export type ClipDraft$candidateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HighlightCandidateSelect<ExtArgs> | null;
    omit?: Prisma.HighlightCandidateOmit<ExtArgs> | null;
    include?: Prisma.HighlightCandidateInclude<ExtArgs> | null;
    where?: Prisma.HighlightCandidateWhereInput;
};
export type ClipDraft$renderJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
    where?: Prisma.RenderJobWhereInput;
    orderBy?: Prisma.RenderJobOrderByWithRelationInput | Prisma.RenderJobOrderByWithRelationInput[];
    cursor?: Prisma.RenderJobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RenderJobScalarFieldEnum | Prisma.RenderJobScalarFieldEnum[];
};
export type ClipDraftDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClipDraftSelect<ExtArgs> | null;
    omit?: Prisma.ClipDraftOmit<ExtArgs> | null;
    include?: Prisma.ClipDraftInclude<ExtArgs> | null;
};
