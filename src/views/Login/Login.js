import React, { useCallback, useState } from 'react'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from 'components/CustomInput/CustomInput';
import { makeStyles } from '@material-ui/core';
import Button from 'components/CustomButtons/Button'
import logo from "assets/img/reactlogo.png";
import bgImage from "assets/img/sidebar-2.jpg";
import { useHistory} from "react-router-dom"

const styles = {
    formContainer: {
        height: innerHeight,
    },
    positionForm: {
        marginTop: innerHeight/4,
        backgroundColor: "#fff",
        padding: 20
    },
    center: {
      display: "flex",
      alignItem: "center" ,
      justifyContent: "center",
    },
    background: {
      backgroundSize: "cover",
      backgroundPosition: "center center",
    }
  };

  const useStyles = makeStyles(styles);
const Login = () => {
    const classes = useStyles()
    const history = useHistory()
    const [data, setData] = useState({userName: "", password: ""})
    const onChangeInput = useCallback((e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      }, [data])

    const onPressLogin = () => {
      console.log('data', data);
      history.push("/admin")
    }

    return(
        <GridContainer center className={[classes.background, classes.center]} style={{ backgroundImage: "url(" + bgImage + ")",  }}>
            <div className={classes.formContainer}>
            <div className={classes.positionForm}>
            <div className={classes.center}>
            <img src={logo} alt="logo" className={classes.img} />
            </div>
            <GridItem xs={12} sm={12} md={12} >
                <CustomInput
                    labelText="Tên đăng nhập"
                    id="userName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data.userName,
                      name: 'userName',
                    }}
                    onChange={onChangeInput}
                  />

                <CustomInput
                    labelText="Mật khẩu"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                      value: data.password,
                      name: 'password',
                      type: 'password'
                    }}
                    onChange={onChangeInput}
                  />

                <div className={classes.center}>
                <Button color="primary" onClick={onPressLogin}>Đăng nhập</Button>
                </div>
            </GridItem>
            </div>
            </div>
        </GridContainer>
    )
}

export default Login