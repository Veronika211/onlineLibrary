class Comment {
  constructor(id, userId, bookId, text, mark, date, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.text = text;
    this.mark = mark;
    this.date = date;
    this.imageUrl = imageUrl;
  }
}

export default Comment;
