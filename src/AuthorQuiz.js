import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function AuthorQuiz({turnData, highlight, onAnswerSelected}){
  return (
    <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue />
        <Footer />
      </div>
  )
}

function Hero(){
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
      <h1 className="display-4">Author Quiz</h1>
      <p className="lead">Select book written by the author shown</p>
    </div>
    </div>
  );
}
function Book({title, onClick}){
  return(
    <div className="answer" onClick={() => onClick(title)}>
       <h4>{title}</h4> 
    </div>
  ); 
}

function Turn({author, books, highlight, onAnswerSelected}){
  function highlightBgColor(highlight){
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    }
    return mapping[highlight];
  }
  return (
  <div className="row turn" style={{backgroundColor: highlightBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="William"></img>
    </div>
    <div className="col-6">
      {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />) }
    </div>
  </div>);
}
Turn.propTypes = {
  author: PropTypes.shape({
     name: PropTypes.string.isRequired,
     imageUrl: PropTypes.string.isRequired,
     imageSource: PropTypes.string.isRequired,
     books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue(){
  return (<div> </div>);
}

function Footer(){
  return(
     <div id='footer' className="row">
      <div className="col-12">
        <p className="text-muted credit">All image from <a href="https://commons.wikimedia.org/wiki/Main_Page">Common wikimedia</a></p>
      </div>
     </div> 
  );
}

export default AuthorQuiz;
