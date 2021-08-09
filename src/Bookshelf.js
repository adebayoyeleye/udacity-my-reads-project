import React from 'react'
import Book from './Book'
import './App.css'

function Bookshelf (props) {
    return (
      <div>
      <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.shelf}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
						{props.books.map(book => (
                         	<li key={book.id}><Book book={book} handleSelectChange={props.handleSelectChange} /></li>
                         ))}
                    </ol>
                  </div>
                </div>
</div>
      
      );
}

export default Bookshelf