import MiddlewareManager from "../src/MiddlewareManager";
import type { TMiddleware } from "../src/types";

describe("MiddlewareManager", () => {
  it("apply should return true when no middleware is present", () => {
    const manager = new MiddlewareManager([]);

    const result = manager.apply({
      action: () => undefined,
      actionName: "",
      payload: {},
      state: {},
    });

    expect(result).toBe(true);
  });

  it("apply should return true when middleware returns true", () => {
    const middleware: TMiddleware = (_params, next) => next();
    const manager = new MiddlewareManager([middleware]);

    const result = manager.apply({
      action: () => undefined,
      actionName: "",
      payload: {},
      state: {},
    });

    expect(result).toBe(true);
  });

  it("apply should return false when middleware returns false", () => {
    const middleware: TMiddleware = (_params, _next) => undefined;
    const manager = new MiddlewareManager([middleware]);

    const result = manager.apply({
      action: () => undefined,
      actionName: "",
      payload: {},
      state: {},
    });

    expect(result).toBe(false);
  });

  it("apply should return true when all middlewares return true", () => {
    const middleware: TMiddleware = (_params, next) => next();
    const middleware2: TMiddleware = (_params, next) => next();
    const manager = new MiddlewareManager([middleware, middleware2]);

    const result = manager.apply({
      action: () => undefined,
      actionName: "",
      payload: {},
      state: {},
    });

    expect(result).toBe(true);
  });

  it("apply should return false when at least one middleware returns false", () => {
    const middleware: TMiddleware = (_params, next) => next();
    const middleware2: TMiddleware = (_params, _next) => false;
    const middleware3: TMiddleware = (_params, next) => next();
    const manager = new MiddlewareManager([
      middleware,
      middleware2,
      middleware3,
    ]);

    const result = manager.apply({
      action: () => undefined,
      actionName: "",
      payload: {},
      state: {},
    });

    expect(result).toBe(false);
  });

  it("apply should return false when middleware returns undefined", () => {
    const middleware: TMiddleware = (_params, _next) => undefined;

    const manager = new MiddlewareManager([middleware]);

    const result = manager.apply({
      action: () => undefined,
      actionName: "",
      payload: {},
      state: {},
    });

    expect(result).toBe(false);
  });

  it("apply should return false when the last middleware doesn't return true", () => {
    const middleware: TMiddleware = (_params, next) => next();
    const middleware2: TMiddleware = (_params, _next) => undefined;

    const manager = new MiddlewareManager([middleware, middleware2]);

    const result = manager.apply({
      action: () => undefined,
      actionName: "",
      payload: {},
      state: {},
    });

    expect(result).toBe(false);
  });
});
