import * as mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  link: String,
  title: String,
  description: String,
  likeCount: Number,
  createdAt: Number,
  createdBy: String,
});

LinkSchema.index({ createdBy: 1 });

LinkSchema.method('toClient', function () {
  const object = this.toObject();

  object.id = object._id;
  delete object._id;
  return object;
});

LinkSchema.method('toCreatedBy', function (createdBy) {
  const object = this.toObject();

  object.createdBy = createdBy;
  object.id = object._id;
  delete object._id;
  return object;
});

export { LinkSchema };
