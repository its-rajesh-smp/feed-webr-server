import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data) {
    return await this.prismaService.feedback.create({ data });
  }
}
