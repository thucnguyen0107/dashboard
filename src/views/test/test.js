
import { makeStyles } from "@material-ui/core";
// import { StylesProvider } from "@material-ui/styles";
import React from "react";

const styles = {
    fullColor: {
        width: '30px',
        height: '20px',
        backgroundColor: 'yellow',
        marginRight: '5px'
    },
    persentageColor: {
        width: '30px',
        height: '20px',
        // backgroundImage: linear-gradient(to right, gold 80% , silver 20%)
    },
    wapper: {
        display: 'flex',
    }
  };

  const useStyles = makeStyles(styles);
const test = () => {
    const classes = useStyles();
    const persentageVoucher = (userPoint, voucherPoint ) => {
        let persentage = userPoint/voucherPoint
        let quotient = Math.floor(persentage/0.2)
        let remainder = persentage/0.2 - quotient
        console.log(remainder,quotient);
        let renderUI = []
        for(let i=1; i<quotient; i++){
            console.log(quotient);
            renderUI.push(<div className={classes.fullColor} key={i}></div>)
        }
        if(remainder > 0){
            renderUI.push(<div className={classes.persentageColor} key={quotient}></div>)
        }

        return renderUI
    }
  return (<div className={classes.wapper}>
      {persentageVoucher(75,90)}
  </div>)
};

export default test;
