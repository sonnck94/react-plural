import React, { Component } from 'react';
import './App.css';

class AuthorQuiz extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn />
        <Continue />
        <Footer />
      </div>
    );
  }
}

function Hero(){
  return (
    <div className="row">
      <div class="jumbotron col-10 offset-1">
      <h1 class="display-4">Author Quiz</h1>
      <p class="lead">Select book written by the author shown</p>
    </div>
    </div>
  );
}
function Book({title}){
  return(
    <div>
       <h4>{title}</h4> 
    </div>
  ); 
}

function Turn({author, books}){
  return (
  <div className="row turn" style={{backgroundColor: "white"}}>
    <div className="col-4 offset-1">
      <img src="{author.imageUrl}" className="authorimage" alt="Willima"></img>
    </div>
    <div className="col-6">
      {books.maps((title) => <Book title={title} key={title} />) }
    </div>
  </div>);
}

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
