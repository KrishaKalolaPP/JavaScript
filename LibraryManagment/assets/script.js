const addBookBtn = document.getElementById('add-book-btn');
const searchBtn = document.getElementById('search-btn');

const books = [];

const renderBooks = (filter = '') => {
  const bookList = document.querySelector('#book-list ul');

  if (books.length === 0) {
    document.getElementById('book-list').classList.remove('visible');
    return;
  } else {
    document.getElementById('book-list').classList.add('visible');
  }

  bookList.innerHTML = '';

  const filteredBooks = !filter
    ? books
    : books.filter(book => book.info.title.toLowerCase().includes(filter.toLowerCase()));

  filteredBooks.forEach(book => {
    const bookEl = document.createElement('li');
    let text = book.info.title + ' - ';
    for (const key in book.info) {
      if (key !== 'title') {
        text += `${key}: ${book.info[key]} `;
      }
    }
    bookEl.textContent = text;
    bookList.append(bookEl);
  });
};

const addBookHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newBook = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random()
  };

  books.push(newBook);
  renderBooks();
};

const searchBookHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderBooks(filterTerm);
};

addBookBtn.addEventListener('click', addBookHandler);
searchBtn.addEventListener('click', searchBookHandler);
