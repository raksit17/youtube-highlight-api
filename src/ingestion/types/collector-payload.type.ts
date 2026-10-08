export interface CollectorPayload<TData = unknown> {
  success: boolean;

  provider: string;
  collector: string;

  type:
    | 'video'
    | 'transcript'
    | 'chat';

  subject: {
    type: 'video';

    externalId: string;

    url?: string;
  };

  data: TData;
}