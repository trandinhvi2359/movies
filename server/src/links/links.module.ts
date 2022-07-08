import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LinksResolvers } from './links.resolvers';
import { LinksService } from './links.service';
import { LinkSchema } from './schemas/link.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }])],
  providers: [LinksService, LinksResolvers],
})
export class LinksModule {}
