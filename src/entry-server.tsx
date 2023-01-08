import { StrictMode } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { RootStoreProvider } from "./store/rootStoreProvider";
import { Router } from "./Router";
import { enableStaticRendering } from "mobx-react";
import { RootStore } from "./store/rootStore";

export function getStore(): RootStore {
  return new RootStore()
}

export async function prefetch(
  url: string,
  store: RootStore
): Promise<void> {
  const path = url === "/" ? "/home" : url;
  const { prefetch } = await import(`@/pages${path}.tsx`);
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
