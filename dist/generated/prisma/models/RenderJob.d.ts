import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RenderJobModel = runtime.Types.Result.DefaultSelection<Prisma.$RenderJobPayload>;
export type AggregateRenderJob = {
    _count: RenderJobCountAggregateOutputType | null;
    _avg: RenderJobAvgAggregateOutputType | null;
    _sum: RenderJobSumAggregateOutputType | null;
    _min: RenderJobMinAggregateOutputType | null;
    _max: RenderJobMaxAggregateOutputType | null;
};
export type RenderJobAvgAggregateOutputType = {
    progress: number | null;
};
export type RenderJobSumAggregateOutputType = {
    progress: number | null;
};
export type RenderJobMinAggregateOutputType = {
    id: string | null;
    clipId: string | null;
    status: $Enums.RenderJobStatus | null;
    progress: number | null;
    stage: string | null;
    format: string | null;
    resolution: string | null;
    mode: string | null;
    includeSubtitles: boolean | null;
    outputPath: string | null;
    outputFilename: string | null;
    errorMessage: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RenderJobMaxAggregateOutputType = {
    id: string | null;
    clipId: string | null;
    status: $Enums.RenderJobStatus | null;
    progress: number | null;
    stage: string | null;
    format: string | null;
    resolution: string | null;
    mode: string | null;
    includeSubtitles: boolean | null;
    outputPath: string | null;
    outputFilename: string | null;
    errorMessage: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RenderJobCountAggregateOutputType = {
    id: number;
    clipId: number;
    status: number;
    progress: number;
    stage: number;
    format: number;
    resolution: number;
    mode: number;
    includeSubtitles: number;
    outputPath: number;
    outputFilename: number;
    errorMessage: number;
    startedAt: number;
    completedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RenderJobAvgAggregateInputType = {
    progress?: true;
};
export type RenderJobSumAggregateInputType = {
    progress?: true;
};
export type RenderJobMinAggregateInputType = {
    id?: true;
    clipId?: true;
    status?: true;
    progress?: true;
    stage?: true;
    format?: true;
    resolution?: true;
    mode?: true;
    includeSubtitles?: true;
    outputPath?: true;
    outputFilename?: true;
    errorMessage?: true;
    startedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RenderJobMaxAggregateInputType = {
    id?: true;
    clipId?: true;
    status?: true;
    progress?: true;
    stage?: true;
    format?: true;
    resolution?: true;
    mode?: true;
    includeSubtitles?: true;
    outputPath?: true;
    outputFilename?: true;
    errorMessage?: true;
    startedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RenderJobCountAggregateInputType = {
    id?: true;
    clipId?: true;
    status?: true;
    progress?: true;
    stage?: true;
    format?: true;
    resolution?: true;
    mode?: true;
    includeSubtitles?: true;
    outputPath?: true;
    outputFilename?: true;
    errorMessage?: true;
    startedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RenderJobAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RenderJobWhereInput;
    orderBy?: Prisma.RenderJobOrderByWithRelationInput | Prisma.RenderJobOrderByWithRelationInput[];
    cursor?: Prisma.RenderJobWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RenderJobCountAggregateInputType;
    _avg?: RenderJobAvgAggregateInputType;
    _sum?: RenderJobSumAggregateInputType;
    _min?: RenderJobMinAggregateInputType;
    _max?: RenderJobMaxAggregateInputType;
};
export type GetRenderJobAggregateType<T extends RenderJobAggregateArgs> = {
    [P in keyof T & keyof AggregateRenderJob]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRenderJob[P]> : Prisma.GetScalarType<T[P], AggregateRenderJob[P]>;
};
export type RenderJobGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RenderJobWhereInput;
    orderBy?: Prisma.RenderJobOrderByWithAggregationInput | Prisma.RenderJobOrderByWithAggregationInput[];
    by: Prisma.RenderJobScalarFieldEnum[] | Prisma.RenderJobScalarFieldEnum;
    having?: Prisma.RenderJobScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RenderJobCountAggregateInputType | true;
    _avg?: RenderJobAvgAggregateInputType;
    _sum?: RenderJobSumAggregateInputType;
    _min?: RenderJobMinAggregateInputType;
    _max?: RenderJobMaxAggregateInputType;
};
export type RenderJobGroupByOutputType = {
    id: string;
    clipId: string;
    status: $Enums.RenderJobStatus;
    progress: number;
    stage: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles: boolean;
    outputPath: string | null;
    outputFilename: string | null;
    errorMessage: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: RenderJobCountAggregateOutputType | null;
    _avg: RenderJobAvgAggregateOutputType | null;
    _sum: RenderJobSumAggregateOutputType | null;
    _min: RenderJobMinAggregateOutputType | null;
    _max: RenderJobMaxAggregateOutputType | null;
};
export type GetRenderJobGroupByPayload<T extends RenderJobGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RenderJobGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RenderJobGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RenderJobGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RenderJobGroupByOutputType[P]>;
}>>;
export type RenderJobWhereInput = {
    AND?: Prisma.RenderJobWhereInput | Prisma.RenderJobWhereInput[];
    OR?: Prisma.RenderJobWhereInput[];
    NOT?: Prisma.RenderJobWhereInput | Prisma.RenderJobWhereInput[];
    id?: Prisma.StringFilter<"RenderJob"> | string;
    clipId?: Prisma.StringFilter<"RenderJob"> | string;
    status?: Prisma.EnumRenderJobStatusFilter<"RenderJob"> | $Enums.RenderJobStatus;
    progress?: Prisma.IntFilter<"RenderJob"> | number;
    stage?: Prisma.StringFilter<"RenderJob"> | string;
    format?: Prisma.StringFilter<"RenderJob"> | string;
    resolution?: Prisma.StringFilter<"RenderJob"> | string;
    mode?: Prisma.StringFilter<"RenderJob"> | string;
    includeSubtitles?: Prisma.BoolFilter<"RenderJob"> | boolean;
    outputPath?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    outputFilename?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"RenderJob"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"RenderJob"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RenderJob"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RenderJob"> | Date | string;
    clip?: Prisma.XOR<Prisma.ClipDraftScalarRelationFilter, Prisma.ClipDraftWhereInput>;
};
export type RenderJobOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    clipId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    includeSubtitles?: Prisma.SortOrder;
    outputPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    outputFilename?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    clip?: Prisma.ClipDraftOrderByWithRelationInput;
};
export type RenderJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RenderJobWhereInput | Prisma.RenderJobWhereInput[];
    OR?: Prisma.RenderJobWhereInput[];
    NOT?: Prisma.RenderJobWhereInput | Prisma.RenderJobWhereInput[];
    clipId?: Prisma.StringFilter<"RenderJob"> | string;
    status?: Prisma.EnumRenderJobStatusFilter<"RenderJob"> | $Enums.RenderJobStatus;
    progress?: Prisma.IntFilter<"RenderJob"> | number;
    stage?: Prisma.StringFilter<"RenderJob"> | string;
    format?: Prisma.StringFilter<"RenderJob"> | string;
    resolution?: Prisma.StringFilter<"RenderJob"> | string;
    mode?: Prisma.StringFilter<"RenderJob"> | string;
    includeSubtitles?: Prisma.BoolFilter<"RenderJob"> | boolean;
    outputPath?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    outputFilename?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"RenderJob"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"RenderJob"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RenderJob"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RenderJob"> | Date | string;
    clip?: Prisma.XOR<Prisma.ClipDraftScalarRelationFilter, Prisma.ClipDraftWhereInput>;
}, "id">;
export type RenderJobOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    clipId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    includeSubtitles?: Prisma.SortOrder;
    outputPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    outputFilename?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RenderJobCountOrderByAggregateInput;
    _avg?: Prisma.RenderJobAvgOrderByAggregateInput;
    _max?: Prisma.RenderJobMaxOrderByAggregateInput;
    _min?: Prisma.RenderJobMinOrderByAggregateInput;
    _sum?: Prisma.RenderJobSumOrderByAggregateInput;
};
export type RenderJobScalarWhereWithAggregatesInput = {
    AND?: Prisma.RenderJobScalarWhereWithAggregatesInput | Prisma.RenderJobScalarWhereWithAggregatesInput[];
    OR?: Prisma.RenderJobScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RenderJobScalarWhereWithAggregatesInput | Prisma.RenderJobScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RenderJob"> | string;
    clipId?: Prisma.StringWithAggregatesFilter<"RenderJob"> | string;
    status?: Prisma.EnumRenderJobStatusWithAggregatesFilter<"RenderJob"> | $Enums.RenderJobStatus;
    progress?: Prisma.IntWithAggregatesFilter<"RenderJob"> | number;
    stage?: Prisma.StringWithAggregatesFilter<"RenderJob"> | string;
    format?: Prisma.StringWithAggregatesFilter<"RenderJob"> | string;
    resolution?: Prisma.StringWithAggregatesFilter<"RenderJob"> | string;
    mode?: Prisma.StringWithAggregatesFilter<"RenderJob"> | string;
    includeSubtitles?: Prisma.BoolWithAggregatesFilter<"RenderJob"> | boolean;
    outputPath?: Prisma.StringNullableWithAggregatesFilter<"RenderJob"> | string | null;
    outputFilename?: Prisma.StringNullableWithAggregatesFilter<"RenderJob"> | string | null;
    errorMessage?: Prisma.StringNullableWithAggregatesFilter<"RenderJob"> | string | null;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RenderJob"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RenderJob"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RenderJob"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RenderJob"> | Date | string;
};
export type RenderJobCreateInput = {
    id?: string;
    status?: $Enums.RenderJobStatus;
    progress?: number;
    stage?: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles?: boolean;
    outputPath?: string | null;
    outputFilename?: string | null;
    errorMessage?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    clip: Prisma.ClipDraftCreateNestedOneWithoutRenderJobsInput;
};
export type RenderJobUncheckedCreateInput = {
    id?: string;
    clipId: string;
    status?: $Enums.RenderJobStatus;
    progress?: number;
    stage?: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles?: boolean;
    outputPath?: string | null;
    outputFilename?: string | null;
    errorMessage?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RenderJobUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRenderJobStatusFieldUpdateOperationsInput | $Enums.RenderJobStatus;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    stage?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    resolution?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    includeSubtitles?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outputPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputFilename?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    clip?: Prisma.ClipDraftUpdateOneRequiredWithoutRenderJobsNestedInput;
};
export type RenderJobUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clipId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRenderJobStatusFieldUpdateOperationsInput | $Enums.RenderJobStatus;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    stage?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    resolution?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    includeSubtitles?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outputPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputFilename?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RenderJobCreateManyInput = {
    id?: string;
    clipId: string;
    status?: $Enums.RenderJobStatus;
    progress?: number;
    stage?: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles?: boolean;
    outputPath?: string | null;
    outputFilename?: string | null;
    errorMessage?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RenderJobUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRenderJobStatusFieldUpdateOperationsInput | $Enums.RenderJobStatus;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    stage?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    resolution?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    includeSubtitles?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outputPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputFilename?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RenderJobUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clipId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRenderJobStatusFieldUpdateOperationsInput | $Enums.RenderJobStatus;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    stage?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    resolution?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    includeSubtitles?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outputPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputFilename?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RenderJobListRelationFilter = {
    every?: Prisma.RenderJobWhereInput;
    some?: Prisma.RenderJobWhereInput;
    none?: Prisma.RenderJobWhereInput;
};
export type RenderJobOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RenderJobCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clipId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    includeSubtitles?: Prisma.SortOrder;
    outputPath?: Prisma.SortOrder;
    outputFilename?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RenderJobAvgOrderByAggregateInput = {
    progress?: Prisma.SortOrder;
};
export type RenderJobMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clipId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    includeSubtitles?: Prisma.SortOrder;
    outputPath?: Prisma.SortOrder;
    outputFilename?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RenderJobMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clipId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    includeSubtitles?: Prisma.SortOrder;
    outputPath?: Prisma.SortOrder;
    outputFilename?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RenderJobSumOrderByAggregateInput = {
    progress?: Prisma.SortOrder;
};
export type RenderJobCreateNestedManyWithoutClipInput = {
    create?: Prisma.XOR<Prisma.RenderJobCreateWithoutClipInput, Prisma.RenderJobUncheckedCreateWithoutClipInput> | Prisma.RenderJobCreateWithoutClipInput[] | Prisma.RenderJobUncheckedCreateWithoutClipInput[];
    connectOrCreate?: Prisma.RenderJobCreateOrConnectWithoutClipInput | Prisma.RenderJobCreateOrConnectWithoutClipInput[];
    createMany?: Prisma.RenderJobCreateManyClipInputEnvelope;
    connect?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
};
export type RenderJobUncheckedCreateNestedManyWithoutClipInput = {
    create?: Prisma.XOR<Prisma.RenderJobCreateWithoutClipInput, Prisma.RenderJobUncheckedCreateWithoutClipInput> | Prisma.RenderJobCreateWithoutClipInput[] | Prisma.RenderJobUncheckedCreateWithoutClipInput[];
    connectOrCreate?: Prisma.RenderJobCreateOrConnectWithoutClipInput | Prisma.RenderJobCreateOrConnectWithoutClipInput[];
    createMany?: Prisma.RenderJobCreateManyClipInputEnvelope;
    connect?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
};
export type RenderJobUpdateManyWithoutClipNestedInput = {
    create?: Prisma.XOR<Prisma.RenderJobCreateWithoutClipInput, Prisma.RenderJobUncheckedCreateWithoutClipInput> | Prisma.RenderJobCreateWithoutClipInput[] | Prisma.RenderJobUncheckedCreateWithoutClipInput[];
    connectOrCreate?: Prisma.RenderJobCreateOrConnectWithoutClipInput | Prisma.RenderJobCreateOrConnectWithoutClipInput[];
    upsert?: Prisma.RenderJobUpsertWithWhereUniqueWithoutClipInput | Prisma.RenderJobUpsertWithWhereUniqueWithoutClipInput[];
    createMany?: Prisma.RenderJobCreateManyClipInputEnvelope;
    set?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    disconnect?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    delete?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    connect?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    update?: Prisma.RenderJobUpdateWithWhereUniqueWithoutClipInput | Prisma.RenderJobUpdateWithWhereUniqueWithoutClipInput[];
    updateMany?: Prisma.RenderJobUpdateManyWithWhereWithoutClipInput | Prisma.RenderJobUpdateManyWithWhereWithoutClipInput[];
    deleteMany?: Prisma.RenderJobScalarWhereInput | Prisma.RenderJobScalarWhereInput[];
};
export type RenderJobUncheckedUpdateManyWithoutClipNestedInput = {
    create?: Prisma.XOR<Prisma.RenderJobCreateWithoutClipInput, Prisma.RenderJobUncheckedCreateWithoutClipInput> | Prisma.RenderJobCreateWithoutClipInput[] | Prisma.RenderJobUncheckedCreateWithoutClipInput[];
    connectOrCreate?: Prisma.RenderJobCreateOrConnectWithoutClipInput | Prisma.RenderJobCreateOrConnectWithoutClipInput[];
    upsert?: Prisma.RenderJobUpsertWithWhereUniqueWithoutClipInput | Prisma.RenderJobUpsertWithWhereUniqueWithoutClipInput[];
    createMany?: Prisma.RenderJobCreateManyClipInputEnvelope;
    set?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    disconnect?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    delete?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    connect?: Prisma.RenderJobWhereUniqueInput | Prisma.RenderJobWhereUniqueInput[];
    update?: Prisma.RenderJobUpdateWithWhereUniqueWithoutClipInput | Prisma.RenderJobUpdateWithWhereUniqueWithoutClipInput[];
    updateMany?: Prisma.RenderJobUpdateManyWithWhereWithoutClipInput | Prisma.RenderJobUpdateManyWithWhereWithoutClipInput[];
    deleteMany?: Prisma.RenderJobScalarWhereInput | Prisma.RenderJobScalarWhereInput[];
};
export type EnumRenderJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.RenderJobStatus;
};
export type RenderJobCreateWithoutClipInput = {
    id?: string;
    status?: $Enums.RenderJobStatus;
    progress?: number;
    stage?: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles?: boolean;
    outputPath?: string | null;
    outputFilename?: string | null;
    errorMessage?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RenderJobUncheckedCreateWithoutClipInput = {
    id?: string;
    status?: $Enums.RenderJobStatus;
    progress?: number;
    stage?: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles?: boolean;
    outputPath?: string | null;
    outputFilename?: string | null;
    errorMessage?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RenderJobCreateOrConnectWithoutClipInput = {
    where: Prisma.RenderJobWhereUniqueInput;
    create: Prisma.XOR<Prisma.RenderJobCreateWithoutClipInput, Prisma.RenderJobUncheckedCreateWithoutClipInput>;
};
export type RenderJobCreateManyClipInputEnvelope = {
    data: Prisma.RenderJobCreateManyClipInput | Prisma.RenderJobCreateManyClipInput[];
    skipDuplicates?: boolean;
};
export type RenderJobUpsertWithWhereUniqueWithoutClipInput = {
    where: Prisma.RenderJobWhereUniqueInput;
    update: Prisma.XOR<Prisma.RenderJobUpdateWithoutClipInput, Prisma.RenderJobUncheckedUpdateWithoutClipInput>;
    create: Prisma.XOR<Prisma.RenderJobCreateWithoutClipInput, Prisma.RenderJobUncheckedCreateWithoutClipInput>;
};
export type RenderJobUpdateWithWhereUniqueWithoutClipInput = {
    where: Prisma.RenderJobWhereUniqueInput;
    data: Prisma.XOR<Prisma.RenderJobUpdateWithoutClipInput, Prisma.RenderJobUncheckedUpdateWithoutClipInput>;
};
export type RenderJobUpdateManyWithWhereWithoutClipInput = {
    where: Prisma.RenderJobScalarWhereInput;
    data: Prisma.XOR<Prisma.RenderJobUpdateManyMutationInput, Prisma.RenderJobUncheckedUpdateManyWithoutClipInput>;
};
export type RenderJobScalarWhereInput = {
    AND?: Prisma.RenderJobScalarWhereInput | Prisma.RenderJobScalarWhereInput[];
    OR?: Prisma.RenderJobScalarWhereInput[];
    NOT?: Prisma.RenderJobScalarWhereInput | Prisma.RenderJobScalarWhereInput[];
    id?: Prisma.StringFilter<"RenderJob"> | string;
    clipId?: Prisma.StringFilter<"RenderJob"> | string;
    status?: Prisma.EnumRenderJobStatusFilter<"RenderJob"> | $Enums.RenderJobStatus;
    progress?: Prisma.IntFilter<"RenderJob"> | number;
    stage?: Prisma.StringFilter<"RenderJob"> | string;
    format?: Prisma.StringFilter<"RenderJob"> | string;
    resolution?: Prisma.StringFilter<"RenderJob"> | string;
    mode?: Prisma.StringFilter<"RenderJob"> | string;
    includeSubtitles?: Prisma.BoolFilter<"RenderJob"> | boolean;
    outputPath?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    outputFilename?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"RenderJob"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"RenderJob"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"RenderJob"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RenderJob"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RenderJob"> | Date | string;
};
export type RenderJobCreateManyClipInput = {
    id?: string;
    status?: $Enums.RenderJobStatus;
    progress?: number;
    stage?: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles?: boolean;
    outputPath?: string | null;
    outputFilename?: string | null;
    errorMessage?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RenderJobUpdateWithoutClipInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRenderJobStatusFieldUpdateOperationsInput | $Enums.RenderJobStatus;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    stage?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    resolution?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    includeSubtitles?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outputPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputFilename?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RenderJobUncheckedUpdateWithoutClipInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRenderJobStatusFieldUpdateOperationsInput | $Enums.RenderJobStatus;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    stage?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    resolution?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    includeSubtitles?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outputPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputFilename?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RenderJobUncheckedUpdateManyWithoutClipInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRenderJobStatusFieldUpdateOperationsInput | $Enums.RenderJobStatus;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    stage?: Prisma.StringFieldUpdateOperationsInput | string;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    resolution?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.StringFieldUpdateOperationsInput | string;
    includeSubtitles?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outputPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outputFilename?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RenderJobSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clipId?: boolean;
    status?: boolean;
    progress?: boolean;
    stage?: boolean;
    format?: boolean;
    resolution?: boolean;
    mode?: boolean;
    includeSubtitles?: boolean;
    outputPath?: boolean;
    outputFilename?: boolean;
    errorMessage?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    clip?: boolean | Prisma.ClipDraftDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["renderJob"]>;
export type RenderJobSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clipId?: boolean;
    status?: boolean;
    progress?: boolean;
    stage?: boolean;
    format?: boolean;
    resolution?: boolean;
    mode?: boolean;
    includeSubtitles?: boolean;
    outputPath?: boolean;
    outputFilename?: boolean;
    errorMessage?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    clip?: boolean | Prisma.ClipDraftDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["renderJob"]>;
export type RenderJobSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clipId?: boolean;
    status?: boolean;
    progress?: boolean;
    stage?: boolean;
    format?: boolean;
    resolution?: boolean;
    mode?: boolean;
    includeSubtitles?: boolean;
    outputPath?: boolean;
    outputFilename?: boolean;
    errorMessage?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    clip?: boolean | Prisma.ClipDraftDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["renderJob"]>;
export type RenderJobSelectScalar = {
    id?: boolean;
    clipId?: boolean;
    status?: boolean;
    progress?: boolean;
    stage?: boolean;
    format?: boolean;
    resolution?: boolean;
    mode?: boolean;
    includeSubtitles?: boolean;
    outputPath?: boolean;
    outputFilename?: boolean;
    errorMessage?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RenderJobOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "clipId" | "status" | "progress" | "stage" | "format" | "resolution" | "mode" | "includeSubtitles" | "outputPath" | "outputFilename" | "errorMessage" | "startedAt" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["renderJob"]>;
export type RenderJobInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    clip?: boolean | Prisma.ClipDraftDefaultArgs<ExtArgs>;
};
export type RenderJobIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    clip?: boolean | Prisma.ClipDraftDefaultArgs<ExtArgs>;
};
export type RenderJobIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    clip?: boolean | Prisma.ClipDraftDefaultArgs<ExtArgs>;
};
export type $RenderJobPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RenderJob";
    objects: {
        clip: Prisma.$ClipDraftPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        clipId: string;
        status: $Enums.RenderJobStatus;
        progress: number;
        stage: string;
        format: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["renderJob"]>;
    composites: {};
};
export type RenderJobGetPayload<S extends boolean | null | undefined | RenderJobDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RenderJobPayload, S>;
export type RenderJobCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RenderJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RenderJobCountAggregateInputType | true;
};
export interface RenderJobDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RenderJob'];
        meta: {
            name: 'RenderJob';
        };
    };
    findUnique<T extends RenderJobFindUniqueArgs>(args: Prisma.SelectSubset<T, RenderJobFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RenderJobFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RenderJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RenderJobFindFirstArgs>(args?: Prisma.SelectSubset<T, RenderJobFindFirstArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RenderJobFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RenderJobFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RenderJobFindManyArgs>(args?: Prisma.SelectSubset<T, RenderJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RenderJobCreateArgs>(args: Prisma.SelectSubset<T, RenderJobCreateArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RenderJobCreateManyArgs>(args?: Prisma.SelectSubset<T, RenderJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RenderJobCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RenderJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RenderJobDeleteArgs>(args: Prisma.SelectSubset<T, RenderJobDeleteArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RenderJobUpdateArgs>(args: Prisma.SelectSubset<T, RenderJobUpdateArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RenderJobDeleteManyArgs>(args?: Prisma.SelectSubset<T, RenderJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RenderJobUpdateManyArgs>(args: Prisma.SelectSubset<T, RenderJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RenderJobUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RenderJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RenderJobUpsertArgs>(args: Prisma.SelectSubset<T, RenderJobUpsertArgs<ExtArgs>>): Prisma.Prisma__RenderJobClient<runtime.Types.Result.GetResult<Prisma.$RenderJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RenderJobCountArgs>(args?: Prisma.Subset<T, RenderJobCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RenderJobCountAggregateOutputType> : number>;
    aggregate<T extends RenderJobAggregateArgs>(args: Prisma.Subset<T, RenderJobAggregateArgs>): Prisma.PrismaPromise<GetRenderJobAggregateType<T>>;
    groupBy<T extends RenderJobGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RenderJobGroupByArgs['orderBy'];
    } : {
        orderBy?: RenderJobGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RenderJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRenderJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RenderJobFieldRefs;
}
export interface Prisma__RenderJobClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    clip<T extends Prisma.ClipDraftDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClipDraftDefaultArgs<ExtArgs>>): Prisma.Prisma__ClipDraftClient<runtime.Types.Result.GetResult<Prisma.$ClipDraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RenderJobFieldRefs {
    readonly id: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly clipId: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly status: Prisma.FieldRef<"RenderJob", 'RenderJobStatus'>;
    readonly progress: Prisma.FieldRef<"RenderJob", 'Int'>;
    readonly stage: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly format: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly resolution: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly mode: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly includeSubtitles: Prisma.FieldRef<"RenderJob", 'Boolean'>;
    readonly outputPath: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly outputFilename: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly errorMessage: Prisma.FieldRef<"RenderJob", 'String'>;
    readonly startedAt: Prisma.FieldRef<"RenderJob", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"RenderJob", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"RenderJob", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"RenderJob", 'DateTime'>;
}
export type RenderJobFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
    where: Prisma.RenderJobWhereUniqueInput;
};
export type RenderJobFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
    where: Prisma.RenderJobWhereUniqueInput;
};
export type RenderJobFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RenderJobFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RenderJobFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RenderJobCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RenderJobCreateInput, Prisma.RenderJobUncheckedCreateInput>;
};
export type RenderJobCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RenderJobCreateManyInput | Prisma.RenderJobCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RenderJobCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    data: Prisma.RenderJobCreateManyInput | Prisma.RenderJobCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RenderJobIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RenderJobUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RenderJobUpdateInput, Prisma.RenderJobUncheckedUpdateInput>;
    where: Prisma.RenderJobWhereUniqueInput;
};
export type RenderJobUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RenderJobUpdateManyMutationInput, Prisma.RenderJobUncheckedUpdateManyInput>;
    where?: Prisma.RenderJobWhereInput;
    limit?: number;
};
export type RenderJobUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RenderJobUpdateManyMutationInput, Prisma.RenderJobUncheckedUpdateManyInput>;
    where?: Prisma.RenderJobWhereInput;
    limit?: number;
    include?: Prisma.RenderJobIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RenderJobUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
    where: Prisma.RenderJobWhereUniqueInput;
    create: Prisma.XOR<Prisma.RenderJobCreateInput, Prisma.RenderJobUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RenderJobUpdateInput, Prisma.RenderJobUncheckedUpdateInput>;
};
export type RenderJobDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
    where: Prisma.RenderJobWhereUniqueInput;
};
export type RenderJobDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RenderJobWhereInput;
    limit?: number;
};
export type RenderJobDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RenderJobSelect<ExtArgs> | null;
    omit?: Prisma.RenderJobOmit<ExtArgs> | null;
    include?: Prisma.RenderJobInclude<ExtArgs> | null;
};
