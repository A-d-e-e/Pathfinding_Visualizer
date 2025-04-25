// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';            // ← added useRef
import Controls from './components/Controls';
import Node from './components/Node';
import { dfs, bfs, dijkstra, astar } from './algorithms';
import ThemeSwitch from './components/ThemeSwitch';

export default function App() {
  const rows = 20, cols = 30;
  const [grid, setGrid] = useState([]);
  const [algorithm, setAlgorithm] = useState('DFS');
  const [speed, setSpeed] = useState(50);
  const [startCoord, setStartCoord] = useState('0,0');
  const [endCoord, setEndCoord] = useState(`${rows-1},${cols-1}`);
  const [statusMap, setStatusMap] = useState({}); 
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const g = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({ row: r, col: c, isWall: false }))
    );
    setGrid(g);
  }, []);

  const toggleWall = (r, c) => {
    setGrid(g => {
      const g2 = g.map(row => row.map(c => ({ ...c })));
      g2[r][c].isWall = !g2[r][c].isWall;
      return g2;
    });
  };

  const generateWalls = () => {
    let attempt = 0, maxAttempts = 10;
    const tryGen = () => {
      setGrid(g =>
        g.map(row =>
          row.map(c => ({ ...c, isWall: Math.random() < 0.3 }))
        )
      );
      setTimeout(() => {
        let sr, sc, er, ec;
        try {
          [sr, sc] = parseCoord(startCoord);
          [er, ec] = parseCoord(endCoord);
        } catch {
          return; 
        }
        const { path } = bfs({
          grid,
          start: { r: sr, c: sc },
          end:   { r: er, c: ec }
        });
        if (path.length === 0 && attempt < maxAttempts) {
          attempt++;
          tryGen();
        } else if (path.length === 0) {
          alert('Could not generate walls without blocking path.');
        }
      }, 0);
    };
    tryGen();
  };

  const resetGrid = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
    setStatusMap({});
    setGrid(g => g.map(row => row.map(c => ({ ...c, isWall: false }))));
  };

  const parseCoord = str => {
    const parts = str.split(',').map(s => s.trim());            
    const r = Number.parseInt(parts[0], 10);
    const c = Number.parseInt(parts[1], 10);
    if (Number.isNaN(r) || Number.isNaN(c)) {
      throw new Error(`Invalid coordinate: "${str}"`);
    }
    return [r, c];
  };

  const visualize = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
    setStatusMap({});

    let sr, sc, er, ec;
    try {
      [sr, sc] = parseCoord(startCoord);
      [er, ec] = parseCoord(endCoord);
    } catch (err) {
      alert(err.message);
      return;
    }
    if (
      sr<0||sr>=rows||sc<0||sc>=cols||
      er<0||er>=rows||ec<0||ec>=cols
    ) {
      alert('Start/end coordinates out of bounds');
      return;
    }

    const algoFn = ({grid,start,end}) => {
      switch(algorithm) {
        case 'BFS':      return bfs({grid,start,end});
        case 'DFS':      return dfs({grid,start,end});
        case 'AStar':    return astar({grid,start,end});
        default:         return dijkstra({grid,start,end});
      }
    };

    const { visitedOrder, path } = algoFn({
      grid, start:{r:sr,c:sc}, end:{r:er,c:ec}
    });

    visitedOrder.forEach(({r,c}, i) => {
      const id = setTimeout(() => {
        setStatusMap(m => ({ ...m, [`${r}-${c}`]:'visited' }));
      }, speed * i);
      timeoutsRef.current.push(id);      
    });

    const delay = speed * visitedOrder.length;
    path.forEach(({r,c}, i) => {
      const id = setTimeout(() => {
        setStatusMap(m => ({ ...m, [`${r}-${c}`]:'path' }));
      }, delay + speed * i);
      timeoutsRef.current.push(id);
    });

    setStatusMap(m => ({
      ...m,
      [`${sr}-${sc}`]:'start',
      [`${er}-${ec}`]:'end'
    }));
  };

  return (
    <div className="app dark:bg-gray-900 dark:text-gray-100">
      <Controls
        algorithm={algorithm} setAlgorithm={setAlgorithm}
        speed={speed} setSpeed={setSpeed}
        startCoord={startCoord} setStartCoord={setStartCoord}
        endCoord={endCoord} setEndCoord={setEndCoord}
        generateWalls={generateWalls}
        resetGrid={resetGrid}
        visualize={visualize}
        stop={() => {                                            
          timeoutsRef.current.forEach(id => clearTimeout(id));
          timeoutsRef.current = [];
        }}
      />

      <div className="grid">
        {grid.map((row, ri) => (
          <div key={ri} className="grid-row">
            {row.map(cell => (
              <Node
                key={`${cell.row}-${cell.col}`}
                cell={cell}
                onToggleWall={toggleWall}
                status={statusMap[`${cell.row}-${cell.col}`]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
