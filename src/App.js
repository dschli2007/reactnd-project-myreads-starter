import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Main from './Main'
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
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <Main books={this.state.books}
            updateBookShelf={(book, shelf) => this.updateBookShelf(book, shelf)} />}
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
