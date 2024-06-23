import type { TAction, TMiddleware } from "./types";

export default class Middleware {
  private middlewareFns: Set<TMiddleware>;

  constructor(middlewares: TMiddleware[]) {
    this.middlewareFns = new Set(middlewares);
  }

  apply(params: {
    action: TAction<any>;
    actionName: string;
    payload: any;
    state: any;
  }) {
    const middlewareArray = Array.from(this.middlewareFns);
    const run = (index: number) => {
      // Exits the middleware if there's no middleware in the array
      if (index >= middlewareArray.length) return;
      const currentMiddleware = middlewareArray[index];
      currentMiddleware(params, () => run(index + 1));
    };
    run(0);
  }
}
