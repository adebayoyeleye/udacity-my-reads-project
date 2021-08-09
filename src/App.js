import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookshelfList from './BookshelfList'
import SearchBooks from './SearchBooks'
import SearchAddBookButton from './SearchAddBookButton'
import './App.css'

export const SHELVES = new Map([ ['currentlyReading', 'Currently Reading'], ['wantToRead', 'Want to Read'], ['read', 'Read'] ]);

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    myBooks: [],
    query: '',
    searchedBooks: [],
  }
  
  
  componentDidMount() {
   BooksAPI.getAll().then((books) => this.setState({
     myBooks: books.map(book => ({id: book.id, shelf: book.shelf, title: book.title, authors: book.authors, thumbnail: book.imageLinks.thumbnail})),
   }));
 }
  
  
    handleSearchChange = function (value) {
    this.setState(oldState => {
      	let newState = oldState;
          	newState.query = value;
      		BooksAPI.search(this.state.query, 20).then(function (books) { 
     		newState.searchedBooks = Array.isArray(books) ? books.map(book => ({id: book.id, shelf: book.shelf, title: book.title, authors: book.authors, thumbnail: book.imageLinks.thumbnail})) : [];
            console.log('promise.searchedBooks', newState.searchedBooks);
              return newState;
           });
      console.log('value', value);
      console.log('newState.query', newState.query);
      console.log('newState.searchedBooks', newState.searchedBooks);
    });
  }.bind(this);
  
  
  handleSelectChange = (book, shelf) => {
  	BooksAPI.update(book, shelf).then(res => BooksAPI.getAll().then((books) => this.setState({
     myBooks: books.map(book => ({id: book.id, shelf: book.shelf, title: book.title, authors: book.authors, thumbnail: book.imageLinks.thumbnail})),
   })));
  }
  
  

  render() {
    //console.log(this.state.myBooks);
    //console.log(SHELVES);
    return (
      
      <div className="app">
      	<Route path='/search' render={() => (
    		<SearchBooks query={this.state.query} books={this.state.searchedBooks} handleChange={this.handleSearchChange} handleSelectChange={this.handleSelectChange} />
    	)}/>

		<Route exact path='/' render={()=>(
        	<div className="list-books">
            	<div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
            	<div className="list-books-content">
                	<BookshelfList books={this.state.myBooks} handleSelectChange={this.handleSelectChange}/>
            	</div>
          		<SearchAddBookButton />
          	</div>
       	)} />
      </div>
    )
  }
}

export default BooksApp
