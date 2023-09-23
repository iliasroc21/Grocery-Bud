import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({items,deleteItem, editItem}) => {
  return (
    <>{
        items.map((item , index)=>{
            const {id , title} = item; 
            return( 
                <article className="single-item" key={id}>
                    <p className="title">{title}</p>
                    <div className="btn-container">
                    <button className="delete-btn" onClick={()=>{
                        deleteItem(id);
                    }}><FaTrash/></button>
                    <button className="edit-btn" onClick={()=>{editItem(id)}}><FaEdit/></button>

                    </div>
                    
                </article>
            );
        })
    }
    </>
  )
}

export default List
