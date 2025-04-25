// src/algorithms.js

// ── BFS ───────────────────────────────────────────────────────────────────────
export function bfs({ grid, start, end }) {
    const R = grid.length, C = grid[0].length;
    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    const prev    = Array.from({ length: R }, () => Array(C).fill(null));
    const q = [];
    const visitedOrder = [];
  
    q.push(start);
    visited[start.r][start.c] = true;
  
    while (q.length) {
      const { r, c } = q.shift();
      visitedOrder.push({ r, c });
      if (r === end.r && c === end.c) break;
  
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r + dr, nc = c + dc;
        if (
          nr >= 0 && nr < R && nc >= 0 && nc < C &&
          !visited[nr][nc] &&
          !grid[nr][nc].isWall
        ) {
          visited[nr][nc] = true;
          prev[nr][nc] = { r, c };
          q.push({ r: nr, c: nc });
        }
      }
    }
  
    const path = [];
    let cur = (visited[end.r]||[])[end.c] ? end : null;
    while (cur) {
      path.unshift(cur);
      cur = prev[cur.r]?.[cur.c];
    }
  
    return { visitedOrder, path };
  }
  
  // ── DFS (recursive, early-stop) ───────────────────────────────────────────────
  export function dfs({ grid, start, end }) {
    const R = grid.length, C = grid[0].length;
    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    const prev    = Array.from({ length: R }, () => Array(C).fill(null));
    const visitedOrder = [];
    let found = false;
  
    function recurse(r, c) {
      if (found || visited[r][c]) return;                    // abort if goal found 
      visited[r][c] = true;
      visitedOrder.push({ r, c });
      if (r === end.r && c === end.c) { found = true; return; }
  
      for (const [dr, dc] of [[0,-1],[0,1],[-1,0],[1,0]]) {
        const nr = r + dr, nc = c + dc;
        if (
          nr >= 0 && nr < R && nc >= 0 && nc < C &&
          !visited[nr][nc] &&
          !grid[nr][nc].isWall
        ) {
          prev[nr][nc] = { r, c };
          recurse(nr, nc);
          if (found) return;                                  // stop siblings once found
        }
      }
    }
  
    recurse(start.r, start.c);
  
    const path = [];
    if (visited[end.r][end.c]) {
      let cur = end;
      while (cur) {
        path.unshift(cur);
        cur = prev[cur.r]?.[cur.c];
      }
    }
  
    return { visitedOrder, path };
  }
  
  // ── DIJKSTRA (early-exit) ─────────────────────────────────────────────────────
  export function dijkstra({ grid, start, end }) {
    const R = grid.length, C = grid[0].length;
    const dist    = Array.from({ length: R }, () => Array(C).fill(Infinity));
    const prev    = Array.from({ length: R }, () => Array(C).fill(null));
    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    const visitedOrder = [];
  
    dist[start.r][start.c] = 0;
  
    outer: while (true) {                                     // label for early break :contentReference[oaicite:2]{index=2}
      let min = Infinity, u = null;
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          if (!visited[r][c] && dist[r][c] < min) {
            min = dist[r][c];
            u = { r, c };
          }
        }
      }
      if (!u) break;
      const { r, c } = u;
      visited[r][c] = true;
      visitedOrder.push({ r, c });
  
      if (r === end.r && c === end.c) break outer;            // stop entire loop on target :contentReference[oaicite:3]{index=3}
  
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r + dr, nc = c + dc;
        if (
          nr >= 0 && nr < R && nc >= 0 && nc < C &&
          !visited[nr][nc] &&
          !grid[nr][nc].isWall
        ) {
          const alt = dist[r][c] + 1;
          if (alt < dist[nr][nc]) {
            dist[nr][nc] = alt;
            prev[nr][nc] = { r, c };
          }
        }
      }
    }
  
    const path = [];
    let cur = dist[end.r][end.c] < Infinity ? end : null;
    while (cur) {
      path.unshift(cur);
      cur = prev[cur.r]?.[cur.c];
    }
  
    return { visitedOrder, path };
  }
  
  // ── A* SEARCH ─────────────────────────────────────────────────────────────────
  function heuristic(a, b) {
    return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
  }
  
  export function astar({ grid, start, end }) {
    const R = grid.length, C = grid[0].length;
    const gScore = Array.from({ length: R }, () => Array(C).fill(Infinity));
    const fScore = Array.from({ length: R }, () => Array(C).fill(Infinity));
    const prev   = Array.from({ length: R }, () => Array(C).fill(null));
    const visitedOrder = [];
  
    gScore[start.r][start.c] = 0;
    fScore[start.r][start.c] = heuristic(start, end);
  
    const openSet = [ start ];
    const inOpen  = Array.from({ length: R }, () => Array(C).fill(false));
    inOpen[start.r][start.c] = true;
  
    while (openSet.length) {
      let idx = 0;
      for (let i = 1; i < openSet.length; i++) {
        const u = openSet[i], best = openSet[idx];
        if (fScore[u.r][u.c] < fScore[best.r][best.c]) idx = i;
      }
      const { r, c } = openSet.splice(idx, 1)[0];
      inOpen[r][c] = false;
      visitedOrder.push({ r, c });
  
      if (r === end.r && c === end.c) break;
  
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r + dr, nc = c + dc;
        if (
          nr >= 0 && nr < R && nc >= 0 && nc < C &&
          !grid[nr][nc].isWall
        ) {
          const tentativeG = gScore[r][c] + 1;
          if (tentativeG < gScore[nr][nc]) {
            prev[nr][nc] = { r, c };
            gScore[nr][nc] = tentativeG;
            fScore[nr][nc] = tentativeG + heuristic({ r: nr, c: nc }, end);
            if (!inOpen[nr][nc]) {
              openSet.push({ r: nr, c: nc });
              inOpen[nr][nc] = true;
            }
          }
        }
      }
    }
  
    const path = [];
    let cur = fScore[end.r][end.c] < Infinity ? end : null;
    while (cur) {
      path.unshift(cur);
      cur = prev[cur.r]?.[cur.c];
    }
  
    return { visitedOrder, path };
  }
  