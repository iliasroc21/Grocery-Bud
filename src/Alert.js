import React ,{useEffect} from 'react';
import { FaTimes , FaExclamationCircle , FaCheck } from 'react-icons/fa';

const Alert = ({show , msg , type ,removeAlert ,items}) => {
    useEffect(()=>{
        const timeout = setTimeout(()=>{removeAlert()}  ,5000);
        return ()=>{clearTimeout(timeout)};

    } , [items]);
  return (
    <div className="alert">
        <div className="top">
          {type ==='danger' ? <FaExclamationCircle className="danger-btn"/> : <FaCheck className="success-btn"/>}
          <p className="msg">{msg}</p>
        <button className="removeAlert" onClick={()=>removeAlert()}>
            <FaTimes/></button></div>
        <span className={type==='danger' ? "underline danger" : "underline success"}></span>
      
    </div>
  )
}

export default Alert
