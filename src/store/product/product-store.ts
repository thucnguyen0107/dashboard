
import UseSweetHook from '../../hooks/use-sweet-hook'
import productAction from '../../actions/product/product-actions'
import { SWEET_HOOK_LEVEL } from '../../utils/enum'
const initialState = {
  listProduct: []
}

const productStore = UseSweetHook(initialState, productAction, 'product', [SWEET_HOOK_LEVEL.HOOK])

export default productStore
