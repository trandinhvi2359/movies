import { Min, Length } from 'class-validator';

import { AddLinkInput } from '../../schema/graphql.schema';

export class AddLinkDto extends AddLinkInput {
  @Length(15, 300)
  link: string;
}
