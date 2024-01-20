// Please don't change the pre-written code
// Import the necessary modules here

export default class ArtPiece {
  constructor(id, title, artist, year, imageUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.imageUrl = imageUrl;
  }

  static db = [];

  static create({ title, artist, year, imageUrl }) {
    const artPiece = new ArtPiece(
      ArtPiece.db.length + 1,
      title,
      artist,
      year,
      imageUrl
    );
    ArtPiece.db.push(artPiece);
    return artPiece;
  }

  static findAll(query) {
    // Write your code here to retrieve all art pieces
    return this.db
  }

  static findOne(id) {
    // Write your code here to retrieve a specific art piece by its id
    
      return ArtPiece.db.find((art) => art.id == id);

  }

  static update(id, data) {
    // Write your code here to update the details of a specific art piece
    const artPiece = ArtPiece.findOne(id);
    if (artPiece) {
      Object.assign(artPiece, data);
    }
    return artPiece;

    // const index = this.db.findIndex(
    //   (p) => p.id == data.id
    // );
    // db[index] = data;
    //   return db[index] 
  }

  static delete(id) {
    // Write your code here to delete a specific art piece
    
    const index = ArtPiece.db.findIndex((art) => art.id == id);
    if (index !== -1) {
      ArtPiece.db.splice(index, 1);
    }

    // const index = db.findIndex((p)=> p.id == id);
    // db.splice(index,1);
  }
}
