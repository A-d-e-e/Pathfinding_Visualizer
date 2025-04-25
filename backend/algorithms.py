from heapq import heappush, heappop

def get_neighbors(node, grid):
    x, y = node
    for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
        nx, ny = x+dx, y+dy
        if 0 <= nx < len(grid) and 0 <= ny < len(grid[0]) and not grid[nx][ny]:
            yield (nx, ny)

# BFS

def bfs(grid, start, end):
    from collections import deque
    queue = deque([start])
    visited = {start: None}
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        if node == end:
            break
        for nei in get_neighbors(node, grid):
            if nei not in visited:
                visited[nei] = node
                queue.append(nei)
    # reconstruct path
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = visited[cur]
    return order, path[::-1]

# DFS

def dfs(grid, start, end):
    stack = [start]
    visited = {start: None}
    order = []
    while stack:
        node = stack.pop()
        if node in order: continue
        order.append(node)
        if node == end:
            break
        for nei in get_neighbors(node, grid):
            if nei not in visited:
                visited[nei] = node
                stack.append(nei)
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = visited[cur]
    return order, path[::-1]

# Dijkstra

def dijkstra(grid, start, end):
    pq = []
    heappush(pq, (0, start))
    dist = {start: 0}
    prev = {start: None}
    order = []
    while pq:
        d, node = heappop(pq)
        order.append(node)
        if node == end:
            break
        for nei in get_neighbors(node, grid):
            nd = d + 1
            if nd < dist.get(nei, float('inf')):
                dist[nei] = nd
                prev[nei] = node
                heappush(pq, (nd, nei))
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = prev[cur]
    return order, path[::-1]

# A*

def heuristic(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1])


def astar(grid, start, end):
    pq = []
    heappush(pq, (0, start))
    g = {start: 0}
    prev = {start: None}
    order = []
    while pq:
        f, node = heappop(pq)
        order.append(node)
        if node == end:
            break
        for nei in get_neighbors(node, grid):
            ng = g[node] + 1
            if ng < g.get(nei, float('inf')):
                g[nei] = ng
                prev[nei] = node
                heappush(pq, (ng + heuristic(nei, end), nei))
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = prev[cur]
    return order, path[::-1]