import { Module } from '@nestjs/common';

import { TranscriptsRepository } from './transcripts.repository';

@Module({
  providers: [TranscriptsRepository],

  exports: [TranscriptsRepository],
})
export class TranscriptsModule {}
