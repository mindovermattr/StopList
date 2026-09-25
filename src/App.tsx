import { useEffect, useState } from "react";
import { Layout } from "./components/Layout/Layout";

export function App() {
  const [state, setState] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/src/data/menu.json")
      .then((res) => res.json())
      .then((data) => setState(data));
  }, []);

  return (
    <Layout>
      {state.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </Layout>
  );
}
