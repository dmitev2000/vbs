import mongoose from "mongoose";

const Schema = mongoose.Schema;

const favBooksSchema = new Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    bookID: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Favorites = mongoose.model("Favorites", favBooksSchema);

export default Favorites;
