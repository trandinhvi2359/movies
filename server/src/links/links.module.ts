import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LinksResolvers } from './links.resolvers';
import { LinksService } from './links.service';
import { LinkSchema } from './schemas/link.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }]), UsersModule],
  providers: [LinksService, LinksResolvers],
})
export class LinksModule {}
