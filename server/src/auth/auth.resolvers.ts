import { UseGuards, Inject, Injectable, Scope } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Injectable({ scope: Scope.REQUEST })
@Resolver('Auth')
export class AuthResolvers {
  constructor(
    private authService: AuthService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Query('login')
  async login(): Promise<any> {
    return this.authService.login(this.request.user);
  }

  @Mutation('register')
  async register(@Args('registerInput') args: RegisterDto): Promise<any> {
    const { name, username: email, password } = args;

    return this.authService.register({ name, email, password });
  }
}
