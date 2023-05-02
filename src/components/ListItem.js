import React from 'react'

export const ListItem = ({ strikethrough, toggle, name, deleteItem, id }) => {
  const styles = {
    textDecoration: strikethrough ? 'line-through' : 'none'
  }

  return (
    <div 
      className='list-item' 
      style={styles}
      onClick={() => toggle(id)}
    >
      {name}
      <button onClick={() => deleteItem(id)}>Delete</button>
    </div>
  )
}
