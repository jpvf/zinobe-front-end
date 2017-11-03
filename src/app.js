// Call css for view
const css = require('./app.scss');

// React components
import React from 'react';
import ReactDOM from 'react-dom';

// Dev components
import userService from './js/userService';
import UserData from './js/userDataComponent';
import {editData, deleteData, saveData, addData} from './js/userActions';

let dataUserContainer = document.querySelector('.js-data-container');
let getUserData = userService({
  method: 'GET',
  action: '/users'
});

class UserList extends React.Component {
  componentDidMount() {
    let deleteBtn = dataUserContainer.querySelectorAll('.js-delete-btn');
    let editBtn = dataUserContainer.querySelectorAll('.js-edit-btn');
    let saveBtn = dataUserContainer.querySelectorAll('.js-save-btn');
    let addDataContainer = document.querySelector('.js-add-data-container');
    let addBtn = addDataContainer.querySelector('.js-add-btn');

    for(var i=0; i<deleteBtn.length; i++) {
      editBtn[i].addEventListener('click', editData);
      deleteBtn[i].addEventListener('click', deleteData);
      saveBtn[i].addEventListener('click', saveData);
    }

    addBtn.addEventListener('click', addData);
  }

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

export default UserList;
