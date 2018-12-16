import { Timestamp } from "rxjs";

export class Offer {
  name: String;
  location: String;
  description: String;
  timestamp: Date;

  constructor() {
    this.name = ""
    this.location = ""
    this.description = ""
    this.timestamp = new Date();
  }
}
