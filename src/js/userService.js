let root = 'http://localhost:3004';

const userService = ({method, action, data}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, root + action);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    if(data != undefined) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  });
}

export default userService;
