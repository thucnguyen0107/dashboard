
// import Axios from "axios"
// import { BASE_URL } from "../../utils/constant"

type ActionMethod = {
    setState: Function,
    getState: Function
  }

  const dataDefault = [
    {
        id: "A01490",
        customerName: "Nguyễn Văn A",
        phoneNumber: "0932109123",
        status: "Đang vận chuyển",
        quantity: 5,
        price: "125,000 VNĐ",
        note: "Không có"
    },
    {
        id: "A01491",
        customerName: "Nguyễn Thi B",
        phoneNumber: "0932109100",
        status: "Đã giao",
        quantity: 20,
        price: "100,000 VNĐ",
        note: "Không có"
    }
  ]

  const orderAction = {
    getListOrderRequest: () => async ({setState}: ActionMethod) => {
      try {
        // const response: any = await Axios.get(`https://48720380ab68.ngrok.io/v1/products`)
        // setState({
        //   listProduct: response.data.docs
        // })
        // console.log('res', response);

        // return response.data.docs
        setState({
            listOrder: dataDefault,
        })
        return dataDefault
      // eslint-disable-next-line no-unreachable
      } catch (err) {
        // alert("Email or phone number is exist or invalid. Please try again!")
        return false
      }
    },

    deleteOrderById: (id: string) => async({setState, getState}: ActionMethod) => {
      try {
        let listOrderClone = getState().listOrder
        let newList = listOrderClone.filter((i:any)=> i?.id !== id)
        setState({
            listOrder: newList
        })
        return newList
      } catch (err) {
        return false
      }
    },

    createNewOrder: (item: Object) => async({setState, getState}: ActionMethod) => {
      try {
        let listOrderClone = getState().listProduct
        let newList = listOrderClone.concat(item)
        setState({
            listOrder: newList
        })
        return newList
      } catch (err) {
        return false
      }
    },
  }

  export default orderAction
