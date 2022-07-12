import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nRequestScopeService } from 'nestjs-i18n';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { keyBy } from 'lodash';

import { Link } from './interfaces/link.interface';
import { AddLinkDto } from './dto/add-link.dto';
import constant from '../configs/constant';
import { UsersService } from '../users/users.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel('Link') private readonly linkModel: Model<Link>,
    private usersService: UsersService,
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

  getVideoIdFromYoutubeLink(link) {
    const urlParams = new URL(link).searchParams;
    return urlParams.get('v');
  }

  async create(addLinkDto: AddLinkDto, userId: string): Promise<Link> {
    //await this.i18n.translate('link.key')
    const videoId = this.getVideoIdFromYoutubeLink(addLinkDto.link);
    const additionData = await this.getVideoYoutubeDetail(videoId);
    const link = {
      ...addLinkDto,
      ...additionData,
      ...{ createdBy: userId, createdAt: new Date() },
    };
    const createdLink = new this.linkModel(link);
    await createdLink.save();
    return createdLink.toClient();
  }

  async transformCreatedByData(links: Array<Link>): Promise<Array<Link>> {
    const createdByIds = links.map((link) => link.createdBy);
    const users = await this.usersService.findByListIds(createdByIds);
    const usersKeyById = keyBy(users, '_id');

    return links.map((link) => link.toCreatedBy(usersKeyById[link.createdBy]?.email));
  }

  async findAll({ page, limit }): Promise<{ hasMore: boolean; links: Array<Link> }> {
    const [links, totalCount] = await Promise.all([
      this.linkModel
        .find()
        .skip(limit * (page - 1))
        .limit(limit)
        .sort({
          createdAt: 'desc',
        })
        .exec(),
      this.linkModel.count({}).exec(),
    ]);

    return {
      hasMore: page * limit < totalCount,
      links: await this.transformCreatedByData(links),
    };
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  @Cron(CronExpression.EVERY_30_SECONDS)
  // @Cron('45 * * * * *')
  async handleCronSyncYoutubeData() {
    console.log('This is cronjob to sync outdated data');
    try {
      const numberOrItem = 100;
      const count = await this.linkModel.count({}).exec();
      let offset = 0;

      while (offset < count) {
        const links = await this.linkModel
          .find()
          .skip(offset)
          .limit(numberOrItem)
          .sort({
            createdAt: 'desc',
          })
          .exec();

        for (let i = 0; i < links.length; i++) {
          const videoId = this.getVideoIdFromYoutubeLink(links[i].link);
          const additionData: any = await this.getVideoYoutubeDetail(videoId);
          const updateData = {};
          if (Object.keys(additionData).length !== 0) {
            if (additionData.title !== links[i].title) {
              updateData['title'] = additionData.title;
            }
            if (additionData.description !== links[i].description) {
              updateData['description'] = additionData.description;
            }
            if (Number(additionData.likeCount) !== Number(links[i].likeCount)) {
              updateData['likeCount'] = additionData.likeCount;
            }

            if (Object.keys(updateData).length !== 0) {
              const result = await this.linkModel.findByIdAndUpdate(links[i].id, updateData);
            }
          }
        }

        offset += numberOrItem;
      }
    } catch (error) {
      console.log('[Cron job sync data] ', error);
    }
  }
}
