## Pathfinding Algorithm Visualizer

An interactive tool to visualize how classic pathfinding algorithms explore a grid and find shortest paths. Users can place walls, choose between DFS, BFS, Dijkstra’s, and A* algorithms, adjust speed, set start/end points, and watch the search animate in real time. 

---

## Features

- **Interactive 2D grid** with click-to-toggle walls and draggable start/end nodes.   
- **Four algorithms**: Depth-First Search (DFS), Breadth-First Search (BFS), Dijkstra’s, and A*.   
- **Animation controls**: speed slider, Start and Stop buttons, and “Random Walls” generator with guaranteed connectivity.   
- **Color-coded states**: walls, visited nodes, final path, open/closed sets, start/end.   
- **Responsive design** using CSS Grid and Tailwind CSS for layout and styling.    

---

## Tech Stack

- **Frontend**: React (Create React App).   
- **Styling**: Tailwind CSS with custom CSS Grid and animations.   
- **Animations**: CSS `@keyframes bounce` and Tailwind’s `animate-bounce` utility.   
- **Algorithms**: JavaScript implementations of DFS, BFS, Dijkstra, A* in `src/algorithms.js`.   

---

## Installation (Local)

1. **Clone the repo**  
   ```bash
   git clone https://github.com/A-d-e-e/Pathfinding_Visualizer.git
   ```  

2. **Backend setup** (Flask API)  
   ```bash
   cd pathfinding-visualizer/backend  
   python3.11 -m venv venv  
   source venv/bin/activate        # Windows: .\venv\Scripts\activate  
   pip install -r requirements.txt   
   $Env:FLASK_APP="app.py"         # Windows PowerShell  
   flask run  
   ```  

3. **Frontend setup**  
   ```bash
   cd ../frontend  
   npm install                     # installs React, Tailwind, react-icons, etc.   
   npm start                       # launches at http://localhost:3000   
   ```  

---

## Usage

- **Select Algorithm** from the dropdown (DFS, BFS, Dijkstra, A*).  
- **Adjust Speed** with the range slider (10–200 ms per step).  
- **Set Start/End** coordinates (e.g. `0,0` and `19,29`).  
- **Random Walls**: generates obstacles but always leaves a valid path.   
- **Start**: begins the animated search.  
- **Stop**: halts the animation immediately.   
- **Clear**: resets grid to empty.  

---

## Controls

| Control       | Description                                           |
|---------------|-------------------------------------------------------|
| Algorithm     | Dropdown to choose DFS, BFS, Dijkstra, or A*         |
| Speed Slider  | Adjust animation delay between node visits           |
| Start (r,c)   | Input start cell coordinates                         |
| End (r,c)     | Input end cell coordinates                           |
| Random Walls  | Populate walls randomly (guaranteed connectivity)     |
| Start Button  | Begin visualization                                   |
| Stop Button   | Immediately cancel ongoing animation                  |
| Clear Button  | Reset grid to empty                                   |

---

## Styling and Animations

- **Dark Mode** toggle via a ThemeSwitch component and Tailwind’s `dark:` classes.   
- **Centered grid** using `<div class="flex justify-center items-center min-h-screen">` wrapper.   
- **Poppins font** imported from Google Fonts for a modern UI.   
- **Bounce effect** on visited and final path nodes via CSS keyframes and `bounce` class.   

---

## Project Structure

```
pathfinding-visualizer/
├─ backend/                # Flask API 
│   ├─ app.py
│   └─ requirements.txt
└─ frontend/               # React + Tailwind UI
    ├─ public/
    │   └─ index.html
    ├─ src/
    │   ├─ algorithms.js
    │   ├─ components/
    │   │   ├─ Controls.jsx
    │   │   ├─ Node.jsx
    │   │   └─ ThemeSwitch.jsx
    │   ├─ App.jsx
    │   ├─ index.js
    │   ├─ index.css
    │   └─ Grid.css
    ├─ package.json
    └─ tailwind.config.js
```

---

## Future Work

- **GitHub Pages Deployment**: automate `npm run build` + `gh-pages` publish step.   
- **Mobile Responsiveness**: refine grid scaling and controls for small screens.  
- **Additional Algorithms**: add Greedy Best-First Search, Bidirectional Search.  
- **Maze Generators**: integrate Recursive Division, Prim’s, Recursive Backtracker.  

---
