import Favorites from "../models/FavoriteBooksModel.js";
import User from "../models/UserModel.js";

export const AddToFavorites = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400, "Bad Request (invalid user ID).");
    }

    const newFavorite = new Favorites({
      userID: userId,
      bookID: bookId,
    });

    await newFavorite.save();

    res.status(201).json(bookId);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const RemoveFromFavorites = async (req, res, next) => {
  try {
    await Favorites.deleteOne({
      userID: req.body.userId,
      bookID: req.body.bookId,
    });
    res.status(200).json("Book removed from favorites.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const GetFavoriteBooksForUser = async (req, res, next) => {
  try {
    const books = await Favorites.find({ userID: req.body.userId }).distinct(
      "bookID"
    );
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
