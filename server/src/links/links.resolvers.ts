import { UseGuards, UseFilters, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Link } from '../schema/graphql.schema';
import { LinksGuard } from './links.guard';
import { LinksService } from './links.service';
import { AddLinkDto } from './dto/add-link.dto';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { User as CurrentUser } from '../users/users.decorator';
import { User } from '../users/interfaces/user.interface';

@Resolver('Link')
export class LinksResolvers {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async getLinks(
    @CurrentUser() user: User,
    @Args('page') page = 1,
    @Args('limit') limit = 10,
  ): Promise<{ hasMore: boolean; links: Array<Link> }> {
    return this.linksService.findAll({ page, limit });
  }

  @Mutation('addLink')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async create(@CurrentUser() user: User, @Args('addLinkInput') args: AddLinkDto): Promise<Link> {
    const createdLink = await this.linksService.create(args, user.id);
    return createdLink;
  }
}
