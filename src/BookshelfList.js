import React from 'react'
import Bookshelf from './Bookshelf'
import { SHELVES } from './App'
import './App.css'

function BookshelfList (props) {
    return (
      <div>
      {Array.from(SHELVES).map(([shelfId, shelfName]) => (
       <Bookshelf key={shelfId} shelf={shelfName} books={props.books.filter(book => (book.shelf === shelfId))} handleSelectChange={props.handleSelectChange}/>
       ))}
      </div>
    );
}

export default BookshelfList