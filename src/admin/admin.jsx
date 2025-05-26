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

    const ChangeDescAmount = (e) => {
      e.preventDefault();
      setDescriptionCount(e.target.DescAmount.value);


    }

     const  AddItem = async (e) => {
        e.preventDefault(); 
        let descriptions = [];
        for(let descElement of e.target.elements){
          if(descElement.name.includes("description")){
            descriptions.push(descElement.value);

          }

        }

        const docRef = await addDoc(collection(db, "Words"), {
        Word: e.target.Word.value,
        Descriptions: descriptions
       
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
    <form onSubmit={ChangeDescAmount}>
      <input placeholder='Aantal beschrijvingen' name="DescAmount" type="number" />
      <button>Go</button>
    </form>
     <form onSubmit={AddItem}>
        <input placeholder='Woord' type="text" name="Word" />
        {showDescriptions()}
        <button type="submit">Voeg woord toe</button>
     </form>
    </>
  )
}

export default Admin
