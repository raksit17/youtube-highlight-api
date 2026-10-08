import {
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum RenderFormat {
  MP4 = 'MP4',
  WEBM = 'WEBM',
}

export enum RenderResolution {
  ORIGINAL = 'ORIGINAL',
  P1080 = '1080P',
  P720 = '720P',
}

export enum RenderMode {
  ACCURATE = 'ACCURATE',
  FAST = 'FAST',
}

export class CreateRenderJobDto {
  @IsEnum(RenderFormat)
  format: RenderFormat = RenderFormat.MP4;

  @IsEnum(RenderResolution)
  resolution: RenderResolution = RenderResolution.P1080;

  @IsEnum(RenderMode)
  mode: RenderMode = RenderMode.ACCURATE;

  @IsOptional()
  @IsBoolean()
  includeSubtitles = false;
}
