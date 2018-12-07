import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
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

let state = resetState();

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();

}

function resetState(){
    return {
        turnData: getTurnData(authors),
        highlight: ''
    }
}

const AuthorWrapper = withRouter(({history}) =>{
    return <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }}/>
})

function App(){
    return <AuthorQuiz {...state} 
            onAnswerSelected={onAnswerSelected}
            onContinue={() =>{
                state = resetState();
                render();
            }}/>
}

function render(){
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/add" component={AuthorWrapper} />
            </React.Fragment>
        </BrowserRouter>, document.getElementById('root'));
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
