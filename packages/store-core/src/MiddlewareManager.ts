import type { TAction, TMiddleware } from "./types";

export default class MiddlewareManager {
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

    if (middlewareArray.length === 0) return true;

    const middlewareResults = middlewareArray.map((middleware) => {
      const next = () => true;
      const result = middleware(params, next);
      return typeof result === "undefined" ? false : true;
    });

    return middlewareResults.every((x) => x);
  }
}
