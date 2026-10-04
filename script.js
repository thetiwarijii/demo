const API_URL = "https://quotable.vercel.app/random";

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const statusEl = document.getElementById("status");
const newQuoteBtn = document.getElementById("newQuoteBtn");

function showError(message) {
    statusEl.textContent = message;
    statusEl.hidden = false;
}

function hideError() {
    statusEl.hidden = true;
}

function renderQuote(data) {
    quoteEl.textContent = '"' + data.content + '"';
    authorEl.textContent = "— " + data.author;
    hideError();
}

async function loadQuote() {
    newQuoteBtn.disabled = true;
    quoteEl.textContent = "Loading…";
    authorEl.textContent = "";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Request failed");

        const data = await response.json();
        console.log(data);
        renderQuote(data);
    } catch {
        quoteEl.textContent = "Could not load a quote.";
        authorEl.textContent = "";
        showError("Check your internet connection and try again.");
    } finally {
        newQuoteBtn.disabled = false;
    }
}

newQuoteBtn.addEventListener("click", loadQuote);

loadQuote();
