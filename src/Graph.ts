interface NodeData {
  value: string;
  xPos: number;
  yPos: number;
  isValid: boolean;
}

class Graph {
  // nodes with value of "1" are considered valid
  private _visitedNodes: Map<string, NodeData>;

  private _subGraphsCount: number;

  static isValidTile(value: string): boolean {
    return value === '1';
  }

  static createNodeId(x: number, y: number): string {
    return `${x},${y}`;
  }

  static decodeNodeId(nodeId: string): [number, number] {
    const arr = nodeId.split(',');
    return [parseInt(arr[0]), parseInt(arr[1])];
  }

  constructor() {
    this._visitedNodes = new Map();
    this._subGraphsCount = 0;
  }

  rebuild(nodes: string[][]) {
    this._visitedNodes = new Map();
    this._subGraphsCount = 0;

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = 0; j < nodes[0].length; j += 1) {
        const isVisited = this._isVisitedTile(j, i);
        const isValid = Graph.isValidTile(nodes[i][j]);
        const nodeData: NodeData = {
          value: nodes[i][j],
          xPos: j,
          yPos: i,
          isValid,
        };

        this._visitedNodes.set(Graph.createNodeId(j, i), nodeData);

        if (!isVisited && isValid) {
          console.log(
            `Increased sub-graph count at [${j}, ${i}], isVisited: ${isVisited}, isValid: ${isValid}`
          );
          this._subGraphsCount += 1;

          // Check node on the left
          this._traverse(nodes, j - 1, i);
          // Check node on the right
          this._traverse(nodes, j + 1, i);
          // Check node on top
          this._traverse(nodes, j, i - 1);
          // Check node at top-left
          this._traverse(nodes, j - 1, i - 1);
          // Check node at top-right
          this._traverse(nodes, j + 1, i - 1);
          // Check node at bottom
          this._traverse(nodes, j, i + 1);
          // Check node at bottom-left
          this._traverse(nodes, j - 1, i + 1);
          // Check node at bottom-right
          this._traverse(nodes, j + 1, i + 1);
        }
      }
    }

    console.log(`Nodes (re)building done, found ${this._visitedNodes.size} tile(s)`);
    console.log(`No. of sub-graphs found: ${this._subGraphsCount}`);
  }

  _isVisitedTile(x: number, y: number): boolean {
    return this._visitedNodes.has(Graph.createNodeId(x, y));
  }

  _traverse(nodes: string[][], x: number, y: number) {
    if (!nodes[y]?.[x]) {
      return;
    }

    const isVisited = this._isVisitedTile(x, y);
    const isValid = Graph.isValidTile(nodes[y][x]);

    if (isVisited) {
      console.log(`\tSkipped visited tile at [${x}, ${y}]...`);
      return;
    }

    const nodeData: NodeData = {
      value: nodes[y][x],
      xPos: x,
      yPos: y,
      isValid,
    };

    this._visitedNodes.set(Graph.createNodeId(x, y), nodeData);

    console.log(
      `Processed tile at [${x}, ${y}], isValid: ${isValid}, visited tiles: ${this._visitedNodes.size}`
    );

    if (isValid) {
      console.log(`\tCheck tiles surrounding current tile...`);

      // Check node on the left
      this._traverse(nodes, x - 1, y);
      // Check node on the right
      this._traverse(nodes, x + 1, y);
      // Check node on top
      this._traverse(nodes, x, y - 1);
      // Check node at top-left
      this._traverse(nodes, x - 1, y - 1);
      // Check node at top-right
      this._traverse(nodes, x + 1, y - 1);
      // Check node at bottom
      this._traverse(nodes, x, y + 1);
      // Check node at bottom-left
      this._traverse(nodes, x - 1, y + 1);
      // Check node at bottom-right
      this._traverse(nodes, x + 1, y + 1);
    }
  }
}

export default Graph;
