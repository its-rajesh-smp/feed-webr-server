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

  async findOne(condition) {
    return await this.prismaService.workspace.findFirst({
      where: condition,
      include: { workspaceQuestions: true },
    });
  }

  async findUnique(condition) {
    return await this.prismaService.workspace.findUnique({
      where: condition,
      include: { workspaceQuestions: true },
    });
  }

  async findOneById(id: string) {
    return await this.prismaService.workspace.findFirst({
      where: { id },
      include: { workspaceQuestions: true },
    });
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
