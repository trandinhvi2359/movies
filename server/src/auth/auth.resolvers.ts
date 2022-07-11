import { UseGuards, Inject, Injectable, Scope } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Query('login')
  async login(
    @Args('username') username,
    @Args('password') password,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      return { accessToken: null };
    }
    return this.authService.login(user);
  }

  @Mutation('register')
  async register(@Args('registerInput') args: RegisterDto): Promise<any> {
    const { name, username: email, password } = args;

    return this.authService.register({ name, email, password });
  }
}
