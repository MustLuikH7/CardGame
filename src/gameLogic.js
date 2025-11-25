const suits = ["Hearts", "Spades", "Clubs", "Diamonds"]
const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"]
const values = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14
};
export const playerCount = 4
const table = {
    "Hearts": [],
    "Spades": [],
    "Diamonds": [],
    "Clubs": []
};
export function createDeck() {
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
export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}
export function dealCards(deck, playerCount) {
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
export function findStartingPlayer(hands) {
    for (let i = 0; i < hands.length; i++) {
        for (const card of hands[i]) {
            if (card.suit === "Clubs" && card.rank === "10")
                return i
        }
    }
}
export function playCard(hand, cardToPlay, table) {
    const index = hand.findIndex(c => c.id === cardToPlay.id)
    if (index === -1) {
        return
    } else {
        table[cardToPlay.suit].push(cardToPlay)
        hand.splice(index, 1)
    }
}
export function isValidMove(card, table) {
    if (card.rank === "10") return true;

    const pile = table[card.suit];

    if (pile.length === 0) return false;

    const hasNine = pile.some(c => c.rank === "9");
    const hasJack = pile.some(c => c.rank === "J");

    if (card.value < 10) {
        const neighborVal = card.value + 1;
        const hasNeighbor = pile.some(c => c.value === neighborVal);

        if (!hasNeighbor) return false;

        if (card.rank !== "9") {
            if (!hasJack) return false;
        }
    }

    if (card.value > 10) {

        const neighborVal = card.value - 1;
        const hasNeighbor = pile.some(c => c.value === neighborVal);

        if (!hasNeighbor) return false;


        if (card.rank !== "J") {
            if (!hasNine) return false;
        }
    }

    return true;
}


export function stealCard(hands, currentPlayerIndex) {
    const totalPlayers = hands.length;
    let victimIndex = currentPlayerIndex;
    let foundVictim = false;

    for (let i = 0; i < totalPlayers - 1; i++) {
        victimIndex = (victimIndex - 1 + totalPlayers) % totalPlayers;

        if (hands[victimIndex].length > 0) {
            foundVictim = true;
            break;
        }
    }

    if (!foundVictim) {
        console.log("No one has cards left to steal!");
        return;
    }

    const victimHand = hands[victimIndex];
    const randomCardIndex = Math.floor(Math.random() * victimHand.length);
    const stolenCard = victimHand[randomCardIndex];

    victimHand.splice(randomCardIndex, 1);
    hands[currentPlayerIndex].push(stolenCard);

    console.log(`Player ${currentPlayerIndex} stole [${stolenCard.id}] from Player ${victimIndex}`);
}


