
import UseSweetHook from '../../hooks/use-sweet-hook'
import { SWEET_HOOK_LEVEL } from '../../utils/enum'
import orderAction from 'actions/order/order-actions'
const initialState = {
  listOrder: []
}

const orderStore = UseSweetHook(initialState, orderAction, 'order', [SWEET_HOOK_LEVEL.HOOK])

export default orderStore
