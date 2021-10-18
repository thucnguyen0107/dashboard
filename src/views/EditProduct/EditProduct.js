/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useRef, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomSelect/CustomSelect.js"
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import imgDefault from "assets/img/no-image.png";
// import productImg from "assets/img/sidebar-2.jpg"
import { primaryColor } from "assets/jss/material-dashboard-react";
import { deepClone } from "utils/common";
import {useParams, useLocation} from "react-router-dom"
import productStore from "store/product/product-store";
import CustomModal from "components/Modal/CustomModal";
import { Typography } from "@material-ui/core";
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
    paddingTop: 20,
    paddingBottom: 20,
    // height: 300,
  },
  mg_top_30: {
    marginTop: "30px"
  },
  addOption: {
    fontSize: "18px",
    color: primaryColor[0],
  },
  addSizeOption: {
    display: 'flex',
    width: "50%",
    justifyContent: 'center',
    marginTop: "30px"
  },
  productImage:{
    width: 400,
    height: 400,
  },
  smallImage: {
    width: 50,
    height: 60,
    margin: 10,
    cursor: "pointer",
  }
};

const useStyles = makeStyles(styles);

// const dataDefault = {
//   name: "Áo thun",
//   images: productImg,
//   price: "150",
//   discount: 20,
//   colors: [{
//     color: "red",
//     sizes: [{
//       size: "M",
//       stock: 40
//     },
//     {
//       size: "L",
//       stock: 20
//     }
//     ]
//   },
//   {
//     color: "blue",
//     sizes: [{
//       size: "L",
//       stock: 10
//     }]
//   }
//   ],
//   description: "Áo thun kiểu mới",
//   categories: ["Áo", "Áo thun"]
// }

const createData = {
  name: "",
  images: "",
  price: "",
  discount: null,
  colors: [{
    color: "",
    sizes: [{
      size: "",
      stock: null
    },
    ]
  },
  ],
  description: "",
  categories: []
}

const listSizeDefault = [
  {
    value: 'S',
    label: 'S'
  },
  {
    value: 'M',
    label: 'M'
  },
  {
    value: 'L',
    label: 'L'
  },
]

