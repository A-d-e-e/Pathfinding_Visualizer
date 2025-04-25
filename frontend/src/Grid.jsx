// src/Grid.jsx
import React from 'react';
import './Grid.css';

export default function Grid({ grid }) {
  return (
    <div className="grid object-center">
      {grid.map((row, ri) => (
        <div key={ri} className="grid-row">
          {row.map(cell => (
            <div
              key={`${cell.row}-${cell.col}`}
              className={`cell ${cell.isWall ? 'wall' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
