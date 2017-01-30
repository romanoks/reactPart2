import React from 'react';
import { pink300 } from 'material-ui/styles/colors';

const errorStyle = {
  backgroundColor: pink300,
  padding: 10,
};
export default (props) => {
  if (props.errors && props.errors.formError) {
    const style = {...errorStyle, width: props.width}
    return (<div style={style}>
        {props.errors.formError}
      </div>
    );
  }
  return false;
};