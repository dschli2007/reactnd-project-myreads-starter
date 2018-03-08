import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class Main extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  booksOnTheShelf(shelf) {
    return this.props.books.filter((book) => book.shelf === shelf)
  }

  render() {
    const shelves = [
      { id: 'currentlyReading', title: 'Currently Reading' },
      { id: 'wantToRead', title: 'Want to Read' },
      { id: 'read', title: 'Read' }
    ]

    return (
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
                onUpdateBook={(book, shelf) => this.props.updateBookShelf(book, shelf)}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Main
