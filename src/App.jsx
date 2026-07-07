import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    return storedItems;
  });
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value }]);
    }
  };

  const deleteItem = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">CRUD con LocalStorage</h1>
        <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />

        <div className="items-counter">
          <span>Estado de la lista:</span>
          <span className="counter-badge">Total: {items.length}</span>
        </div>

        <List items={items} deleteItem={deleteItem} editItem={editItem} />
      </div>
    </div>
  );
}

export default App;