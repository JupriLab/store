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
) => Promise<TInitialState> | TInitialState;

export type TSubscriber<TInitialState> = (state: TInitialState) => void;

export type TNextFunction = () => boolean;

export type TMiddleware = (
  params: {
    action: TAction<any>;
    actionName: string;
    payload: any;
    state: any;
  },
  next: TNextFunction,
) => ReturnType<TNextFunction> | undefined;
