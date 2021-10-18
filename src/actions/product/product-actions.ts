
// import Axios from "axios"
// import { BASE_URL } from "../../utils/constant"
import productImg from "assets/img/sidebar-2.jpg"

type ActionMethod = {
  setState: Function,
  getState: Function
}

const dataDefault = [
  {
  id: 11,
  name: "Áo thun",
  images: productImg,
  price: "150",
  discount: 20,
  colors: [{
    color: "red",
    sizes: [{
      size: "M",
      stock: 40
    }]
  },
  {
    color: "blue",
    sizes: [{
      size: "L",
      stock: 10
    }]
  }
],
  description: "Áo thun kiểu mới",
  categories: ["Áo"]
},
{
  id: 22,
  name: "Áo thun 11",
  images: productImg,
  price: "250",
  discount: 10,
  colors: [{
    color: "blue",
    sizes: [{
      size: "L",
      stock: 20
    }]
  }],
  description: "Áo thun kiểu mới loại 1",
  categories: ["Áo thun"]
},
]

const productAction = {
  getListProductRequest: () => async ({setState}: ActionMethod) => {
    try {
      // const response: any = await Axios.get(`https://48720380ab68.ngrok.io/v1/products`)
      // setState({
      //   listProduct: response.data.docs
      // })
      // console.log('res', response);

      // return response.data.docs
      setState({
        listProduct: dataDefault,
      })
      return dataDefault
    // eslint-disable-next-line no-unreachable
    } catch (err) {
      // alert("Email or phone number is exist or invalid. Please try again!")
      return false
    }
  },

  deleteProductById: (id: string) => async({setState, getState}: ActionMethod) => {
    try {
      let listProductClone = getState().listProduct
      let newList = listProductClone.filter((i:any)=> i?.id !== id)
      setState({
        listProduct: newList
      })
      return newList
    } catch (err) {
      return false
    }
  },

  createNewProduct: (item: Object) => async({setState, getState}: ActionMethod) => {
    try {
      let listProductClone = getState().listProduct
      let newList = listProductClone.concat(item)
      setState({
        listProduct: newList
      })
      return newList
    } catch (err) {
      return false
    }
  },

  getProductById: (id: string) => async({getState}: ActionMethod) => {
    try {
      let listProductClone = getState().listProduct
      let newList = listProductClone.filter((i:any)=> i?.id == parseInt(id))
      // setState({
      //   listProduct: newList
      // })
      return newList[0]
    } catch (err) {
      return false
    }
  },
}

export default productAction
