import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ClipDraftStatus } from '../../../generated/prisma/enums';



export class UpdateClipDraftDto {
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

  @IsOptional()
  @IsEnum(ClipDraftStatus)
  status?: ClipDraftStatus;
}
