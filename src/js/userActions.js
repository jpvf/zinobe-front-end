// React components
import React from 'react';
import ReactDOM from 'react-dom';

// Dev components
import userService from './userService';
import UserList from '../app'

// Basic functions
const editData = (event) => {
  switchEdit(event.target);
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
      refreshUserData();
      var editBtn = saveDataContainer.querySelector('.js-edit-btn');
      switchEdit(editBtn);
    });
  }
}

const addData = (event) => {
  event.preventDefault();
  let thisNode = event.target;
  let addDataContainer = thisNode.parentNode.parentNode;
  let addDataForm = document.querySelector('.js-add-data-form');
  let addDataFormValidation = document.querySelector('.js-add-data-form-validation');
  let method = addDataForm.getAttribute('method');
  let action = '/users/';
  let data =  serialize(addDataContainer);
  let addUserData;

  if(addDataForm.checkValidity()) {
    addUserData = userService({
      method: method,
      action: action,
      data: data
    });

    addUserData.then((data) => {
      let dataJson = JSON.parse(data);
      let fields = addDataContainer.querySelectorAll('input');
      refreshUserData();

      for(let i=0; i<fields.length; i++) {
        fields[i].value = '';
      }
    });

    addDataFormValidation.classList.remove('visible');
  } else {
    addDataFormValidation.classList.add('visible');
  }
}

// Auxiliar functions
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

const switchEdit = (editNode) => {
  let userContainer = editNode.parentNode.parentNode;
  let labelNode = userContainer.querySelectorAll('label');
  let inputNode = userContainer.querySelectorAll('input');
  let saveBtn = userContainer.querySelector('.js-save-btn');
  if(editNode.editMode == undefined) {
    editNode.editMode = false;
  }

  for(let i=0; i<inputNode.length; i++) {
    if(editNode.editMode == false && inputNode[i].type != 'hidden') {
      labelNode[i].style.display = 'none';
      inputNode[i].style.display = 'inline-block';
      inputNode[i].value = labelNode[i].textContent;
    } else if(inputNode[i].type != 'hidden') {
      labelNode[i].style.display = 'inline-block';
      inputNode[i].style.display = 'none';
    }
  }

  if(editNode.editMode == false) {
    editNode.editMode = true;
    saveBtn.style.display = 'inline-block';
    editNode.innerHTML = 'Cancelar';
  } else {
    editNode.editMode = false;
    saveBtn.style.display = 'none';
    editNode.innerHTML = 'Editar';
  }
}

// Utilities functions
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
