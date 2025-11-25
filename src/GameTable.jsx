import React from 'react';
import Card from './Card';

function GameTable({ table }) {
    const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];

    return (
        <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '40px',
            padding: '20px',
            border: '2px dashed rgba(255,255,255,0.3)',
            borderRadius: '10px'
        }}>
            {suits.map(suit => {
                const pile = table[suit];

                const sortedPile = [...pile].sort((a, b) => a.value - b.value);

                const lowEnd = sortedPile[0];
                const highEnd = sortedPile[sortedPile.length - 1];

                const showSplit = pile.length > 1;

                return (

                    <div key={suit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ color: 'white', marginBottom: '10px', fontWeight: 'bold' }}>{suit}</span>

                        { }
                        <div style={{
                            width: showSplit ? '130px' : '60px',
                            height: '90px',
                            position: 'relative',
                            transition: 'all 0.3s ease'
                        }}>

                            {pile.length === 0 ? (
                                <div style={{
                                    width: '60px', height: '100%',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(0,0,0,0.1)'
                                }} />
                            ) : (
                                <>
                                    { }
                                    <div style={{
                                        position: showSplit ? 'absolute' : 'relative',
                                        left: showSplit ? '0' : 'auto',
                                        zIndex: 1
                                    }}>
                                        <Card suit={lowEnd.suit} rank={lowEnd.rank} />
                                    </div>

                                    { }
                                    {showSplit && (
                                        <div style={{
                                            position: 'absolute',
                                            right: '0',
                                            zIndex: 2
                                        }}>
                                            <Card suit={highEnd.suit} rank={highEnd.rank} />
                                        </div>
                                    )}

                                    { }
                                    {showSplit && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%', left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '40px', height: '4px',
                                            backgroundColor: 'gold',
                                            zIndex: 0
                                        }} />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default GameTable;