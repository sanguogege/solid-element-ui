import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

import { ToastProvider } from "solid-element-ui";

import Nav from "~/layout/nav";
import Aside from "~/layout/aside";

// TODO 组件库文档
//  - 组件属性表格
//  - 组件事件表格

export default function App() {
  return (
      <Router
          root={(props) => (
              <>
                  <Nav />
                  <main class="flex">
                      <Aside />
                      <div class="prose prose-slate max-w-none dark:prose-invert p-8 w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                          <ToastProvider>
                              <Suspense>{props.children}</Suspense>
                          </ToastProvider>
                      </div>
                  </main>
              </>
          )}
      >
          <FileRoutes />
      </Router>
  );
}
