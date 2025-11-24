const suits = ["Hearts", "Spades", "Clubs", "Diamonds"]
const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"]
const values = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14
};
const playerCount = 4
function createDeck() {
    const deck = []
    for (const suit of suits) {
        for (const rank of ranks) {
            const numericValue = values[rank];
            const card = {
                suit: suit,
                rank: rank,
                value: numericValue,
                id: `${suit}-${rank}`,
            }
            deck.push(card)
        }
    }
    return deck
}
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}
function dealCard(deck, playerCount) {
    const hands = []
    for (let i = 0; i < playerCount; i++) {
        hands.push([])
    }
    for (let i = 0; i < deck.length; i++) {
        const card = deck[i]
        const player = i % playerCount
        hands[player].push(card)
    }
    return hands

}
const myDeck = createDeck();
console.log("Original Deck Size:", myDeck.length);

// 2. Shuffle it
shuffleDeck(myDeck);
console.log("First card after shuffle:", myDeck[0]); // Random check

// 3. Deal to 4 players
const myHands = dealCard(myDeck, playerCount);

// 4. Verify results
console.log("Total Players:", myHands.length);
console.log("Player 0 has:", myHands[0].length, "cards");
console.log("Player 1 has:", myHands[1].length, "cards");

// Show Player 0's full hand to verify variety
console.log("\n--- Player 0's Hand ---");
console.table(myHands[0]);