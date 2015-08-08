var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: String,
  director: String,
  country: String,
  language: String,
  poster: String,
  flash: String,
  year: Number,
  summary: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

MovieSchema.pre('save', function(next) {
  var movie = this;
  movie.meta.updateAt = Date.now();
  if (movie.isNew) {
    movie.meta.createAt = movie.meta.updateAt;
  }
  next();
});

mongoose.model('Movie', MovieSchema);
