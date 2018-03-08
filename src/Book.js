import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  constructor(props) {
    super(props)
    this.shelf = props.book.shelf ? props.book.shelf : 'none'
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const book = this.props.book
    const imageURL = book.imageLinks ? book.imageLinks.smallThumbnail : ''
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url("${imageURL}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.shelf}
              onChange={(e) => {
                this.shelf = e.target.value
                if (this.props.canBlock) this.setState({ blocking: true })
                this.props.onUpdateBook(book, e.target.value)
              }}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book
