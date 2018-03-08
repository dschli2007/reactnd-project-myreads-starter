import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  booksOnTheShelf(shelf) {
    return this.state.books.filter((book) => book.shelf === shelf)
  }

  updateBookShelf(bookFromSearch, shelf) {
    BooksAPI.update(bookFromSearch, shelf)

    bookFromSearch.shelf = shelf
    // update existing book or add to my books
    const books = this.state.books
    const myBook = books.find((b) => b.id === bookFromSearch.id)
    if (myBook) myBook.shelf = shelf
    else books.push(bookFromSearch)

    this.setState({ books })
  }

  getBookCurrentShelf(book) {
    const myBook = this.state.books.find((item) => item.id === book.id)
    return myBook && myBook.shelf ? myBook.shelf : 'none'
  }

  render() {
    const shelves = [
      { id: 'currentlyReading', title: 'Currently Reading' },
      { id: 'wantToRead', title: 'Want to Read' },
      { id: 'read', title: 'Read' }
    ]
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelves.map((shelf) => (
                    <BookShelf
                      key={shelf.id}
                      title={shelf.title}
                      books={this.booksOnTheShelf(shelf.id)}
                      onUpdateBook={(book, shelf) => this.updateBookShelf(book, shelf)}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            <Search
              onUpdateBook={(book, shelf) => this.updateBookShelf(book, shelf)}
              onGetCurrentShelf={(book) => this.getBookCurrentShelf(book)}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
