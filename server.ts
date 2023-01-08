import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { instanceToPlain } from "class-transformer";

const isTest = process.env.VITEST;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);
const isProd = process.env.NODE_ENV === "production";

export async function createServer(root = process.cwd(), hmrPort = 3001) {
  const app = express();
  let vite: any; // TODO cast

  if (isProd) {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );
  } else {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });

    app.use(vite.middlewares);
  }

  const { getStore, prefetch, render } = isProd
    ? await import("./dist/server/entry-server.js")
    : await vite.ssrLoadModule("src/entry-server.tsx");

  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  return { app, vite, indexProd, getStore, prefetch, render };
}

createServer().then(({ app, vite, indexProd, getStore, prefetch, render }) => {
  app.use("*", async (req, res) => {
    try {
      const url: string = req.originalUrl;
      const template: string = isProd
        ? indexProd
        : await vite.transformIndexHtml(
            url,
            fs.readFileSync(resolve("index.html"), "utf-8")
          );

      const store = getStore();

      await prefetch(url, store);

      const { appHtml } = render(url, store);

      const html = template.replace(`<!--content-->`, appHtml).replace(
        `<!--__STATE__-->`,
        `window.__STATE=${JSON.stringify(
          instanceToPlain(store, {
            enableCircularCheck: true,
          })
        )}`
      );

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      res.status(500).end(e.stack);
    }
  });

  app.listen(3000);
});
