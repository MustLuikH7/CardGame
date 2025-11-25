import React from 'react';

function Card({ suit, rank, onClick }) {
    const isRed = suit === "Hearts" || suit === "Diamonds";

    const cardStyle = {
        border: '1px solid #333',
        borderRadius: '8px',
        width: '60px',
        height: '90px',
        margin: '5px',
        backgroundColor: 'white',
        color: isRed ? 'red' : 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none'
    };

    return (
        <div style={cardStyle} onClick={onClick}>
            { }
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{rank}</div>

            { }
            <div style={{ fontSize: '12px' }}>{suit}</div>
        </div>
    );
}

export default Card;