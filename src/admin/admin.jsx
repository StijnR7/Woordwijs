import { useState, useEffect } from 'react'

import './Admin.css'
import {getDocs, collection, doc, addDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../config/firebase';
import {
  Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Admin() {
    const [DescriptionCount, setDescriptionCount] = useState(2);

     const  AddItem = async (e) => {
        e.preventDefault(); 


        const docRef = await addDoc(collection(db, "Words"), {
        Word: e.target.Word.value,
        Descriptions: e.target.Location.value,
       
        });

    }
 const showDescriptions = () => {
    const inputs = [];
    for (let i = 0; i < DescriptionCount; i++) {
        let inputName = "description" + i;
        inputs.push(<input key={i} type="text" name={inputName} />);
    }
    return inputs;
}

  
  return (
    <>
     <form onClick={AddItem}>
        <input type="text" name="Word" />
        {showDescriptions()}
        <button type="submit">Voeg woord toe</button>
     </form>
    </>
  )
}

export default Admin
