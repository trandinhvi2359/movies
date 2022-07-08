import { Document } from 'mongoose';

export interface Link extends Document {
  readonly link: string;
  readonly title: string;
  readonly description: string;
  readonly likeCount: number;
  readonly createdAt: string;

  toClient(): this;
}
