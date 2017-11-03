import React from 'react';
import userService from './userService';

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
    userNode.parentNode.removeChild(userNode);
  });
}

const saveData = (event) => {
  console.log('save data');
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
    });
  }
}

// Auxiliar functions
function serialize(addDataContainer) {
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
