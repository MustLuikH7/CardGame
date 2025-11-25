import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'
import { createDeck, shuffleDeck, dealCards, findStartingPlayer, playCard, isValidMove, stealCard, playerCount } from './gameLogic'
import Card from './Card'
import GameTable from './GameTable'
function App() {

  const [hands, setHands] = useState([])
  const [table, setTable] = useState(({ Hearts: [], Spades: [], Diamonds: [], Clubs: [] }))
  const [currentPlayer, setCurrentPlayer] = useState()
  const [gameStatus, setGameStatus] = useState("Loading")

  useEffect(() => {
    const deck = createDeck()
    const shuffled = shuffleDeck(deck)
    const dealtHands = dealCards(shuffled, playerCount)
    const starter = findStartingPlayer(dealtHands)
    setHands(dealtHands)
    setCurrentPlayer(starter)
    setGameStatus("Playing")


  }, [])
  if (gameStatus === "Loading" || !hands.length) return <div>Loading...</div>;

  const currentHand = hands[currentPlayer];

  return (
    <div style={{ padding: '20px', backgroundColor: '#228B22', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <h1 style={{ color: 'white', textAlign: 'center' }}>Risti kümme</h1>
      <div style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
        <p>Current Player: <strong>{currentPlayer}</strong></p>
        <p>Status: {gameStatus}</p>
      </div>

      <GameTable table={table} />

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
          <h3>Sinu kaardid:</h3>

          <button
            onClick={handleSteal}
            style={{
              padding: '10px 20px',
              backgroundColor: '#8B0000',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Võta kaart (Pass)
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {currentHand.map((card) => (
            <Card
              key={card.id}
              suit={card.suit}
              rank={card.rank}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>

    </div>
  )
  function getNextActivePlayer(currentIndex, currentHands) {
    let nextIndex = currentIndex;
    for (let i = 0; i < 4; i++) {
      nextIndex = (nextIndex + 1) % 4;
      if (currentHands[nextIndex].length > 0) {
        return nextIndex;
      }
    }
    return -1;
  }
  function handleCardClick(cardToPlay) {
    if (gameStatus === "GameOver") return;

    if (!isValidMove(cardToPlay, table)) {
      alert("Nii vapsjee ei saa");
      return;
    }

    const newHands = [...hands];
    const newTable = { ...table };

    const handIndex = currentPlayer;
    const hand = newHands[handIndex];

    const cardIndex = hand.findIndex(c => c.id === cardToPlay.id);
    if (cardIndex === -1) return;

    const suit = cardToPlay.suit;
    newTable[suit] = [...newTable[suit], cardToPlay];

    hand.splice(cardIndex, 1);

    setHands(newHands);
    setTable(newTable);


    const activePlayersCount = newHands.filter(h => h.length > 0).length;

    if (hand.length === 0) {
      alert(`Mängija ${currentPlayer} on vaba! (Kaardid otsas)`);
    }

    if (activePlayersCount === 1) {
      const loserIndex = newHands.findIndex(h => h.length > 0);

      setGameStatus("GameOver");
      alert(`MÄNG LÄBI! Mängija ${loserIndex} on KAOTAJA!`);
      setCurrentPlayer(null);
      return;
    }

    const nextPlayer = getNextActivePlayer(currentPlayer, newHands);
    setCurrentPlayer(nextPlayer);
  }
  function handleSteal() {
    if (gameStatus === "GameOver") return;

    const newHands = [...hands];

    stealCard(newHands, currentPlayer);

    const myHand = newHands[currentPlayer];
    if (myHand.length > 0) {
      const stolenCard = myHand[myHand.length - 1];
      alert(`Sa varastasid kaardi: ${stolenCard.rank} ${stolenCard.suit}`);
    }

    setHands(newHands);


    const activePlayersCount = newHands.filter(h => h.length > 0).length;

    if (activePlayersCount === 1) {
      const loserIndex = newHands.findIndex(h => h.length > 0);

      setGameStatus("GameOver");
      alert(`MÄNG LÄBI! Mängija ${loserIndex} on KAOTAJA! (Teised on vabad)`);
      setCurrentPlayer(null);
      return;

      const nextPlayer = getNextActivePlayer(currentPlayer, newHands);
      setCurrentPlayer(nextPlayer);
    }

  }
}

export default App
