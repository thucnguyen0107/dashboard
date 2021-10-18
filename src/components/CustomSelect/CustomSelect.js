import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: 25
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const { label, value, listData, handleChange,formControlProps, id } = props;
  const classes = useStyles();

  return (
    <div>
      <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value}
          onChange={handleChange}
        >
          {listData.map((i,index) => (
            <MenuItem value={i?.value} key={index}>{i?.label}</MenuItem>
          ))}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}

SimpleSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  listData: PropTypes.array,
  handleChange: PropTypes.func,
  containerStyles: PropTypes.object,
  formControlProps: PropTypes.object,
  id: PropTypes.string,
};
