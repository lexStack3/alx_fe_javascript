const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');

document.addEventListener("DOMContentLoaded", event => {
    const quoteBtn = document.getElementById("newQuote");

    populateCategories();
    createAddQuoteForm();
    importExportField();
    populatePage();
    
    quoteBtn.addEventListener("click", showNewQuote);
});

function populatePage(){
    const div = document.getElementById("quoteDisplay");
    const categoryHeader = document.createElement("h2");
    const p = document.createElement("p");
    const [quote, category] = getAQuoteAndCategory();
    const select = document.getElementById("categoryFilter");

    
    if (quote){
        categoryHeader.textContent = category;
        const option = category === "all"
            ? "All Categories"
            : Array.from(select.children).find(option => option.value === category);
        option.selected = true;

        p.textContent = quote.text;
        p.style.fontWeight = "bold";
        p.style.color = "green";
    } else {
        p.textContent = "No quote available...";
        p.style.color = "orange";
    }
    
    div.append(categoryHeader, p)
}

function showNewQuote(){
    const categoryHeader = document.querySelector("#quoteDisplay > h2");
    const p = document.querySelector("#quoteDisplay p");
    const [quote] = getAQuoteAndCategory();
    const select = document.getElementById("categoryFilter");

    if (quote){
        categoryHeader.textContent = select.options[select.selectedIndex].value;
        p.textContent = quote.text;
        p.style.fontWeight = "bold";
        p.style.color = "green";
    } else {
        p.textContent = "No quote available...";
        p.style.color = "orange";
    }
}

function getAQuoteAndCategory(){
    const categoryList = JSON.parse(localStorage.getItem("category")) || [];
    const filteredQuotes = [];

    if (quotes.length === 0){
        return [null, null];
    }

    const category = categoryList.length ? categoryList[0] : "all";
    filteredQuotes.push(...((category === "all")
       ? quotes
       : quotes.filter(quote => quote.category === category)));
    
    return [filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)], category];
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

    const quote = {category, text};

    quotes.push(quote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
};

function importExportField(){
    const hr = document.createElement("hr");
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
        hr,
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
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  }

  fileReader.readAsText(event.target.files[0]);
  populateCategories();
}

function saveQuotes(){
    localStorage.setItem("quotes", JSON.stringify(quotes) || "[]");
};

function filterQuotes(){
    const div = document.getElementById("quoteDisplay");
    const categoryHeader = document.querySelector("#quoteDisplay > h2") ||
                            document.createElement("h2");
    const p = document.querySelector("#quoteDisplay > p") ||
                            document.createElement("p");
    const select = document.getElementById("categoryFilter");
    const filteredQuotes = select.value === "all"
        ? quotes
        : quotes.filter(quote => quote.category === select.value);

    categoryHeader.textContent = select.options[select.selectedIndex].textContent;
    if (filteredQuotes.length > 0) {
        const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        p.textContent = quote.text;
        p.style.fontWeight = "bold";
        p.style.color = "green"
    } else {
        p.textContent = "No quote available...";
        p.style.color = "orange";
    }

    div.append(categoryHeader, p);
    localStorage.setItem("category", JSON.stringify([select.value]));
    console.log(select.value)
}

function populateCategories(){
    const categories = [...new Set(quotes.map(quote => quote.category))];
    const select = document.getElementById("categoryFilter");

    categories.forEach(category => {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        select.appendChild(option);
    })
}