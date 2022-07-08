import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nRequestScopeService } from 'nestjs-i18n';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Link } from './interfaces/link.interface';
import { AddLinkDto } from './dto/add-link.dto';
import constant from '../configs/constant';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel('Link') private readonly linkModel: Model<Link>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async getVideoYoutubeDetail(
    id: String,
  ): Promise<{ title: String; description: String; likeCount: Number } | {}> {
    try {
      const res = await axios.get(
        `${constant.googleAPI.baseUrl}?part=statistics,snippet&id=${id}&key=${process.env.GOOGLE_API_KEY}`,
      );
      const additionData = { title: String, description: String, likeCount: Number };

      if (res) {
        const snippet = res.data.items[0].snippet;
        const statistics = res.data.items[0].statistics;

        additionData.title = snippet.title;
        additionData.description = snippet.description;
        additionData.likeCount = statistics.likeCount;
        return additionData;
      }
    } catch (error) {
      console.log('error: ', error);
      return {};
    }

    return {};
  }

  async create(addLinkDto: AddLinkDto): Promise<Link> {
    //await this.i18n.translate('link.key')
    const urlParams = new URL(addLinkDto.link).searchParams;
    const videoId = urlParams.get('v');
    const additionData = await this.getVideoYoutubeDetail(videoId);
    const link = { ...addLinkDto, ...additionData, ...{ createdAt: new Date() } };
    const createdLink = new this.linkModel(link);
    await createdLink.save();
    return createdLink.toClient();
  }

  async findAll({ page, limit }): Promise<Link[]> {
    // const count = await this.linkModel.count({}).exec();
    // console.log('count: ', count);

    return this.linkModel
      .find()
      .skip(limit * page)
      .limit(limit)
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  // @Cron('45 * * * * *')
  runEveryMinute() {
    console.log('cron job test');
  }
}
