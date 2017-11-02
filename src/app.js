// Styles for view
const css = require('./app.scss');

// React components
import React from 'react';
import ReactDOM from 'react-dom';

// Dev components
import userService from './js/userService';
import UserData from './js/userDataComponent';

let dataUserContainer = document.querySelector('.js-data-container');
let getUserData = userService({
  method: 'GET',
  action: '/users'
});

class UserList extends React.Component {
  render() {
    let {list} = this.props;
    return(
      list.map(item => {
        return (
          <UserData
            key={item.id}
            id={item.id}
            name={item.name}
            username={item.username}
            email={item.email} />
        )
      })
    )
  }
}

getUserData.then((data) => {
  let dataJson = JSON.parse(data);

  ReactDOM.render(
    <UserList list={dataJson}/>,
    dataUserContainer
  );
});
