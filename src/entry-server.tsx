import { StrictMode } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { enableStaticRendering } from "mobx-react";
import { RootStore } from "src/store/rootStore";
import { RootStoreProvider } from "src/store/rootStoreProvider";
import { Router } from "src/Router";

export function getStore(): RootStore {
  return new RootStore();
}

export async function prefetch(url: string, store: RootStore): Promise<void> {
  const path = url === "/" ? "/home" : url;
  const { prefetch } = await import(`src/pages${path}.tsx`);
  await prefetch?.(store);
}

export function render(url: string, store: RootStore) {
  enableStaticRendering(true);

  return {
    appHtml: ReactDOMServer.renderToString(
      <StrictMode>
        <RootStoreProvider store={store}>
          <StaticRouter location={url}>
            <Router />
          </StaticRouter>
        </RootStoreProvider>
      </StrictMode>
    ),
  };
}
