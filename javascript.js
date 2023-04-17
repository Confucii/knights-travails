function generateGraph() {
  const graph = new Map()
  const moves = [[2, 1], [2, -1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [1, -2], [-1, -2]]
  const queue = [[0, 0]]
  while (queue[0]) {
    const newMoves = [];
    moves.forEach(elem => {
      const x = queue[0][0] + elem[0]
      const y = queue[0][1] + elem[1]
      if (!(x < 0 || x > 7 || y < 0 || y > 7)) {
        newMoves.push([x, y])
        
        if (!graph.has(`[${x},${y}]`)) {
          queue.push([x, y])
          graph.set(JSON.stringify([x, y]), [])
        }
      }
    })
    graph.set(JSON.stringify(queue[0]), newMoves)
    queue.shift()
  }

  return graph
}

const moves = generateGraph();

function knightMoves(vertice_one, vertice_two) {
  if (vertice_one[0] === vertice_two[0] && vertice_one[1] === vertice_two[1]) {
    return [vertice_one]
  }

  const paths = [[vertice_one]]
  const visited = [JSON.stringify(vertice_one)]

  while (paths[0]) {
    let currentPath = paths.shift()
    const connections = moves.get(JSON.stringify(currentPath[currentPath.length - 1]))
    
    for (elem of connections) {
      if (!visited.includes(JSON.stringify(elem))) {
        if (elem[0] === vertice_two[0] && elem[1] === vertice_two[1]) {
          return currentPath.concat([elem])
        } else {
          visited.push(JSON.stringify(elem))
          paths.push(currentPath.concat([elem]))
        }
      }
    }
  }
  return null;
}

console.log(knightMoves([7, 0], [7, 2]));