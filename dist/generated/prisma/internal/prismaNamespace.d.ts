import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly IngestionRun: "IngestionRun";
    readonly Video: "Video";
    readonly TranscriptSegment: "TranscriptSegment";
    readonly ChatMessage: "ChatMessage";
    readonly AnalysisWindow: "AnalysisWindow";
    readonly AnalysisTermCount: "AnalysisTermCount";
    readonly WindowSummary: "WindowSummary";
    readonly HighlightCandidate: "HighlightCandidate";
    readonly HighlightCandidateWindow: "HighlightCandidateWindow";
    readonly ClipDraft: "ClipDraft";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "ingestionRun" | "video" | "transcriptSegment" | "chatMessage" | "analysisWindow" | "analysisTermCount" | "windowSummary" | "highlightCandidate" | "highlightCandidateWindow" | "clipDraft";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        IngestionRun: {
            payload: Prisma.$IngestionRunPayload<ExtArgs>;
            fields: Prisma.IngestionRunFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IngestionRunFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IngestionRunFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>;
                };
                findFirst: {
                    args: Prisma.IngestionRunFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IngestionRunFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>;
                };
                findMany: {
                    args: Prisma.IngestionRunFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>[];
                };
                create: {
                    args: Prisma.IngestionRunCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>;
                };
                createMany: {
                    args: Prisma.IngestionRunCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.IngestionRunCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>[];
                };
                delete: {
                    args: Prisma.IngestionRunDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>;
                };
                update: {
                    args: Prisma.IngestionRunUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>;
                };
                deleteMany: {
                    args: Prisma.IngestionRunDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IngestionRunUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IngestionRunUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>[];
                };
                upsert: {
                    args: Prisma.IngestionRunUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IngestionRunPayload>;
                };
                aggregate: {
                    args: Prisma.IngestionRunAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIngestionRun>;
                };
                groupBy: {
                    args: Prisma.IngestionRunGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IngestionRunGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IngestionRunCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IngestionRunCountAggregateOutputType> | number;
                };
            };
        };
        Video: {
            payload: Prisma.$VideoPayload<ExtArgs>;
            fields: Prisma.VideoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VideoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VideoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>;
                };
                findFirst: {
                    args: Prisma.VideoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VideoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>;
                };
                findMany: {
                    args: Prisma.VideoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>[];
                };
                create: {
                    args: Prisma.VideoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>;
                };
                createMany: {
                    args: Prisma.VideoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VideoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>[];
                };
                delete: {
                    args: Prisma.VideoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>;
                };
                update: {
                    args: Prisma.VideoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>;
                };
                deleteMany: {
                    args: Prisma.VideoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VideoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VideoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>[];
                };
                upsert: {
                    args: Prisma.VideoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VideoPayload>;
                };
                aggregate: {
                    args: Prisma.VideoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVideo>;
                };
                groupBy: {
                    args: Prisma.VideoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VideoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VideoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VideoCountAggregateOutputType> | number;
                };
            };
        };
        TranscriptSegment: {
            payload: Prisma.$TranscriptSegmentPayload<ExtArgs>;
            fields: Prisma.TranscriptSegmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TranscriptSegmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TranscriptSegmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>;
                };
                findFirst: {
                    args: Prisma.TranscriptSegmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TranscriptSegmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>;
                };
                findMany: {
                    args: Prisma.TranscriptSegmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>[];
                };
                create: {
                    args: Prisma.TranscriptSegmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>;
                };
                createMany: {
                    args: Prisma.TranscriptSegmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TranscriptSegmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>[];
                };
                delete: {
                    args: Prisma.TranscriptSegmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>;
                };
                update: {
                    args: Prisma.TranscriptSegmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>;
                };
                deleteMany: {
                    args: Prisma.TranscriptSegmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TranscriptSegmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TranscriptSegmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>[];
                };
                upsert: {
                    args: Prisma.TranscriptSegmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TranscriptSegmentPayload>;
                };
                aggregate: {
                    args: Prisma.TranscriptSegmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTranscriptSegment>;
                };
                groupBy: {
                    args: Prisma.TranscriptSegmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TranscriptSegmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TranscriptSegmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TranscriptSegmentCountAggregateOutputType> | number;
                };
            };
        };
        ChatMessage: {
            payload: Prisma.$ChatMessagePayload<ExtArgs>;
            fields: Prisma.ChatMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findFirst: {
                    args: Prisma.ChatMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findMany: {
                    args: Prisma.ChatMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                create: {
                    args: Prisma.ChatMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                createMany: {
                    args: Prisma.ChatMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                delete: {
                    args: Prisma.ChatMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                update: {
                    args: Prisma.ChatMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                upsert: {
                    args: Prisma.ChatMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                aggregate: {
                    args: Prisma.ChatMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatMessage>;
                };
                groupBy: {
                    args: Prisma.ChatMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageCountAggregateOutputType> | number;
                };
            };
        };
        AnalysisWindow: {
            payload: Prisma.$AnalysisWindowPayload<ExtArgs>;
            fields: Prisma.AnalysisWindowFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AnalysisWindowFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AnalysisWindowFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>;
                };
                findFirst: {
                    args: Prisma.AnalysisWindowFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AnalysisWindowFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>;
                };
                findMany: {
                    args: Prisma.AnalysisWindowFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>[];
                };
                create: {
                    args: Prisma.AnalysisWindowCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>;
                };
                createMany: {
                    args: Prisma.AnalysisWindowCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AnalysisWindowCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>[];
                };
                delete: {
                    args: Prisma.AnalysisWindowDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>;
                };
                update: {
                    args: Prisma.AnalysisWindowUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>;
                };
                deleteMany: {
                    args: Prisma.AnalysisWindowDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AnalysisWindowUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AnalysisWindowUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>[];
                };
                upsert: {
                    args: Prisma.AnalysisWindowUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisWindowPayload>;
                };
                aggregate: {
                    args: Prisma.AnalysisWindowAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAnalysisWindow>;
                };
                groupBy: {
                    args: Prisma.AnalysisWindowGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnalysisWindowGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AnalysisWindowCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnalysisWindowCountAggregateOutputType> | number;
                };
            };
        };
        AnalysisTermCount: {
            payload: Prisma.$AnalysisTermCountPayload<ExtArgs>;
            fields: Prisma.AnalysisTermCountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AnalysisTermCountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AnalysisTermCountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>;
                };
                findFirst: {
                    args: Prisma.AnalysisTermCountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AnalysisTermCountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>;
                };
                findMany: {
                    args: Prisma.AnalysisTermCountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>[];
                };
                create: {
                    args: Prisma.AnalysisTermCountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>;
                };
                createMany: {
                    args: Prisma.AnalysisTermCountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AnalysisTermCountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>[];
                };
                delete: {
                    args: Prisma.AnalysisTermCountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>;
                };
                update: {
                    args: Prisma.AnalysisTermCountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>;
                };
                deleteMany: {
                    args: Prisma.AnalysisTermCountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AnalysisTermCountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AnalysisTermCountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>[];
                };
                upsert: {
                    args: Prisma.AnalysisTermCountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AnalysisTermCountPayload>;
                };
                aggregate: {
                    args: Prisma.AnalysisTermCountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAnalysisTermCount>;
                };
                groupBy: {
                    args: Prisma.AnalysisTermCountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnalysisTermCountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AnalysisTermCountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnalysisTermCountCountAggregateOutputType> | number;
                };
            };
        };
        WindowSummary: {
            payload: Prisma.$WindowSummaryPayload<ExtArgs>;
            fields: Prisma.WindowSummaryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WindowSummaryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WindowSummaryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>;
                };
                findFirst: {
                    args: Prisma.WindowSummaryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WindowSummaryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>;
                };
                findMany: {
                    args: Prisma.WindowSummaryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>[];
                };
                create: {
                    args: Prisma.WindowSummaryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>;
                };
                createMany: {
                    args: Prisma.WindowSummaryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WindowSummaryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>[];
                };
                delete: {
                    args: Prisma.WindowSummaryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>;
                };
                update: {
                    args: Prisma.WindowSummaryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>;
                };
                deleteMany: {
                    args: Prisma.WindowSummaryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WindowSummaryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WindowSummaryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>[];
                };
                upsert: {
                    args: Prisma.WindowSummaryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WindowSummaryPayload>;
                };
                aggregate: {
                    args: Prisma.WindowSummaryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWindowSummary>;
                };
                groupBy: {
                    args: Prisma.WindowSummaryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WindowSummaryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WindowSummaryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WindowSummaryCountAggregateOutputType> | number;
                };
            };
        };
        HighlightCandidate: {
            payload: Prisma.$HighlightCandidatePayload<ExtArgs>;
            fields: Prisma.HighlightCandidateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HighlightCandidateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HighlightCandidateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>;
                };
                findFirst: {
                    args: Prisma.HighlightCandidateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HighlightCandidateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>;
                };
                findMany: {
                    args: Prisma.HighlightCandidateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>[];
                };
                create: {
                    args: Prisma.HighlightCandidateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>;
                };
                createMany: {
                    args: Prisma.HighlightCandidateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HighlightCandidateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>[];
                };
                delete: {
                    args: Prisma.HighlightCandidateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>;
                };
                update: {
                    args: Prisma.HighlightCandidateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>;
                };
                deleteMany: {
                    args: Prisma.HighlightCandidateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HighlightCandidateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HighlightCandidateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>[];
                };
                upsert: {
                    args: Prisma.HighlightCandidateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidatePayload>;
                };
                aggregate: {
                    args: Prisma.HighlightCandidateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHighlightCandidate>;
                };
                groupBy: {
                    args: Prisma.HighlightCandidateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HighlightCandidateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HighlightCandidateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HighlightCandidateCountAggregateOutputType> | number;
                };
            };
        };
        HighlightCandidateWindow: {
            payload: Prisma.$HighlightCandidateWindowPayload<ExtArgs>;
            fields: Prisma.HighlightCandidateWindowFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HighlightCandidateWindowFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HighlightCandidateWindowFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>;
                };
                findFirst: {
                    args: Prisma.HighlightCandidateWindowFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HighlightCandidateWindowFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>;
                };
                findMany: {
                    args: Prisma.HighlightCandidateWindowFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>[];
                };
                create: {
                    args: Prisma.HighlightCandidateWindowCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>;
                };
                createMany: {
                    args: Prisma.HighlightCandidateWindowCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HighlightCandidateWindowCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>[];
                };
                delete: {
                    args: Prisma.HighlightCandidateWindowDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>;
                };
                update: {
                    args: Prisma.HighlightCandidateWindowUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>;
                };
                deleteMany: {
                    args: Prisma.HighlightCandidateWindowDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HighlightCandidateWindowUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HighlightCandidateWindowUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>[];
                };
                upsert: {
                    args: Prisma.HighlightCandidateWindowUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HighlightCandidateWindowPayload>;
                };
                aggregate: {
                    args: Prisma.HighlightCandidateWindowAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHighlightCandidateWindow>;
                };
                groupBy: {
                    args: Prisma.HighlightCandidateWindowGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HighlightCandidateWindowGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HighlightCandidateWindowCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HighlightCandidateWindowCountAggregateOutputType> | number;
                };
            };
        };
        ClipDraft: {
            payload: Prisma.$ClipDraftPayload<ExtArgs>;
            fields: Prisma.ClipDraftFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ClipDraftFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ClipDraftFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>;
                };
                findFirst: {
                    args: Prisma.ClipDraftFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ClipDraftFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>;
                };
                findMany: {
                    args: Prisma.ClipDraftFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>[];
                };
                create: {
                    args: Prisma.ClipDraftCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>;
                };
                createMany: {
                    args: Prisma.ClipDraftCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ClipDraftCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>[];
                };
                delete: {
                    args: Prisma.ClipDraftDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>;
                };
                update: {
                    args: Prisma.ClipDraftUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>;
                };
                deleteMany: {
                    args: Prisma.ClipDraftDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ClipDraftUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ClipDraftUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>[];
                };
                upsert: {
                    args: Prisma.ClipDraftUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClipDraftPayload>;
                };
                aggregate: {
                    args: Prisma.ClipDraftAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateClipDraft>;
                };
                groupBy: {
                    args: Prisma.ClipDraftGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClipDraftGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ClipDraftCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClipDraftCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const IngestionRunScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly status: "status";
    readonly provider: "provider";
    readonly collector: "collector";
    readonly dataType: "dataType";
    readonly filename: "filename";
    readonly mimeType: "mimeType";
    readonly sizeBytes: "sizeBytes";
    readonly checksum: "checksum";
    readonly rawFilePath: "rawFilePath";
    readonly videoId: "videoId";
    readonly transcriptCount: "transcriptCount";
    readonly chatCount: "chatCount";
    readonly errorCode: "errorCode";
    readonly errorMessage: "errorMessage";
    readonly metadata: "metadata";
    readonly startedAt: "startedAt";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type IngestionRunScalarFieldEnum = (typeof IngestionRunScalarFieldEnum)[keyof typeof IngestionRunScalarFieldEnum];
export declare const VideoScalarFieldEnum: {
    readonly id: "id";
    readonly provider: "provider";
    readonly externalId: "externalId";
    readonly url: "url";
    readonly title: "title";
    readonly description: "description";
    readonly channelExternalId: "channelExternalId";
    readonly channelName: "channelName";
    readonly channelUrl: "channelUrl";
    readonly channelFollowers: "channelFollowers";
    readonly uploadDate: "uploadDate";
    readonly publishedAt: "publishedAt";
    readonly releaseAt: "releaseAt";
    readonly viewCount: "viewCount";
    readonly likeCount: "likeCount";
    readonly commentCount: "commentCount";
    readonly durationMs: "durationMs";
    readonly thumbnailUrl: "thumbnailUrl";
    readonly width: "width";
    readonly height: "height";
    readonly fps: "fps";
    readonly liveStatus: "liveStatus";
    readonly isLive: "isLive";
    readonly wasLive: "wasLive";
    readonly concurrentViewers: "concurrentViewers";
    readonly language: "language";
    readonly availability: "availability";
    readonly ageLimit: "ageLimit";
    readonly tags: "tags";
    readonly categories: "categories";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VideoScalarFieldEnum = (typeof VideoScalarFieldEnum)[keyof typeof VideoScalarFieldEnum];
export declare const TranscriptSegmentScalarFieldEnum: {
    readonly id: "id";
    readonly videoId: "videoId";
    readonly sequence: "sequence";
    readonly startMs: "startMs";
    readonly endMs: "endMs";
    readonly durationMs: "durationMs";
    readonly text: "text";
    readonly language: "language";
    readonly source: "source";
    readonly format: "format";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TranscriptSegmentScalarFieldEnum = (typeof TranscriptSegmentScalarFieldEnum)[keyof typeof TranscriptSegmentScalarFieldEnum];
export declare const ChatMessageScalarFieldEnum: {
    readonly id: "id";
    readonly videoId: "videoId";
    readonly externalId: "externalId";
    readonly dedupeKey: "dedupeKey";
    readonly sequence: "sequence";
    readonly timestampMs: "timestampMs";
    readonly timestampUsec: "timestampUsec";
    readonly authorId: "authorId";
    readonly authorName: "authorName";
    readonly message: "message";
    readonly messageType: "messageType";
    readonly amountRaw: "amountRaw";
    readonly isMember: "isMember";
    readonly isModerator: "isModerator";
    readonly isOwner: "isOwner";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum];
export declare const AnalysisWindowScalarFieldEnum: {
    readonly id: "id";
    readonly videoId: "videoId";
    readonly windowIndex: "windowIndex";
    readonly startMs: "startMs";
    readonly endMs: "endMs";
    readonly windowSizeMs: "windowSizeMs";
    readonly chatMessageCount: "chatMessageCount";
    readonly uniqueAuthorCount: "uniqueAuthorCount";
    readonly chatWordCount: "chatWordCount";
    readonly transcriptWordCount: "transcriptWordCount";
    readonly emojiCount: "emojiCount";
    readonly laughCount: "laughCount";
    readonly questionCount: "questionCount";
    readonly exclamationCount: "exclamationCount";
    readonly capsCount: "capsCount";
    readonly authorDiversity: "authorDiversity";
    readonly baselineMessageCount: "baselineMessageCount";
    readonly messageRatio: "messageRatio";
    readonly zScore: "zScore";
    readonly spikeScore: "spikeScore";
    readonly reactionScore: "reactionScore";
    readonly diversityScore: "diversityScore";
    readonly transcriptScore: "transcriptScore";
    readonly termScore: "termScore";
    readonly features: "features";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AnalysisWindowScalarFieldEnum = (typeof AnalysisWindowScalarFieldEnum)[keyof typeof AnalysisWindowScalarFieldEnum];
export declare const AnalysisTermCountScalarFieldEnum: {
    readonly id: "id";
    readonly analysisWindowId: "analysisWindowId";
    readonly source: "source";
    readonly type: "type";
    readonly term: "term";
    readonly normalizedTerm: "normalizedTerm";
    readonly count: "count";
    readonly score: "score";
    readonly createdAt: "createdAt";
};
export type AnalysisTermCountScalarFieldEnum = (typeof AnalysisTermCountScalarFieldEnum)[keyof typeof AnalysisTermCountScalarFieldEnum];
export declare const WindowSummaryScalarFieldEnum: {
    readonly id: "id";
    readonly analysisWindowId: "analysisWindowId";
    readonly summary: "summary";
    readonly topic: "topic";
    readonly category: "category";
    readonly keywords: "keywords";
    readonly reactions: "reactions";
    readonly events: "events";
    readonly keyTranscript: "keyTranscript";
    readonly keyChat: "keyChat";
    readonly importanceScore: "importanceScore";
    readonly intensityScore: "intensityScore";
    readonly noveltyScore: "noveltyScore";
    readonly contextScore: "contextScore";
    readonly confidence: "confidence";
    readonly summaryScore: "summaryScore";
    readonly extractorVersion: "extractorVersion";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WindowSummaryScalarFieldEnum = (typeof WindowSummaryScalarFieldEnum)[keyof typeof WindowSummaryScalarFieldEnum];
export declare const HighlightCandidateScalarFieldEnum: {
    readonly id: "id";
    readonly videoId: "videoId";
    readonly rank: "rank";
    readonly startMs: "startMs";
    readonly peakMs: "peakMs";
    readonly endMs: "endMs";
    readonly summary: "summary";
    readonly category: "category";
    readonly summaryScore: "summaryScore";
    readonly spikeScore: "spikeScore";
    readonly reactionScore: "reactionScore";
    readonly diversityScore: "diversityScore";
    readonly transcriptScore: "transcriptScore";
    readonly termScore: "termScore";
    readonly finalScore: "finalScore";
    readonly confidence: "confidence";
    readonly reason: "reason";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HighlightCandidateScalarFieldEnum = (typeof HighlightCandidateScalarFieldEnum)[keyof typeof HighlightCandidateScalarFieldEnum];
export declare const HighlightCandidateWindowScalarFieldEnum: {
    readonly highlightCandidateId: "highlightCandidateId";
    readonly analysisWindowId: "analysisWindowId";
    readonly position: "position";
};
export type HighlightCandidateWindowScalarFieldEnum = (typeof HighlightCandidateWindowScalarFieldEnum)[keyof typeof HighlightCandidateWindowScalarFieldEnum];
export declare const ClipDraftScalarFieldEnum: {
    readonly id: "id";
    readonly videoId: "videoId";
    readonly candidateId: "candidateId";
    readonly startMs: "startMs";
    readonly endMs: "endMs";
    readonly peakMs: "peakMs";
    readonly title: "title";
    readonly note: "note";
    readonly status: "status";
    readonly candidateSnapshot: "candidateSnapshot";
    readonly exportedAt: "exportedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ClipDraftScalarFieldEnum = (typeof ClipDraftScalarFieldEnum)[keyof typeof ClipDraftScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumIngestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IngestionType'>;
export type ListEnumIngestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IngestionType[]'>;
export type EnumIngestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IngestionStatus'>;
export type ListEnumIngestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IngestionStatus[]'>;
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumAnalysisTermSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalysisTermSource'>;
export type ListEnumAnalysisTermSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalysisTermSource[]'>;
export type EnumAnalysisTermTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalysisTermType'>;
export type ListEnumAnalysisTermTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalysisTermType[]'>;
export type EnumHighlightStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HighlightStatus'>;
export type ListEnumHighlightStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HighlightStatus[]'>;
export type EnumClipDraftStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClipDraftStatus'>;
export type ListEnumClipDraftStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClipDraftStatus[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    ingestionRun?: Prisma.IngestionRunOmit;
    video?: Prisma.VideoOmit;
    transcriptSegment?: Prisma.TranscriptSegmentOmit;
    chatMessage?: Prisma.ChatMessageOmit;
    analysisWindow?: Prisma.AnalysisWindowOmit;
    analysisTermCount?: Prisma.AnalysisTermCountOmit;
    windowSummary?: Prisma.WindowSummaryOmit;
    highlightCandidate?: Prisma.HighlightCandidateOmit;
    highlightCandidateWindow?: Prisma.HighlightCandidateWindowOmit;
    clipDraft?: Prisma.ClipDraftOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
