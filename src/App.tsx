import "./App.css";
import Navigation from "./components/navigation/navigation";
import { useIsMobile } from "./hooks/is-mobile";

function App() {
  const isMobile = useIsMobile();

  return (
    <section className="bg-accent min-h-dvh">
      <Navigation isMobile={isMobile} />
    </section>
  );
}

export default App;
