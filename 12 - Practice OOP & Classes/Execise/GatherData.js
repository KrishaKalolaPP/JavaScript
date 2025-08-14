class Book {
  constructor(name, author, readingStatus) {
    this.name = name
    this.author = author
    this.readingStatus = readingStatus
  }

  displayStatus() {
    const status = this.readingStatus ? "is being read." : "has not been read yet.";
    console.log(`"${this.name}" by ${this.author} ${status}`);
  }
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", true);
const book2 = new Book("1984", "George Orwell", false);

book1.displayStatus()
book2.displayStatus() 
