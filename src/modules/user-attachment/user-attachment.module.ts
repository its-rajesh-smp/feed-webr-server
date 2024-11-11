import { Module } from '@nestjs/common';
import { UserAttachmentService } from './user-attachment.service';

@Module({
  providers: [UserAttachmentService],
})
export class UserAttachmentModule {}
