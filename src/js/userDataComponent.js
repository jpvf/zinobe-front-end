import React from 'react';

const UserData = (props) => {
  let {id, name, username, email} = props;
  return (
    <tr className="data-list__user js-user" data-id={id}>
      <td>
        <label>
          {id}
        </label>

        <input name="id" type="hidden" defaultValue={id}/>
      </td>

      <td>
        <label>
          {name}
        </label>

        <input name="name" type="text" defaultValue={name} placeholder="Nombre"/>
      </td>

      <td>
        <label>
          {username}
        </label>

        <input name="username" type="text" defaultValue={username} placeholder="Nombre de usuario"/>
      </td>

      <td>
        <label>
          {email}
        </label>

        <input name="email" type="email" defaultValue={email} placeholder="Correo"/>
      </td>

      <td className="data-list__user__actions">
        <button className="data-list__save-btn js-save-btn">
          Guardar
        </button>

        <button className="data-list__edit-btn js-edit-btn">
          Editar
        </button>

        <button className="data-list__delete-btn js-delete-btn">
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default UserData;
