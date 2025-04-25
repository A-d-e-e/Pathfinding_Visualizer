from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from algorithms import bfs, dfs, dijkstra, astar

app = Flask(__name__)
CORS(app)

@app.route('/api/path', methods=['POST'])
def get_path():
    data = request.json
    grid = data['grid']
    start = tuple(data['start'])
    end = tuple(data['end'])
    algo = data['algorithm']
    if algo == 'BFS': order, path = bfs(grid, start, end)
    elif algo == 'DFS': order, path = dfs(grid, start, end)
    elif algo == 'Dijkstra': order, path = dijkstra(grid, start, end)
    else: order, path = astar(grid, start, end)
    return jsonify({'order': order, 'path': path})

if __name__ == '__main__':
    app.run(debug=True, port=int(os.getenv('PORT', 5000)))