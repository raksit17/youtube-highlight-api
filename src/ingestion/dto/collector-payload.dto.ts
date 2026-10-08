import { Type } from 'class-transformer';

import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CollectorSubjectDto {
  @IsIn(['video'])
  type!: 'video';

  @IsString()
  @IsNotEmpty()
  externalId!: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;
}

export class CollectorPayloadDto {
  @IsBoolean()
  success!: boolean;

  @IsString()
  @IsNotEmpty()
  provider!: string;

  @IsString()
  @IsNotEmpty()
  collector!: string;

  @IsIn(['video', 'transcript', 'chat'])
  type!: 'video' | 'transcript' | 'chat';

  @ValidateNested()
  @Type(() => CollectorSubjectDto)
  subject!: CollectorSubjectDto;

  @IsObject()
  data!: Record<string, unknown>;
}