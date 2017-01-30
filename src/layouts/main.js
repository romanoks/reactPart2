import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ReduxToastr from "react-redux-toastr";
import ReactTooltip from "react-tooltip";
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default props =>
  <MuiThemeProvider>
    <div>
      <ReduxToastr
        timeOut={4000}
        position='bottom-center'
      />
    	{props.children}
    </div>
  </MuiThemeProvider>;
