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

  render() {
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
                  <BookShelf
                    title="Currently Reading"
                    books={this.booksOnTheShelf('currentlyReading')}
                  />
                  <BookShelf title="Want to Read" books={this.booksOnTheShelf('wantToRead')} />
                  <BookShelf title="Read" books={this.booksOnTheShelf('read')} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        <Route path="/search" render={() => <Search />} />
      </div>
    )
  }
}

export default BooksApp
