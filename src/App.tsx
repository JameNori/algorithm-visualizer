import { ArrayBarChart } from "./components/ArrayBarChart";
import { createInitialBars } from "./algorithms/utils";

function App() {
  return <ArrayBarChart bars={createInitialBars([100, 50, 20, 80, 30])} />;
}

export default App;
