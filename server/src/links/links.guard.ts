import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LinksGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    GqlExecutionContext.create(context);
    return true;
  }
}
