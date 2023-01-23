import './App.css';
import React, { useState } from 'react';

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);

  // Initialize the deck of cards
  const initCards = () => {
    const numbers = [1, 2, 3, 4];
    const cards = [];
    numbers.forEach((number) => {
      cards.push({ number, flipped: false });
      cards.push({ number, flipped: false });
    });
    shuffleArray(cards);
    setCards(cards);
  }

  // Shuffle the cards
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Handle when a card is clicked
  const handleCardClick = (index) => {
    const newCards = [...cards];
    newCards[index].flipped = true;
    setFlippedCards([...flippedCards, index]);
    setCards(newCards);

    // Check for a match
    if (flippedCards.length === 1) {
      if (cards[flippedCards[0]].number === cards[index].number) {
        setMatches(matches + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[flippedCards[0]].flipped = false;
          newCards[index].flipped = false;
          setFlippedCards([]);
          setCards(newCards);
        }, 500);
      }
    }
  }

  

  return (
    <div>
      <button onClick={initCards}
      style={{ 
        marginTop: '40px',
        padding: '20px'
      }} >Start Game</button>
      <div style={{
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }} 
      >
        {cards.map((card, index) => (
          <div className='container'
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              width: '50px',
              height: '50px',
              margin: '30px',
              padding: '40px',
              textAlign: 'center',
              background: card.flipped ? 'white' : 'black',
              color: card.flipped ? 'black' : 'white',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            {card.flipped ? card.number : ''}
          </div>
        ))}
      </div>

    </div>
  );
}

export default MemoryMatch;
