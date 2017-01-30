import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActions from 'actions/messageActions';
import { TextField, SelectField } from 'redux-form-material-ui';
import { Field, initialize, reduxForm } from 'redux-form';
import TextField2 from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import { RaisedButton, MenuItem } from 'material-ui';
import { Card,CardActions } from 'material-ui/Card';
import style from './style.css';
import {Languages} from './language';

    const MenuItemList = Languages.map((language, index)=>{
    return (
        <MenuItem key={index} value={language.code} primaryText={language.name} />
      );
  });

class MessageFormCU extends Component {

  static formName = 'messageForm';

  static required = value => value == null ? 'Required' : 'underfined';


  constructor(props, context){
    super(props, context);
    const { actions: { createMessage, updateMessage, getAll, deleteMessage} } = this.props;
    const set = JSON.parse(localStorage.getItem('messageEd'));
    set.lastModified = Date.now();
    console.log(set);
    props.dispatch(initialize(MessageFormCU.formName, {...set}))
    this.saveHandler = updateMessage;
  }

  componentDidMount(){
  }

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
        <form>
          <Card>
            <CardActions>
              <div style={{visibility: 'hidden'}}>
                <Field
                  id="lastModified"
                  name="lastModified"
                  component={TextField}
                  />
              </div>
              <div>
                <Field
                  id="language"
                  name="language"
                  component={SelectField}
                  hintText="Language"
                  floatingLabelText="Language"
                  >
                  <MenuItem value="" primaryText="" />
                  {MenuItemList}
                </Field>
              </div>
              <div>
                <Field
                  id="platform"
                  name="platform"
                  component={SelectField}
                  hintText="Platform"
                  floatingLabelText="Platform"
                  >
                  <MenuItem value="" primaryText="" />
                  <MenuItem value="ios" primaryText="iOS" />
                  <MenuItem value="android" primaryText="android" />
                </Field>
              </div>
              <div>
                <Field id= "message"
                    name="message"
                    component={TextField}
                    hintText="Message"
                    floatingLabelText="Message"
                    multiLine={true}
                    rows={4}
                    maxLength={2000}
                   />
              </div>
              <div>
                <RaisedButton label="Save"
                  primary
                  type="submit"
                  onClick={handleSubmit(this.saveHandler)} />
                <RaisedButton label="Cancel"
                  style={{marginLeft: "15px"}}
                  primary={true}
                  onClick={() => browserHistory.push('/')} />
              </div>
              </CardActions>
          </Card>
        </form>
    )
  }
}

const ReduxFormCreate = reduxForm({
  form: MessageFormCU.formName
})(MessageFormCU);

function mapDispatchToProps(dispatch) {
  console.log('dispatch');
  return {
    actions: bindActionCreators(messageActions, dispatch),
  };
}

function mapStateToProps(state){
  return{
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReduxFormCreate);
