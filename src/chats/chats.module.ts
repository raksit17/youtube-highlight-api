import { Module } from '@nestjs/common';

import { ChatsRepository } from './chats.repository';

@Module({
  providers: [ChatsRepository],

  exports: [ChatsRepository],
})
export class ChatsModule {}
