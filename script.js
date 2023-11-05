const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newquoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get quote from API
let apiQuotes = [];
// loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Show newQuote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author name is null replace it with unknown.
    if(!quote.author){
        authorText.textContent = "unknown";
    }
    else{
    authorText.textContent = quote.author;        
    }
    // Check quote length to determine styling.
    if(quote.length > 50){
        quoteText.classList.add("long-quote");
    }
    else{
        quoteText.classList.remove("long-quote");
    }
    // set quote hide loader
    complete(); 
    quoteText.textContent = quote.text;
}

async function getQuote(){
    loading();
    const apiURl= 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURl);
        apiQuotes = await response.json();
        newQuote();
        console.log(apiQuotes[10]);
    }
    catch(error){
    }
}
// Tweet Quote
function tweetQuote(){
    const tweeterURL = `https://twitter.com/intent/tweet?text=${quoteText.textcontent} ${authorText.textContent}`;
    window.open(tweeterURL,"_blank");
} 
// EventListener
newquoteBtn.addEventListener("click" , newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Onload
getQuote();
loading();