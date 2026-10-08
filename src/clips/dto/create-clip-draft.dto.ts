import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateClipDraftDto {
  /**
   * ถ้าสร้างจาก HighlightCandidate
   */
  @IsOptional()
  @IsString()
  candidateId?: string;

  /**
   * Manual override
   * ถ้าไม่ส่งและมี candidateId
   * จะใช้ candidate.startMs
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  startMs?: number;

  /**
   * Manual override
   * ถ้าไม่ส่งและมี candidateId
   * จะใช้ candidate.endMs
   */
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
