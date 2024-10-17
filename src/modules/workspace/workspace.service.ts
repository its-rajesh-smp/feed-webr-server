/*
https://docs.nestjs.com/providers#services
*/

import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(condition = {}) {
    return await this.prismaService.workspace.findMany({ where: condition });
  }

  async create(data) {
    return await this.prismaService.workspace.create({ data });
  }

  async update(condition, data) {
    return await this.prismaService.workspace.update({
      where: condition,
      data,
    });
  }
}