export default function EditProduct() {
  const classes = useStyles();
  const {id} = useParams()
  const location = useLocation()
  const [colorField, setColorField] = useState([])
  const [data, setData] = useState()
  const [productImage, setProductImage] = useState(imgDefault)
  const [,actions] = productStore.useHook()
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false)
  const [messageModal, setMessageModal] = useState('')
  const [listImage, setListImage] = useState([])

  const inputFile = useRef()
  console.log('location',location.pathname);


  const onChangeInput = useCallback((e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }, [data])

  // console.log('productImage', productImage);

  const onChangeInputImage = (e) => {
    var listImage = []
    let files = [...e.target.files]
    files.map(i=>{
      var reader = new FileReader();
      reader.readAsDataURL(i);

    reader.onloadend = () =>{
      listImage.push(reader.result)
      // setProductImage(reader.result)
      setListImage(listImage)
    }
    })
    // console.log('1111111', listImage);



    // var file = e.target.files[0];
    // var reader = new FileReader();
    // var url = reader.readAsDataURL(file);

    // reader.onloadend = () =>{
    //   setProductImage(reader.result)
    // }
    // console.log('2222', url, reader.result);
  }

  const onPressUploadImage = () => {
    inputFile.current.click()
  }
  const onChangeColorInfoInput = (e, positionInSizes, positionInColors, type)=>{
    let cloneProduct = deepClone(data)
    if(type === 'color'){
      cloneProduct.colors[positionInColors].color = e.target.value
    } else{
      cloneProduct.colors[positionInColors].sizes[positionInSizes].stock = parseInt(e.target.value)
    }
    setData(cloneProduct)
  }

  const onChangeSelect = (e, positionInSizes, positionInColors) => {
    //positionInColors vị trí của nó ở trong mảng colors
    //positionInSizes vị trí của nó ở trong mảng sizes
    let cloneProduct = deepClone(data)
    let newSize = {
      ...cloneProduct.colors[positionInColors].sizes[positionInSizes],
      size: e.target.value,
    }
    cloneProduct.colors[positionInColors].sizes[positionInSizes] = newSize
    setData(cloneProduct)
  }

  const onPressAddSize = (positionInColors) => {
    let cloneProduct = deepClone(data)
    let newSize = {
      size: '',
      stock: null
    }
    cloneProduct.colors[positionInColors].sizes.push(newSize)
    setData(cloneProduct)
  }

  const onPressDeleteSize = (positionInSizes, positionInColors) => {
    let cloneProduct = deepClone(data)
    cloneProduct.colors[positionInColors].sizes.splice(positionInSizes,1)
    setData(cloneProduct)
  }

  const addColor = () => {
    let cloneProduct = deepClone(data)
    let newColor = {
      color: '',
      sizes: [{
        size: '',
        stock: null
      }]
    }
    cloneProduct.colors.push(newColor)
    setData(cloneProduct)
  }

  const deleteColor = () => {
    let cloneProduct = deepClone(data)
    cloneProduct.colors.pop()
    setData(cloneProduct)
  }

  const onPressSave = async() => {
    let newData = {...data, id: Math.floor(Math.random()*100)}
    const result = await actions.createNewProduct(newData)
    if(result){
      setMessageModal('Thêm mới sản phẩm thành công!')
      setIsShowModalSuccess(true)
    } else{
      setMessageModal('Có lỗi xảy ra, Xin vui lòng thử lại!')
      setIsShowModalSuccess(true)
    }
  }

  const getProductById = async() => {
    console.log('id', id);
    const result = await actions.getProductById(id)
    console.log('result', result);
    setData(result)
    setProductImage(result.images)
  }

  useEffect(() => {
    if(id && location.pathname.indexOf("/edit-product/:id") === -1){
    //  return (
    //    setData(dataDefault),
    //    setProductImage(dataDefault.images)
    //    )
      return getProductById()
    }
    setData(createData)
  }, [])

  useEffect(() => {
    console.log('listImage', listImage.length );
    listImage.map(i=>{console.log('3333', i);})
    if(listImage.length >0)
      setProductImage(listImage[0])
  },[listImage])

  const renderSizes = (arrSize = [], positionInColors) => {
    let newUI = arrSize.map((i, index) => {
      return (
        <GridItem container md={12}>
          <GridItem xs={12} sm={12} md={3}>
            <CustomSelect
              label="Size"
              listData={listSizeDefault}
              id={"size" + index}
              value={i?.size}
              handleChange={(e) => onChangeSelect(e, index, positionInColors)}
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              labelText="Số lượng"
              id="quantity"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: false,
                value: i?.stock,
                name: 'quantity',
              }}
              onChange={(e)=>onChangeColorInfoInput(e, index, positionInColors)}
            />
          </GridItem>

              <div style={{ alignItem: 'center', justifyContent: 'center', marginTop: 30}}>
                <Button color="rose" round size="sm" onClick={()=>onPressDeleteSize(index, positionInColors)}>
                  Xóa
                </Button>
              </div>

        </GridItem>
      )
    })
    return newUI
  }

  const renderColor = (colors) => {
    let newData = colors.map((i, index) => {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Màu sắc"
                id="color"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  disabled: false,
                  value: i.color,
                  name: 'color',
                }}
                onChange={(e)=>onChangeColorInfoInput(e, '',index, 'color' )}
              />
            </GridItem>
            <div className={classes.addSizeOption}>
              <div>
                <Button color="primary" round onClick={()=>onPressAddSize(index)}>
                  Thêm Size
                </Button>
              </div>
            </div>
          </GridContainer>

          {renderSizes(i?.sizes, index)}
        </div>
      )
    })
    return setColorField(newData)
  }

  const renderListImage = () => {
    // if(listImage < 1){
    //   return null
    // }
    return listImage.map((i)=>{
      return (<img src={i} alt="..." className={classes.smallImage} onClick={()=>setProductImage(i)}/>)
    })
  }

  useEffect(() => {
    renderColor(data?.colors || [])
  }, [data])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            {/* <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar> */}
            {/* <CardBody>
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
            </CardBody> */}
            <div className={classes.imageProduct}>
              <div>
                <img src={productImage} alt="..." className={classes.productImage}/>
              </div>
              <div>
              {renderListImage()}
              </div>
              <div>
                  <input
                  type="file"
                  name="image"
                  hidden
                  ref={inputFile}
                  multiple
                  onChange={(e)=> onChangeInputImage(e)}
                  />
                <Button color="primary" round onClick={onPressUploadImage}>
                  Tải ảnh lên
                </Button>
              </div>
            </div>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{id ? 'Chỉnh sửa sản phẩm' : 'Tạo mới sản phẩm'}</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Tên sản phẩm"
                    id="product-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.name,
                      name: 'name',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phân loại"
                    id="category"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.categories,
                      name: 'categories',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Giảm giá(%)"
                    id="discount"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data?.discount,
                      name: 'discount',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
              </GridContainer>
              {colorField}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                <a href="#pablo" className={classes.addOption} onClick={addColor}>Thêm màu sắc</a>
                {colorField.length > 1 &&
                  <a href="#pablo" className={classes.addOption} onClick={deleteColor}>Xóa màu sắc</a>}
              </div>
              <GridContainer className={classes.mg_top_30}>
                <GridItem xs={12} sm={12} md={12}>
                  {/* <InputLabel style={{ color: "#AAAAAA" }}>Mô tả</InputLabel> */}
                  <CustomInput
                    labelText="Mô tả"
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      disabled: false,
                      value: data?.description,
                      name: 'description',
                    }}
                    onChange={onChangeInput}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={onPressSave}>Lưu lại</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <CustomModal
        open={isShowModalSuccess}
        handleClose={()=>setIsShowModalSuccess(false)}
      >
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông báo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {messageModal}
          </Typography>
          <div>
          <Button color="info" onClick={()=>setIsShowModalSuccess(false)}>Xác nhận</Button>
          </div>
        </div>
      </CustomModal>
      </GridContainer>
    </div>
  );
}
