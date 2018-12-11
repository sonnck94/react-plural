import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux'
import './index.css';
import './bootstrap.min.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'William Shakespeare',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg',
        imageSource: 'Wikipedia',
        books: ['The Adventures of Huckleberry Finn', 'Hamless', 'Romeo and Juliet', 'King Lear']
    },
    {
        name: 'Scott Fitzgerald',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/F._Scott_Fitzgerald%2C_1921.png',
        imageSource: 'Wikipedia',
        books: ['This Side of Paradise', 'The Great Gatsby ', 'The Beautiful and Damned', 'Tender Is the Night']
    },
    {
        name: 'Leo Tolstoy',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg',
        imageSource: 'Wikipedia',
        books: ['War and Peace', 'The Kingdom of God Is Within You', 'The Death of Ivan Ilyich', 'Resurrection']
    },
    {
        name: 'Ernest Hemingway',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/220px-ErnestHemingway.jpg',
        imageSource: 'Wikipedia',
        books: ['The Sun Also Rises', 'A Farewell to Arms', 'The Old Man and the Sea', 'To Have and Have Not']
    },
    {
        name: 'James Joyce',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Revolutionary_Joyce_Better_Contrast.jpg/447px-Revolutionary_Joyce_Better_Contrast.jpg',
        imageSource: 'Wikipedia',
        books: ['Ulysses', 'The Dead', 'Everline', 'The sisters']
    },
    {
        name: 'J. K. Rowling',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/J.K._Rowling_2010-10-24.jpg/421px-J.K._Rowling_2010-10-24.jpg',
        imageSource: 'Wikipedia',
        books: ['Harry Potter and the Philosopher\'s Stone', 'Harry Potter and the Chamber of Secrets', 'Harry Potter and the Prisoner of Azkaban', 'Harry Potter and the Goblet of Fire ']
    }
    
]
function getTurnData(authors){
    const allBooks = authors.reduce(function(p, c, i){
        return p.concat(c.books);
    }, [])
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);
    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
                    author.books.some((title) => 
                        title === answer))
    }
}

function reducer(state ={authors, turnData: getTurnData(authors), highlight: ''}, action){
    switch(action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight:'',
                turnData: getTurnData(state.authors)
            });
            
        case 'ADD_AUTHOR':
            console.log('action.author', action)
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author]),
            });
        default:
            return state;        
    }
}
// let state = resetState();
let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const AuthorWrapper = withRouter(({history}) =>{
//     return <AddAuthorForm onAddAuthor={(author) => {
//         authors.push(author);
//         history.push('/');
//     }}/>
// })


ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
