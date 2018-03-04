import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    canBlock: PropTypes.bool.isRequired
  }

  state = {
    blocking: false
  }

  render() {
    const book = this.props.book
    const imageURL = book.imageLinks ? book.imageLinks.smallThumbnail : ''
    return (
      <div className="book">
        <BlockUi tag="div" blocking={this.state.blocking}>
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
                value={book.shelf ? book.shelf : 'none'}
                onChange={(e) => {
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
        </BlockUi>
      </div>
    )
  }
}

export default Book
