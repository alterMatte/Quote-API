const express = require('express');
const cors = require('cors');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.use(cors());
app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
  const quote = getRandomElement(quotes);
  res.send({quote: quote});
});

app.get('/api/quotes', (req, res) => {
  const person = req.query.person;
  if(person) {
    const quotesPerson = quotes.filter(quote => quote.person === person);
    res.send({quotes: quotesPerson});
  } else {
    res.send({quotes: quotes});
  }
});

app.post('/api/quotes', (req, res) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (person && quote) {
    if (quotes.find(x => x.person === person && x.quote === quote)) {
      res.status(409).send({error: 'Quote already exists'});
    } else {
      quotes.push({quote: quote, person: person});
      res.send({quote: {quote: quote, person: person}});
    }
  } else{
    res.status(400).send({error: 'Missing required parameters'});
  }
});

// export app for use in main.js and for testing
module.exports = {
  app
};

