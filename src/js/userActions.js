// React components
import React from 'react';
import ReactDOM from 'react-dom';

// Dev components
import userService from './userService';
import UserList from '../app'

const editData = (event) => {
  let thisNode = event.target;
  let userContainer = thisNode.parentNode.parentNode;
  let labelNode = userContainer.querySelectorAll('label');
  let inputNode = userContainer.querySelectorAll('input');
  let saveBtn = userContainer.querySelector('.js-save-btn');
  if(thisNode.editMode == undefined) {
    thisNode.editMode = false;
  }

  for(let i=0; i<inputNode.length; i++) {
    if(thisNode.editMode == false && inputNode[i].type != 'hidden') {
      labelNode[i].style.display = 'none';
      inputNode[i].style.display = 'inline-block';
      inputNode[i].value = labelNode[i].textContent;
    } else if(inputNode[i].type != 'hidden') {
      labelNode[i].style.display = 'inline-block';
      inputNode[i].style.display = 'none';
    }
  }

  if(thisNode.editMode == false) {
    thisNode.editMode = true;
    saveBtn.style.display = 'inline-block';
    thisNode.innerHTML = 'Cancelar';
  } else {
    thisNode.editMode = false;
    saveBtn.style.display = 'none';
    thisNode.innerHTML = 'Editar';
  }
}

const deleteData = (event) => {
  let thisNode = event.target;
  let userNode = thisNode.parentNode.parentNode;
  let userId = userNode.getAttribute('data-id');
  let deleteUserPromise = userService({
    method: 'DELETE',
    action: '/users/' + userId
  });

  deleteUserPromise.then(() => {
    refreshUserData();
  });
}

const saveData = (event) => {
  let thisNode = event.target;
  let saveDataContainer = thisNode.parentNode.parentNode;
  let userId = saveDataContainer.getAttribute('data-id');
  let method = 'PUT';
  let action = '/users/' + userId;
  let data =  serialize(saveDataContainer);
  let saveUserData;

  if(thisNode.checkValidity()) {
    saveUserData = userService({
      method: method,
      action: action,
      data: data
    });

    saveUserData.then((data) => {
      let dataJson = JSON.parse(data);

      console.log(dataJson);
      refreshUserData();
    });
  }
}

const addData = (event) => {
  event.preventDefault();
  let thisNode = event.target;
  let addDataContainer = thisNode.parentNode.parentNode;
  let method = 'POST';
  let action = '/users/';
  let data =  serialize(addDataContainer);
  let addUserData;

  if(thisNode.checkValidity()) {
    console.log('envía data');
    addUserData = userService({
      method: method,
      action: action,
      data: data
    });

    addUserData.then((data) => {
      let dataJson = JSON.parse(data);

      console.log(dataJson);
      refreshUserData();
    });
  }
}

const refreshUserData = () => {
  let dataUserContainer = document.querySelector('.js-data-container');
  let getUserData = userService({
    method: 'GET',
    action: '/users'
  });

  getUserData.then((data) => {
    let dataJson = JSON.parse(data);

    ReactDOM.render(
      <UserList list={dataJson}/>,
      dataUserContainer
    );
  });
}

// Auxiliar functions
const serialize = (addDataContainer) => {
  let fields = addDataContainer.querySelectorAll('input');
  let data = {};

  for(let i=0; i<fields.length; i++) {
    let name = fields[i].getAttribute('name');
    let value = fields[i].value;
    data[name] = value;
  }

  return data;
}

export {editData, deleteData, saveData, addData};
