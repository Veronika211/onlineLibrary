//ovom klasom definisemo kako ce izgledati 
class Book {
    constructor(key,id, title, img, author, description, comments){
        this.id = id;
        this.key = key;
        this.title = title;
        this.img = img;
        this.author = author,
        this.description = description,
        this.comments = comments
    }
}

export default Book;