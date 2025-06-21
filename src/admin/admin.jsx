import { useState } from 'react'
import './Admin.css'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

function Admin() {
    const [DescriptionCount, setDescriptionCount] = useState(2)

    const ChangeDescAmount = (e) => {
        e.preventDefault()
        setDescriptionCount(e.target.DescAmount.value)
    }

    const AddItem = async (e) => {
        e.preventDefault()
        let descriptions = []
        for (let descElement of e.target.elements) {
            if (descElement.name.includes("description")) {
                descriptions.push(descElement.value)
            }
        }

        await addDoc(collection(db, "Words"), {
            Word: e.target.Word.value,
            Descriptions: descriptions
        })
    }

    const showDescriptions = () => {
        const inputs = []
        for (let i = 0; i < DescriptionCount; i++) {
            let inputName = "description" + i
            inputs.push(<input className="text-white bg-[#6c6bc4] border-none rounded-2xl m-2 p-4 w-50 text-center font-bold" key={i} type="text" name={inputName} placeholder={`Beschrijving ${i + 1}`} />)
        }
        return inputs
    }

    return (
        <>
            <div className="headers bg-white w-screen">
                <img src="src/img/Logo van ROC-Nijmegen.svg" alt="RocLogo" className="roclogo" />
            </div>

            <div className="diagonal-split">
                <h1 className="roct">Nieuw woord toevoegen</h1>

                <form onSubmit={ChangeDescAmount}>
                    <input
                        className="text-white bg-[#6c6bc4] border-none rounded-2xl p-4 w-60 text-center font-bold"
                        placeholder='Aantal beschrijvingen'
                        name="DescAmount"
                        type="number"
                    />
                    <div className="margintop">
                        <button type="submit">Bevestig aantal</button>
                    </div>
                </form>

                <form onSubmit={AddItem}>
                    <input
                        className="text-white bg-[#6c6bc4] border-none rounded-2xl p-4 w-50 text-center font-bold m-2"
                        placeholder='Woord'
                        type="text"
                        name="Word"
                    />


                    {showDescriptions()}
                    <div className="margintop">
                        <button type="submit">Voeg woord toe</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Admin
