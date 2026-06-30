import React, { useState, useEffect } from 'react';

function Form({ addOrUpdateItem, itemToEdit }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
    } else {
      setInputValue('');
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addOrUpdateItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          className="form-input"
          placeholder="Escribe un elemento..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn-submit">
          {itemToEdit ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
}

export default Form;