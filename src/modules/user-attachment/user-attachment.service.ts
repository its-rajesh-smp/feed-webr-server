import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAttachmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data) {
    return await this.prismaService.userAttachment.create({ data });
  }

  async bulkCreate(data) {
    return await this.prismaService.userAttachment.createMany({ data });
  }
}
