
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomModal from "components/Modal/CustomModal";
import { Typography } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js"
import orderStore from "store/order/order-store";
import {useHistory} from "react-router-dom"

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardHeaderWapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const useStyles = makeStyles(styles);

export default function ListOrder() {
  const classes = useStyles();
  const history = useHistory()
  const [state,actions] = orderStore.useHook()
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [listOrder, setListOrder] = useState([])
  const [listData, setListData] = useState([])

//   const delete_ic = <span className="material-icons">delete_forever</span>
//   const edit_ic = <span className="material-icons">edit</span>

const deleteItem = (id) => {
  setIsShowModalDelete(true)
  setSelectedItem(id)
}

const confirmDelete = async() => {
 // let newArr = listProduct.filter(i => i.id !== selectedItem)
 const result = await actions.deleteOrderById(selectedItem)
 setListOrder(result)
 setIsShowModalDelete(false)
}

const editItem = (id) => {
  // e.stopPropagation()
  //  <Redirect
  //  from="/admin/list-product"
  //  to={{
  //    pathname: "/admin/edit-product",
  //    state: {productId: id}
  //   }}/>
  console.log('id item edit', id);
    history.push(`/admin/edit-order/${id}`)
 }

 const convertData = () => {

  let newData = listOrder.map((i)=>{
    // let sum = 0
    // i.colors.map(c=> {
    //   c.sizes.map(s=> {
    //     sum = sum + s.stock
    //   })
    // })
  return [i.id, i.customerName, i.phoneNumber, i.status, i.quantity, i.price, i.note]})
  setListData(newData)
}

 const getListOrder = async() => {
  const result = await actions.getListOrderRequest()
  setListOrder(result)
}

 useEffect(()=> {
  if(state.listOrder.length === 0){
    return getListOrder()
  }
  setListOrder(state.listOrder)
},[])

useEffect(()=>{
  convertData()
},[listOrder])


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.cardHeaderWapper}>
            <h4 className={classes.cardTitleWhite}>Danh sách đơn hàng</h4>
            {/* <div>Thêm sản phẩm</div> */}
            </div>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Mã đơn hàng", "Tên khách hàng", "Số điện thoại", "Trạng thái", "Số lượng", "Giá","Ghi chú", "Chức năng"]}
              tableData={listData}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          </CardBody>
        </Card>
      </GridItem>
      <CustomModal
        open={isShowModalDelete}
        handleClose={()=>setIsShowModalDelete(false)}
      >
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông báo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Bạn có chắc muốn xóa đơn hàng này?
          </Typography>
          <div>
          <Button color="danger" onClick={confirmDelete}>Xác nhận</Button>
          <Button color="primary" onClick={()=>setIsShowModalDelete(false)}>Hủy bỏ</Button>
          </div>
        </div>
      </CustomModal>
    </GridContainer>
  );
}
