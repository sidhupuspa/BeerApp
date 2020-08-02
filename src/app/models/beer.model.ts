export class Beer {
  id: number;
  name: string;
  description: string;
  imageUrl: string;

  constructor(id, name, descp, imageurl) {
    this.id = id;
    this.name = name;
    this.description = descp;
    this.imageUrl = imageurl;
  }
  static getRandomBeerId(max) {
    return Math.floor(Math.random() * Math.floor(max)).toString();
  }
}
