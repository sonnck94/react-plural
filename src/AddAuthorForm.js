import React from 'react';
import './AddAuthorForm.css';

class AuthorForm extends React.Component{
    constructor(props){
        super();
        this.state = {
            name: '',
            imageUrl: '',
            bookTemp: '',
            books: []
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleAddBook(event){
        this.setState({
            books: this.state.books.concat(this.state.bookTemp),
            bookTemp: ''
        })
    }
    render(){
        return(
            <form className="" onSubmit={this.handleSubmit}>
                <div className="AddAuthorForm__input">
                    <label htmlFor="name">Name</label>
                    <input name="name" value={this.state.name} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="imageUrl">Image Url</label>
                    <input name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="imageUrl">Books</label>
                    {this.state.books.map((book)=>
                        <p key={book}>{book}</p>
                    )}
                </div>
                <div className="AddAuthorForm__input">
                    <input name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
                    <input type="button" value="+" onClick={this.handleAddBook}></input>
                </div>
                <input type="submit" value="Add" />
            </form>
        )
    };
}
function AddAuthorForm({match, onAddAuthor}){
    return (
    <div className="AddAuthorForm">
        <h2>Add Author</h2>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>)
}

export default AddAuthorForm;