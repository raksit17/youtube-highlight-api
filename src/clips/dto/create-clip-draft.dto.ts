import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { HighlightLengthPreset } from '../../../generated/prisma/enums';

export class CreateClipDraftDto {
  @IsOptional()
  @IsString()
  candidateId?: string;

  @IsOptional()
  @IsEnum(HighlightLengthPreset)
  preset?: HighlightLengthPreset;

  @IsOptional()
  @IsInt()
  @Min(0)
  startMs?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  endMs?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
