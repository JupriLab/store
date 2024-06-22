export interface IStoreConfigs<
  TInitialState extends object,
  TActions extends Record<string, TAction<TInitialState, any>>,
> {
  actions: TActions;
  initialState: TInitialState;
  middlewares?: TMiddleware[];
  name: string;
}

export type TAction<TInitialState, TPayload = void> = (
  state: TInitialState,
  payload: TPayload,
) => TInitialState;

export type TSubscriber<TInitialState> = (state: TInitialState) => void;

export type TMiddleware = (state: any, next: any, action: any) => void;
