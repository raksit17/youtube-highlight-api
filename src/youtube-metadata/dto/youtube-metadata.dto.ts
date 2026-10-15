import { IsArray, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class GenerateYoutubeMetadataDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  model?: string;

  @IsOptional()
  @IsIn(['balanced', 'funny', 'seo'])
  tone?: 'balanced' | 'funny' | 'seo';
}

export class UpdateYoutubeMetadataDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  selectedTitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
