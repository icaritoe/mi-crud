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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value, completed: false }]);
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

  const toggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const clearAllItems = () => {
    const confirmar = window.confirm("¿Estás completamente seguro de borrar TODO el listado? Esta acción no se puede deshacer.");
    if (confirmar) {
      setItems([]);
    }
  };

  const filteredItems = items.filter(item =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">CRUD con LocalStorage</h1>
        <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Buscar elementos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="items-counter">
          <span>Estado de la lista:</span>
          <span className="counter-badge">Total: {filteredItems.length}</span>
        </div>

        <List
          items={filteredItems}
          deleteItem={deleteItem}
          editItem={editItem}
          toggleComplete={toggleComplete}
        />

        {items.length > 0 && (
          <button className="btn-clear-all" onClick={clearAllItems}>
            Borrar Todos los Elementos
          </button>
        )}
      </div>
    </div>
  );
}

export default App;