document.addEventListener("DOMContentLoaded", event => {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const quoteBtn = document.getElementById("newQuote");

    quoteBtn.addEventListener("click", showNewQuote);
    createAddQuoteForm();

    quotes.forEach(quote => showNewQuote(quote));
    
    function showNewQuote(quote=false){
        const quoteDisplay = document.getElementById("quoteDisplay");
        const p = document.querySelector("#quoteDisplay > p") ||
            document.createElement("p");
        const span = document.createElement("span");
        
        if (quote) {
            quote = quotes[10 * (Math.floor(Math.random() * quotes.length) / 10)];
        }
    
        span.style.fontWeight = "bold";
        span.textContent = `${quote.category}:\t`;
    
        p.innerHTML = '';
        p.appendChild(span);
        p.appendChild(document.createTextNode(quote.text));
    
        quoteDisplay.appendChild(p);
    }
    
    function createAddQuoteForm(){
        const div = document.createElement("div");
        const inputText = document.createElement("input");
        const inputCategory = document.createElement("input");
        const btn = document.createElement("button");
    
        inputCategory.id = "newQuoteCategory";
        inputCategory.type = "text";
        inputCategory.placeholder = "Enter quote category";

        inputText.id = "newQuoteText";
        inputText.type = "text";
        inputText.placeholder = "Enter a new quote";
    
        btn.textContent = "Add Quote";
        btn.addEventListener("click", addQuote);

        div.appendChild(inputText);
        div.appendChild(inputCategory)
        div.appendChild(btn);
        div.style.marginTop = "20px"

        document.body.appendChild(div);
    };
    
    function addQuote(){
        const text = document.getElementById('newQuoteText').value.trim();
        const category = document.getElementById('newQuoteCategory').value.trim();
    
        if (!text || !category){
            alert("Please provide a text and a category");
            return;
        }
    
        const quote = {text, category};
    
        quotes.push(quote);
        showNewQuote(quote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
    };
})


const quotes = [
  {
    "category": "Motivation",
    "text": "Every great achievement begins with the courage to take the first step."
  },
  {
    "category": "Motivation",
    "text": "Your future is built by the small decisions you make today."
  },
  {
    "category": "Motivation",
    "text": "Progress is not always fast, but every step forward counts."
  },
  {
    "category": "Motivation",
    "text": "Do not wait for confidence; build it through action."
  },
  {
    "category": "Success",
    "text": "Success is the result of consistent effort directed toward a meaningful goal."
  },
  {
    "category": "Success",
    "text": "Discipline carries you forward when motivation takes a day off."
  },
  {
    "category": "Success",
    "text": "The quality of your habits often determines the quality of your results."
  },
  {
    "category": "Success",
    "text": "Learn from every failure, improve your approach, and keep moving."
  },
  {
    "category": "Wisdom",
    "text": "Listening carefully can teach you what speaking quickly never will."
  },
  {
    "category": "Wisdom",
    "text": "Knowledge shows you what is possible; wisdom helps you choose what is right."
  },
  {
    "category": "Wisdom",
    "text": "A thoughtful question can open doors that confident assumptions keep closed."
  },
  {
    "category": "Wisdom",
    "text": "Knowing when to change your mind is a sign of strength, not weakness."
  },
  {
    "category": "Perseverance",
    "text": "Difficult roads can teach you strengths that easy paths never reveal."
  },
  {
    "category": "Perseverance",
    "text": "A setback is a moment in your journey, not the definition of your destination."
  },
  {
    "category": "Perseverance",
    "text": "Keep going, even when progress is too small to notice."
  },
  {
    "category": "Perseverance",
    "text": "Persistence turns repeated attempts into valuable experience."
  },
  {
    "category": "Personal Growth",
    "text": "Become more curious about who you could be than comfortable with who you are."
  },
  {
    "category": "Personal Growth",
    "text": "Every new skill begins with the willingness to be a beginner."
  },
  {
    "category": "Personal Growth",
    "text": "The person you become depends partly on what you are willing to learn."
  },
  {
    "category": "Personal Growth",
    "text": "Growth begins when you stop treating your limitations as permanent."
  }
]

localStorage.setItem("quotes", JSON.stringify(quotes));