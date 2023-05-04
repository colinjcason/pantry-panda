import { useState, useEffect, useReducer, useCallback } from 'react'
import { ListItem } from "./components/ListItem"
import logo from './assets/panda (1).png'
import { auth, googleProvider, db } from './firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

function App() {
  // const [lineThrough, setLineThrough] = useReducer(prevState => !prevState, false)
  const [listItems, setListItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [inputField, setInputField] = useState('')

  const listItemsRef = collection(db, 'shopping-list')

  const getItemsList = useCallback(async () => {
    try {
     const data = await getDocs(listItemsRef)
     const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
     setListItems(filteredData)
    } catch (error) {
     console.log(error)
    } 
   }, [listItemsRef])

  useEffect(() => {
   getItemsList()    
  }, [getItemsList])

  
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  
  const toggle = async (id) => {
    const item = doc(db, 'shopping-list', id)
    // await updateDoc(item, {strikethrough: true})
  }

  const handleChange = (e) => {
    const str = e.target.value
    setNewItem(str.charAt(0).toUpperCase() + str.slice(1))
    setInputField(e.target.value)
  }

  // Adding item to shopping list
  const addItem = async () => {
    try {
      await addDoc(listItemsRef, {
        name: newItem, 
        strikethrough: false,
        userId: auth?.currentUser?.uid
      })      
      getItemsList()
      setInputField('')
    } catch (error) {
      console.log(error)
    }
  }

  const deleteItem = async (id) => {
    const item = doc(db, 'shopping-list', id)
    await deleteDoc(item)
  }

  const clearList = () => {
    setListItems([])
  }

  return (
    <div className="app">
      <img src={logo} alt='panda eating noodles'/>

      {auth ? 
      <button onClick={signInWithGoogle} id='sign-in-button'>Sign In</button>
      :
      <button onClick={logout} id='sign-in-button'>Sign Out</button>
      }
      
      <h5>A friend to help with your shopping checklist!
        <br/>
        Click your items to mark them off your list!
      </h5>

      <input 
        type='text' 
        id='input-field' 
        placeholder="Bread"
        name='inputField'
        value={inputField}
        onChange={handleChange}
       />

      <div className="button-container">
        <button onClick={addItem}>Add to List</button>
        {/* <button onClick={clearList}>Clear List</button> */}
      </div>

      <ul className="shopping-list">
        {listItems.map(item => (
          <ListItem 
            toggle={toggle} 
            strikethrough={item.strikethrough} 
            name={item.name} 
            key={item.id}
            id={item.id}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
