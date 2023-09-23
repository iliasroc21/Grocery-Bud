import React , {useState ,useEffect} from 'react' ;
import List from './List';
import Alert from './Alert';
function getLocalStorage(){
  let list = localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"));

  }
  else{
    return []; 
  }
}

function App() {
  const [name ,setName] = useState('');
  const [alert ,setAlert] = useState({show :false , msg : '' , type :''});
  const [editId , setEditId] =useState(null);
  const [isEditing , setIsEditing] = useState(false);
  const [items , setItems ] =useState(getLocalStorage());
  const deleteItem = (id)=>{
    let list = getLocalStorage();
    setItems(list.filter((item)=>item.id !== id));
    showAlert( true , 'Item deleted successfully' ,'danger');



  }
  const showAlert =(show = false , msg = '', type = '')=>{
   setAlert({show , msg , type}); 
  }
  const editItem=(id)=>{
    let editedItem = items.find((item)=>item.id===id);
    setName(editedItem.title);
    setEditId(id);
    setIsEditing(true);
   
  }
  const handleSubmit = (event)=>{
    event.preventDefault();
   
    if(!name){
      //showing alert of error
      showAlert(true , 'Please enter valid items ' , 'danger');

    }
    else if(name && isEditing){
      setItems(items.map((item , index)=>{
       if(item.id == editId){
        return {...item  ,title :name};
       }
       return item ; 
      })); 
      setName('');
      setIsEditing(false);
      setEditId(null);
      //show alert of editing items ; 
      showAlert(true , 'Item edited successfully' , 'success');


    }
    else{
      const newItem = {id : new Date().getTime().toString() ,title :name};
      setItems([...items , newItem]);
      
      setName("");
      showAlert(true , 'Item added to the list ' , 'success');

    }
    

  }
  const clearAll = ()=>{
    setItems([]);
    //show Alerting ; 
    showAlert(true , 'All Items removed' , 'danger');
  }
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(items));


  },[items])
 return (
  <main>
    <section className="container">
      <h3>Grocery Bud</h3>
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert ={showAlert} items ={items}/>}
        <input type="text" placeholder='eggs' className="fill-item" value={name} onChange={(event)=>setName(event.target.value)}/>
        <button type="submit"  className="submit-btn">{isEditing ? "edit Item" : "Add Item"}</button>

      </form>
      {items.length > 0 &&  <div className="list-items">
        <List items={items} deleteItem={deleteItem} editItem={editItem}/>
        <button className="clear-btn" onClick={clearAll}>clear All</button>

      </div> }
     
    </section>
  </main>

 ); 

}

export default App;
