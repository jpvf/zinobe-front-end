let root = 'http://' + location.hostname + ':3004';

const userService = ({method, action, data}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, root + action);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    if(data != undefined) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

export default userService;
