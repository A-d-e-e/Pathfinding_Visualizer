// src/components/Controls.jsx
import React from 'react';

export default function Controls({
  algorithm, setAlgorithm,
  speed, setSpeed,
  startCoord, setStartCoord,
  endCoord, setEndCoord,
  generateWalls, resetGrid, visualize, stop    // ← accept stop prop
}) {
  return (
    <div className="controls flex flex-wrap gap-2 p-4 bg-white rounded shadow justify-center">
      <label>
        Algorithm:
        <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
          <option value="DFS">Dijkstra</option>
          <option value="BFS">BFS</option>
          <option value="Dijkstra">DFS</option>
          <option value="AStar">A*</option>
        </select>
      </label>

      <label>
        Speed:
        <input type="range" min="10" max="200" step="10"
               value={speed} onChange={e => setSpeed(+e.target.value)} />
        {speed} ms
      </label>

      <label>
        Start (r,c):
        <input type="text" value={startCoord}
               onChange={e => setStartCoord(e.target.value)}
               placeholder="e.g. 0,0" />
      </label>

      <label>
        End (r,c):
        <input type="text" value={endCoord}
               onChange={e => setEndCoord(e.target.value)}
               placeholder="e.g. 19,29" />
      </label>

      <button onClick={generateWalls}>Random Walls</button>
      <button onClick={resetGrid}>Clear</button>
      <button onClick={visualize}>Start</button>
      <button onClick={stop}>Stop</button>                         {/* ← new Stop */}
    </div>
  );
}
