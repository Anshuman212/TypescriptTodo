import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState('')
  const [updateItemText, setUpdateItemText] = useState('')
  //adding new task from the database
  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/item', {
        task: itemText,
      });
      setListItems(prev=>[...prev,res.data]);
      setItemText('');
    } catch (error) {
      console.log(error);
    }
  };

  //creating function to fetch all the todo items from the database  -- use the useEffect hook
  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/item');
        setListItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
  }, []);

  //delete item when clicked on delete
  const deleteItem = async (id:string)=>{
    try{
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`)
      const newListItem = listItems.filter(item=>item._id!==id);
      setListItems(newListItem);
    }catch(error){
      console.log(error);
    }
  }

  //update item
const updateItem = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try{
    const res = await axios.put(`http://localhost:5000/api/item/${isUpdating}`,{task: updateItemText})
  
    console.log(res.data);
    const updatedItemIndex = listItems.findIndex(item=>item._id===isUpdating);
    const updatedItem = listItems[updatedItemIndex].task = updateItemText;
    setUpdateItemText('');
    setIsUpdating('');
  }catch(error){
    console.log(error);
  }
}

  //update item but before that we need to render the input field which will be acitve once the button is clicked and will generate our new input
  const renderUpdateForm=()=>(
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}}>
      <input className='update-new-input' type="text" placeholder='enter the edits' onChange={e=>{setUpdateItemText(e.target.value)}} value ={updateItemText} />
      <button className='update-new-btn' type='submit'>Update</button>
    </form>
  )


  return (
    <div className="App">
      <h1>Todo</h1>
      <form
        className="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => addItem(e)}
      >
        <input
          type="text"
          placeholder="Add the task"
          onChange={(e) => {
            setItemText(`${e.target.value}`);
          }}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item">
            {
              isUpdating===item._id
             ?renderUpdateForm()
             :
             <>
                  <p className="item-content">{item.task}</p>
            <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
            <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
             </>
            }
       
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
