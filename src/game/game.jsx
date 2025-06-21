import {useState, useEffect} from 'react'

import '../App.css'
import {getDocs, collection} from 'firebase/firestore'
import {db} from '../config/firebase';


function Game() {
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
        if (e.target.chosenWord.value) {
            const inputWords = e.target.chosenWord.value.toLowerCase().split(/\s+/);
            if (inputWords.some(word => WordToDescribe.Descriptions.includes(word))) {
                setWordToDescribe(AllWords[Math.floor(Math.random() * AllWords.length)]);
                alert("goed");
            } else {
                alert("fout");
            }
        }
        document.getElementById("WordInput").value="";
    }
    return (
        <>
            <div className="headers bg-white w-screen ">
                <img src="src/img/Logo van ROC-Nijmegen.svg" alt="RocLogo" className="roclogo"/>
            </div>

            <div className="diagonal-split">
                <h1 className="roct">Leg het volgende woord uit:</h1>

                <div className="wordkaart text-center">
                    <h2 id="WordToDescribe" className="roct">{WordToDescribe.Word}</h2>
                </div>

                <form onSubmit={CheckIfCorrect}>

                    <input
                        className="text-white"
                        type="text"
                        name="chosenWord"
                        id="WordInput"
                        placeholder="Beschrijf het woord"
                    />
                    <div className="margintop">
                    <button type="submit">Guess</button>
                    </div>
                </form>



            </div>
        </>
    );

}

export default Game
