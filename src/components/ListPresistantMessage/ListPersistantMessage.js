import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Divider, Subheader,Card, FlatButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import SearchInput, {createFilter} from 'react-search-input';

import Loading from 'components/Loading/Loading';
import * as messageActions from 'actions/messageActions';

const leftIconMenu = (
    <svg style="width:32px;height:32px" viewBox="0 0 24 24">
      <path fill="#000000" d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
    </svg>
);

const KEYS_TO_FILTERS = ['language', 'platform', 'message']

class ListPersistantMessage extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      searchTerm: '',
      open: false
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }



  componentWillMount() {
    this.props.actions.getAll('', '');
  }
  componentDidMount(){
  }

  searchUpdated(message) {
    this.setState({
      searchTerm: message
    });
  }

  render() {
    const isShow = false;

    const filtredMessage = this.props.messages.message.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

    if(!this.props.messages.message.length === 0){
      return <Loading />
    }
    // this.props.messages.message
    const listItems = filtredMessage.map((message, index) => {
      return (
        < div key={index}>
          {isShowSubheader(message.lastModified, isShow)}
          <ListItem
            leftIcon={
              leftIconMenu
            }
            rightIcon={
              <svg style="width:32px;height:32px" viewBox="0 0 24 24" onClick={(e) => this.props.actions.deleteMessage(message.language,message.platform)}>
                <path fill="#000000" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            }
            leftIcon={
              <svg style="width:24px;height:24px" viewBox="0 0 24 24" onClick={(e) => {
                localStorage.setItem('messageEd', JSON.stringify(message));
                browserHistory.push('persistantmessage');
              }} >
                <path fill="#000000" d="M20.71,7.04C20.37,7.38 20.04,7.71 20.03,8.04C20,8.36 20.34,8.69 20.66,9C21.14,9.5 21.61,9.95 21.59,10.44C21.57,10.93 21.06,11.44 20.55,11.94L16.42,16.08L15,14.66L19.25,10.42L18.29,9.46L16.87,10.87L13.12,7.12L16.96,3.29C17.35,2.9 18,2.9 18.37,3.29L20.71,5.63C21.1,6 21.1,6.65 20.71,7.04M3,17.25L12.56,7.68L16.31,11.43L6.75,21H3V17.25Z" />
              </svg>
            }
            primaryText={
              <p>{message.message}</p>
            }
            secondaryText={
              <p>
                language: {message.language} platform: {message.platform}
                <span style={{ float: 'right' }}>
                  {transform(message.lastModified)}
                </span>
              </p>
            }
            secondaryTextLines={2}
            />
          <Divider inset={true} />
        </div >
      )
    });
    return (
        <div>
          <Card  style={{padding: '1em'}}>
            <List>
            <div style={{display:'flex'}}>
              <SearchInput className='group'  onChange={this.searchUpdated} />
              <FlatButton label="New message" primary onClick={()=>{
                localStorage.setItem('messageEd', JSON.stringify({language:'',platform:'',message:''}));
                browserHistory.push('persistantmessage');
              }}
              style={{marginLeft:'45%'}}/>
            </div>
              {listItems}
            </List>
          </Card>
        </div>
    );
  }
}

const transform = (message) => {
  return message === undefined ? '' : new Date(message).toLocaleString();
}

const lastdate = {value:0};
const isShowSubheader = (date, isShow) => {
  let inTo = new Date(date).toDateString();
  if (inTo === new Date(Date.now()).toDateString() && !isShow) {
    return <Subheader>Today</Subheader>
  } else if (inTo != lastdate.value && !isShow) {
    lastdate.value = inTo;
    return <Subheader>{inTo}</Subheader>
  }
}

function mapStateToProps(state) {
  return {
    messages: state.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messageActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPersistantMessage);
