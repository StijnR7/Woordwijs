import { useState, useEffect } from 'react'

import './App.css'
import {getDocs, collection, doc, addDoc, deleteDoc} from 'firebase/firestore'
import { db } from './config/firebase';
import Admin from './admin/admin';
import {
  Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [AllWords, setAllWords] = useState([])
  const [WordToDescribe, setWordToDescribe] = useState({
    Word: "hoi",
    Descriptions: ["groet", "hallo"]


  })


  useEffect(() => {
    const getWords = async () => {
      const data = await getDocs(collection(db, "Words"))
      setAllWords(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      
     
    }
    
    getWords();

  }, [])

  const CheckIfCorrect = (e) => {
    
    e.preventDefault();
    if(WordToDescribe.Descriptions.includes(e.target.chosenWord.value)){
      setWordToDescribe(AllWords[Math.floor(Math.random() * AllWords.length)]);
      alert("goed");  
      
    }
    


  }
  return (
    <>
     <Routes>
       <Route path="/admin" element={<Admin />} />
       
       </Routes>
     <div id="GameContainer">
      <div id="WordContainer">
        <p id="WordToDescribe">{WordToDescribe.Word}</p>
      </div>
      <form onSubmit={CheckIfCorrect}>
        <input type="text" name="chosenWord" id="WordInput" />
        <button type="submit">Guess</button>

      </form>
     </div>
    </>
  )
}

export default App
