import "./app.css";
import { useState } from "react";
import GraphCanvas from "./components/GraphCanvas";

function App() {
	const [isCreating, setIsCreating] = useState(false);

	return (
		<div className="main">
			{!isCreating ? (
				<button className="button_inicial" onClick={() => setIsCreating(true)}>
					Criar Grafo
				</button>
			) : (
				<GraphCanvas onFinish={() => setIsCreating(false)} />
			)}
		</div>
	);
}

export default App;
