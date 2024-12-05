// GraphCanvas.js
import React, { useState, useEffect } from "react";
import { ReactFlowProvider, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { calculateMaxFlow } from "../utils/graphAlgorithms";
import {
	GraphCanvasContainer,
	FinishButton,
	MaxFlowContainer,
	RestartButton,
} from "./styles.js";

function GraphCanvas({ onFinish }) {
	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);
	const [maxFlow, setMaxFlow] = useState(null);
	const [maxFlowPaths, setMaxFlowPaths] = useState([]);

	// Inicializa o grafo fixo
	useEffect(() => {
		const initialNodes = [
			{ id: "1", position: { x: 50, y: 150 }, data: { label: "1" } },
			{ id: "2", position: { x: 300, y: 50 }, data: { label: "2" } },
			{ id: "3", position: { x: 300, y: 250 }, data: { label: "3" } },
			{ id: "4", position: { x: 550, y: 150 }, data: { label: "4" } },
			{ id: "5", position: { x: 800, y: 150 }, data: { label: "5" } },
		];

		const initialEdges = [
			{ id: "e1-2", source: "1", target: "2", label: "3" },
			{ id: "e1-3", source: "1", target: "3", label: "10" },
			{ id: "e2-4", source: "2", target: "4", label: "1" },
			{ id: "e2-5", source: "2", target: "5", label: "4" },
			{ id: "e3-4", source: "3", target: "4", label: "2" },
			{ id: "e4-5", source: "4", target: "5", label: "2" },
		];

		setNodes(initialNodes);
		setEdges(initialEdges);
	}, []);

	const handleFinish = () => {
		const graphData = {
			nodes: nodes.map((node) => ({
				id: node.id,
				position: node.position,
				label: node.data.label,
			})),
			edges: edges.map((edge) => ({
				id: edge.id,
				source: edge.source,
				target: edge.target,
				weight: parseFloat(edge.label),
			})),
		};

		// Calcular fluxo máximo e atualizar estado
		const { maxFlow, paths } = calculateMaxFlow(graphData, "1", "5");
		setMaxFlow(maxFlow);
		setMaxFlowPaths(paths);
	};

	const handleEdgeClick = (event, edge) => {
		event.preventDefault();
		const newWeight = prompt(
			"Digite a nova distância (peso) da aresta:",
			edge.label
		);
		if (newWeight !== null && newWeight.trim() !== "" && !isNaN(newWeight)) {
			setEdges((prevEdges) =>
				prevEdges.map((e) =>
					e.id === edge.id ? { ...e, label: `${newWeight}` } : e
				)
			);
		}
	};

	return (
		<GraphCanvasContainer>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onEdgeClick={handleEdgeClick}
					style={{ background: "#f0f0f0", height: "100%" }}
				/>
			</ReactFlowProvider>
			{maxFlow === null && (
				<FinishButton onClick={handleFinish}>Finalizar Grafo</FinishButton>
			)}
			{maxFlow !== null && (
				<MaxFlowContainer>
					<strong style={{ fontSize: "1.5rem" }}>Fluxo Máximo:</strong>
					<p style={{ fontSize: "1.2rem", margin: "10px 0" }}>{maxFlow}</p>
					<strong style={{ fontSize: "1.2rem" }}>Caminhos Aumentantes:</strong>
					<div style={{ fontSize: "1rem", margin: "10px 0" }}>
						{maxFlowPaths.map((path, index) => (
							<div key={index}>
								<strong>Caminho {index + 1}:</strong> {path.join(" → ")}
							</div>
						))}
					</div>
					<RestartButton onClick={() => setMaxFlow(null)}>
						Fazer Novo Grafo
					</RestartButton>
				</MaxFlowContainer>
			)}
		</GraphCanvasContainer>
	);
}

export default GraphCanvas;
