import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {getDocs, collection, doc, addDoc, deleteDoc} from 'firebase/firestore'
import { db } from './config/firebase';
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
    setWordToDescribe(AllWords[Math.floor(Math.random() * AllWords.length)]);
    e.preventDefault();
    if(WordToDescribe.Descriptions.includes(e.target.chosenWord.value)){
      setWordToDescribe(AllWords[Math.floor(Math.random() * AllWords.length)]);
      alert("goed");  
      
    }
    


  }
  return (
    <>
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
