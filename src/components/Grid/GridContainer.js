import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
  center: {
    alignItem: "center" ,
    justifyContent: "center",
  }
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, center, ...rest } = props;
  return (
    <Grid
    container
    className={classes.grid, center ? classes.center : {}} {...rest}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
};
