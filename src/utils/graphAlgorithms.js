// graphAlgorithms.js
export function calculateMaxFlow(graphData, source, sink) {
    const capacity = {};

    // Inicializar capacidades
    graphData.nodes.forEach(({ id }) => {
        capacity[id] = {};
    });

    // Construir capacidades e lista de adjacência dirigidas
    graphData.edges.forEach(({ source: u, target: v, weight }) => {
        capacity[u][v] = weight;

        // Inicializar capacidade reversa a zero
        if (!capacity[v][u]) capacity[v][u] = 0;
    });

    let maxFlow = 0;
    const paths = [];

    // Função BFS para encontrar caminhos com capacidade residual positiva
    const bfs = () => {
        const visited = new Set();
        const queue = [source];
        const parent = {};
        visited.add(source);

        while (queue.length > 0) {
            const current = queue.shift();
            console.log(`Visitando nó: ${current}`);

            for (const neighbor in capacity[current]) {
                const residualCapacity = capacity[current][neighbor];

                if (!visited.has(neighbor) && residualCapacity > 0) {
                    console.log(
                        `Encontrado vizinho ${neighbor} de ${current} com capacidade residual ${residualCapacity}`
                    );
                    queue.push(neighbor);
                    visited.add(neighbor);
                    parent[neighbor] = current;

                    if (neighbor === sink) {
                        // Reconstruir o caminho
                        let pathFlow = Infinity;
                        let s = sink;
                        const currentPath = [];

                        while (s !== source) {
                            currentPath.push(s);
                            const prev = parent[s];
                            pathFlow = Math.min(pathFlow, capacity[prev][s]);
                            s = prev;
                        }
                        currentPath.push(source);
                        currentPath.reverse();

                        console.log(
                            `Caminho aumentante encontrado: ${currentPath.join(" → ")}, fluxo: ${pathFlow}`
                        );

                        // Atualizar capacidades residuais
                        s = sink;
                        while (s !== source) {
                            const prev = parent[s];
                            capacity[prev][s] -= pathFlow;
                            capacity[s][prev] += pathFlow;
                            s = prev;
                        }

                        console.log("Capacidades após atualização:", JSON.stringify(capacity));

                        maxFlow += pathFlow;
                        paths.push(currentPath);
                        return true;
                    }
                }
            }
        }

        return false;
    };

    // Loop principal para encontrar caminhos aumentantes
    while (bfs());

    console.log(`Fluxo máximo calculado: ${maxFlow}`);
    return { maxFlow, paths };
}
