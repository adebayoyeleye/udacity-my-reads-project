import React from 'react'
import { SHELVES } from './App'
import './App.css'

function Book (props) {
    return (
      <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(event)=>props.handleSelectChange(props.book, event.target.value)} value={props.book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                {Array.from(SHELVES).map(([shelfId, shelfName]) => (
                                	<option key={shelfId} value={shelfId} >{shelfName}</option>
                                ))}
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{props.book.title}</div>
							{props.book.authors.map((author, i) => (
                             <div key={i} className="book-authors">{author}</div>
                             ))}
                        </div>
    );
}

export default Book