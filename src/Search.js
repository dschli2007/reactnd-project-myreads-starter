import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book'

class Search extends React.Component {
  static propTypes = {
    onUpdateBook: PropTypes.func,
    onGetCurrentShelf: PropTypes.func
  }

  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    const input = document.getElementById('txtSearch')
    if (input) input.focus()
  }

  onChange(query) {
    this.setState({ query })
    const getCurrentShelf = this.props.onGetCurrentShelf
    if (query) {
      BooksAPI.search(query).then((books) => {
        const data = (books instanceof Array ? books : []).map((book) => {
          book.shelf = getCurrentShelf(book)
          return book
        })
        if (this.state.query === query) this.setState({ books: data })
      })
    } else {
      this.setState({ books: [] })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              id="txtSearch"
              type="text"
              onChange={(e) => this.onChange(e.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdateBook={this.props.onUpdateBook} canBlock={false} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
