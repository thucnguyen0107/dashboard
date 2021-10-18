
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import productStore from "store/product/product-store";
import {Link, useHistory} from 'react-router-dom'
import {primaryColor} from 'assets/jss/material-dashboard-react.js'
import CustomModal from "components/Modal/CustomModal.js"
import Button from "components/CustomButtons/Button.js"
import { Typography } from "@material-ui/core";


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
  addProduct:{
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#fff",
    color: primaryColor[1]
  },
};

const useStyles = makeStyles(styles);

export default function ListProduct() {
  const [state,actions] = productStore.useHook()
  const classes = useStyles();
  const [listProduct, setListProduct] = useState([])
  const [listData, setListData] = useState([])
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const history = useHistory()


 const deleteItem = (id) => {
   setIsShowModalDelete(true)
   setSelectedItem(id)
 }

 const confirmDelete = async() => {
  // let newArr = listProduct.filter(i => i.id !== selectedItem)
  const result = await actions.deleteProductById(selectedItem)
  setListProduct(result)
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
    history.push(`/admin/edit-product/${id}`)
 }



 const getListProduct = async() => {
   const result = await actions.getListProductRequest()
   setListProduct(result)
 }
 const convertData = () => {

  let newData = listProduct.map((i)=>{
    let sum = 0
    i.colors.map(c=> {
      c.sizes.map(s=> {
        sum = sum + s.stock
      })
    })
  return [i.id, i.name, i.categories, i.description, sum, i.price, i.discount ? i.discount : 0]})
  setListData(newData)
}

 useEffect(()=> {
   if(state.listProduct.length === 0){
     return getListProduct()
   }
   setListProduct(state.listProduct)
 },[])

 useEffect(()=>{
  convertData()
 },[listProduct])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.cardHeaderWapper}>
            <h4 className={classes.cardTitleWhite}>Danh sách sản phẩm</h4>
   <Link to={"/admin/edit-product"} className={classes.addProduct}>
    <div>Thêm sản phẩm</div>
   </Link>

            {/* <div>Thêm sản phẩm</div> */}
            </div>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID","Tên sản phẩm", "Phân loại", "Mô tả", "Số lượng","Giá", "Giảm giá(%)", "Chức năng"]}
              // tableData={[
              //   ["Áo thun 12", "Áo Thun", "Mô tả ABC", "125,000 VNĐ", "24"],
              //   ["Áo thun 12", "Áo Thun", "Mô tả ABC", "125,000 VNĐ", "15"],
              //   ["Áo thun 12", "Áo Thun", "Mô tả ABC", "125,000 VNĐ", "27"],
              //   ["Quần jeans", "Quần", "Mô tả ABC", "125,000 VNĐ", "7"],
              //   ["Chân váy", "Chân váy", "Mô tả ABC", "125,000 VNĐ", "17"],
              //   ["Áo thun 12", "Áo thun", "Mô tả ABC", "125,000 VNĐ", "0"],
              // ]}
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
          Bạn có chắc muốn xóa sản phẩm này?
          </Typography>
          <div>
          <Button color="danger" onClick={confirmDelete}>Xác nhận</Button>
          <Button color="primary" onClick={()=>setIsShowModalDelete(false)}>Hủy bỏ</Button>
          </div>
        </div>
      </CustomModal>
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park",
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten",
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
    </GridContainer>
  );
}
