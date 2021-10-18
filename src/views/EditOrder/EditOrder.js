/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// import avatar from "assets/img/faces/marc.jpg";
import {useParams} from 'react-router-dom'
// import Icon from '@material-ui/core/Icon';


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "24px"
  },
  imageProduct: {
    width: "100%",
    // height: 300,
  },
  center: {
      alignItem: "center",
      justifyContent: "center"
  }

};

const useStyles = makeStyles(styles);

const dataDefault = {
    id: "A01490",
    customerName: "Nguyễn Văn A",
    phoneNumber: "0932109123",
    status: "Đang vận chuyển",
    quantity: 5,
    price: "125,000 VNĐ",
    note: "Không có"
}

const createData = {
  id: "",
  customerName: "",
  phoneNumber: "",
  status: "",
  quantity: null,
  price: "",
  note: ""
}

export default function EditOrder() {
  const classes = useStyles();
  const {id} = useParams()
  const [data, setData] = useState()

  const onChangeInput = useCallback((e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }, [data])

  const onPressSave = () => {
    console.log('data save', data);
  }

  useEffect(() => {
    console.log('id', id);
    if(id){
     return setData(dataDefault)
    }
    setData(createData)
  }, [])

  return (
    <div>
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
            <div className={classes.imageProduct}>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
              <div>
                <Button color="primary" round >
                  Tải ảnh lên
                </Button>
              </div>
            </div>
          </Card>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{id ? 'Chỉnh sửa đợn hàng' : 'Tạo mới đơn hàng'}</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Mã đơn hàng"
                    id="order-id"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.id,
                      name: 'id',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Tên khách hàng"
                    id="customerName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.customerName,
                      name: 'customerName',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Số điện thoại"
                    id="phoneNumber"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.phoneNumber,
                      name: 'phoneNumber',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Trạng thái"
                    id="status"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.status,
                      name: 'status',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Số lượng"
                    id="quantity"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.quantity,
                      name: 'quantity',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Giá (VNĐ)"
                    id="price"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.price,
                      name: 'price',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Ghi chú"
                    id="note"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.note,
                      name: 'note',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter className={classes.center}>
              <Button color="primary" onClick={onPressSave}>Lưu lại</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
