import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';

import { LinksSeed } from '../links/links.seed';
import { LinkSchema } from '../links/schemas/link.schema';

@Module({
  imports: [CommandModule, MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }])],
  providers: [LinksSeed],
  exports: [LinksSeed],
})
export class LinksSeedModule {}
