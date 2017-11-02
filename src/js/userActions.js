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
    console.log('usuario ' + userId +' removido');
    userNode.parentNode.removeChild(userNode);
  });
}

const saveData = (event) => {
  console.log('save data');
}

const addData = (event) => {
  event.preventDefault();
  console.log('add data');
}

// Auxiliar functions
function serialize(form) {
  let field, s = [];
  if (typeof form == 'object' && form.nodeName == "FORM") {
      let len = form.elements.length;
      for (let i=0; i<len; i++) {
          field = form.elements[i];
          if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
              if (field.type == 'select-multiple') {
                  for (j=form.elements[i].options.length-1; j>=0; j--) {
                      if(field.options[j].selected)
                          s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                  }
              } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                  s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
              }
          }
      }
  }
  return s.join('&').replace(/%20/g, '+');
}

export {editData, deleteData, saveData, addData};
