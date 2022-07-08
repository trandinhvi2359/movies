import * as mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  link: String,
  title: String,
  description: String,
  likeCount: Number,
  createdAt: Number,
});

LinkSchema.method('toClient', function () {
  const object = this.toObject();

  object.id = object._id;
  delete object._id;
  return object;
});

export { LinkSchema };
