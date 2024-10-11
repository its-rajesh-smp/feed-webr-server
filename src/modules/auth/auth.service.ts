import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(condition) {
    return await this.prismaService.user.findUnique({ where: condition });
  }

  async findOneById(id) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async create(data) {
    return await this.prismaService.user.create({ data });
  }
}
