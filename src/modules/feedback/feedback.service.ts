import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(condition = {}) {
    return await this.prismaService.feedback.findMany({
      where: condition,
      include: {
        UserAttachment: true,
        QuestionResponse: {
          include: { question: true },
        },
      },
    });
  }

  async create(data) {
    return await this.prismaService.feedback.create({ data });
  }
}
