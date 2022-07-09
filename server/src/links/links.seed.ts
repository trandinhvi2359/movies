import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Link } from './interfaces/link.interface';

@Injectable()
export class LinksSeed {
  constructor(@InjectModel('Link') private readonly linkModel: Model<Link>) {}

  @Command({ command: 'seed:links', describe: 'Seed links data', autoExit: true })
  async create(): Promise<void> {
    await new this.linkModel({
      link: 'https://www.youtube.com/watch?v=8CFF0DqHZXg',
      title:
        'At Record High Prices, Is It A Good Time To Invest In Gold? | Money Mind | Safe Haven?',
      description:
        'For more, SUBSCRIBE to CNA INSIDER!  https://cna.asia/insideryoutubesub Follow CNA INSIDER on: Instagram: https://www.instagram.com/cnainsider/ Facebook: https://www.facebook.com/cnainsider/ Website: https://cna.asia/cnainsider',
      likeCount: 40,
      createdAt: '1657361323078',
      createdBy: '62c953ab77f4db0f0c804f1b',
    }).save();
  }
}
