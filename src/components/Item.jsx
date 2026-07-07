import React from 'react';

function Item({ item, deleteItem, editItem, toggleComplete }) {
  return (
    <li className="item">
      <div className="item-main" onClick={() => toggleComplete(item.id)}>
        <input
          type="checkbox"
          className="item-checkbox"
          checked={item.completed || false}
          onChange={() => {}}
        />
        <span className={`item-text ${item.completed ? 'text-completed' : ''}`}>
          {item.value}
        </span>
      </div>
      <div className="item-actions">
        <button
          className={`btn-edit ${item.completed ? 'btn-disabled' : ''}`}
          onClick={() => editItem(item)}
          disabled={item.completed}
        >
          Editar
        </button>
        <button className="btn-delete" onClick={() => deleteItem(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;