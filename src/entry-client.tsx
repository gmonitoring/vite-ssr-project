import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RootStoreProvider } from "./store/rootStoreProvider";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { enableStaticRendering } from "mobx-react";
import { rehydrate } from "./store/storeUtils/hydrate";

const container = document.getElementById("root");

if (!container) throw new Error("root element must be declared");

const App = () => {
  const store = rehydrate();
  enableStaticRendering(false);

  return (
    <StrictMode>
      <RootStoreProvider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RootStoreProvider>
    </StrictMode>
  );
};

if (import.meta.hot || !container.innerText) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  hydrateRoot(container, <App />);
}
