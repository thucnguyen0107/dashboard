
import { SWEET_HOOK_LEVEL } from "../utils/enum";
import { DEFAULT_SWEET_HOOK_LEVEL } from "../utils/constant";
import { ISweetHook } from "../interface/sweet-hook-interface";
import {
  createStore,
  createSubscriber,
  createHook,
  createContainer,
} from "react-sweet-state";

export default function UseSweetHook(
  // eslint-disable-next-line no-undef
  initialState: object = {},
  actions = {},
  name: string,
  intialLevel: SWEET_HOOK_LEVEL[] = DEFAULT_SWEET_HOOK_LEVEL
) {
  const store = createStore({
    initialState,
    actions,
    name,
  });

  const levels: ISweetHook = {};
  intialLevel.forEach((item) => {
    switch (item) {
      case SWEET_HOOK_LEVEL.HOOK:
        levels.useHook = createHook(store);
        break;

      case SWEET_HOOK_LEVEL.SUBSCRIBER:
        levels.useSubscriber = createSubscriber(store);
        break;

      case SWEET_HOOK_LEVEL.CONTAINER:
        levels.useContainer = createContainer(store);
        break;

      default:
        break;
    }
  });

  return levels;
}
