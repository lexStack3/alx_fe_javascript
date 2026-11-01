document.addEventListener("DOMContentLoaded", event => {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const quoteBtn = document.getElementById("newQuote");

    quoteBtn.addEventListener("click", showNewQuote);
    createAddQuoteForm();
    importExportField();

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
        /**
         * Creates a new quote from inputed data.
         */
        const text = document.getElementById('newQuoteText').value.trim();
        const category = document.getElementById('newQuoteCategory').value.trim();
    
        if (!text || !category){
            alert("Please provide a text and a category");
            return;
        }
    
        const quote = {text, category};
    
        quotes.push(quote);
        showNewQuote(quote);
        sessionStorage.setItem("quote", JSON.stringify(quote));
        localStorage.setItem('quotes', JSON.stringify(quotes));
    };

    function importExportField(){
        const h1 = document.createElement("h1");
        const jsonDiv = document.createElement("div");
        const fileInput = document.createElement("input");
        const br = document.createElement("br");
        const br1 = document.createElement("br");
        const exportBtn = document.createElement("button");
    
        h1.style.color = "lightgreen";
        h1.textContent = "Import Export Section:"
        fileInput.style.backgroundColor = "whitesmoke";
        fileInput.textContent = "Import";
        fileInput.type = "file";
        fileInput.id = "importFile";
        fileInput.accept = ".json";
        fileInput.addEventListener("change", importFromJsonFile);
    
        exportBtn.textContent = "Export Json";
        exportBtn.addEventListener("click", exportQuotes);
    
        jsonDiv.append(
            h1,
          fileInput,
          br,
          br1,
          exportBtn
        );
    
        document.body.appendChild(jsonDiv);
    };
    
    function exportQuotes(){
        /**
         * exportQuotes: Generate a .json file `quotes.json` that contains all the quotes
         *               in JSON format.
         */
      const blobQuotes = new Blob([JSON.stringify(quotes, null, 2)], {"type": "application/json"});
      const url = URL.createObjectURL(blobQuotes);
      const a = document.createElement("a");
    
      a.href = url;
      a.download = "quotes.json";
      a.click();
    
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    }
    
    function importFromJsonFile(event) {
        /**
         * importFromJsonFile: Loads quotes from inputed .json file from user.
         */
      const fileReader = new FileReader();
    
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        console.log(importedQuotes)
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      }
    
      fileReader.readAsText(event.target.files[0]);
    }

    function saveQuotes(){
        localStorage.setItem("quotes", JSON.stringify(quotes) || "[]");
    };
})

