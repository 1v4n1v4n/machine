import React from 'react';
import $ from 'jquery';
import Container from 'react-bootstrap/Container'

export default class App extends React.Component {
  
  constructor() {
    super()
  
    this.state = {
      myQuote: "Loading...",
    }
  }

  // fetching data from an online JSON file
  async componentDidMount() {
    const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    const response = await fetch(url);
    const data = await response.json();
    quotesData = data;
    this.setState({myQuote: quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)]});
  }

  // function for dynamically changing data 
  update() {

    let random = Math.floor(Math.random() * quotesData.quotes.length);

    // using jQuery's animate for the quote's text and author
    $(".quote-text").animate(
      { opacity: 0 },
      500,
      function() {
        $(this).animate({ opacity: 1}, 500);
        $('#text').text(quotesData.quotes[random].quote);
      }
    );
  
    $(".quote-author").animate(
      { opacity: 0 },
      500,
      function() {
        $(this).animate({ opacity: 1}, 500);
        $('#author').html("- " + quotesData.quotes[random].author);
      }
    );

    // dynamically change color
    setTimeout(() => { this.setState({color: setRandomColor(), myQuote: quotesData.quotes[random]}) }, 500);
    }

  render() {
  return (
    <Container>
    <div id="quote-box">
      <div className = "quote-text">
        <p style={{color: document.body.style.backgroundColor }}>{this.state.myQuote.quote}</p>
      </div>
      <div className="quote-author">
        <p style={{color: document.body.style.backgroundColor }}>- {this.state.myQuote.author}</p>
      </div>
      <div className="buttons">
      <div className="buttons-left">
        <button style={{backgroundColor: document.body.style.backgroundColor}} onClick={()=> openURL('https://github.com/1v4n1v4n/machine')}>
        <i className="fab fa-github" /> Fork</button>
        <span style={{visibility: 'hidden'}}>II</span>
        <button style={{backgroundColor: document.body.style.backgroundColor}} onClick={()=> openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + this.state.myQuote.quote + '" ' + 
        this.state.myQuote.author)}  ><i className="fab fa-twitter" /> Tweet</button>
      </div>
        <span style={{visibility: 'hidden'}}>II</span>
        <button style={{backgroundColor: document.body.style.backgroundColor}} onClick={() => {this.update()}}>New Quote</button>
      </div>
        <footer><a className="footer" href="https://github.com/1v4n1v4n">by 1v4n</a></footer>
    </div>
    </Container>
  );
  }
}
// function for getting a random color from an array
function setRandomColor() {
  var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}
// needed function for the share option
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

// needed variable for saving the fetched data
let quotesData;