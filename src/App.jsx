import { useState, useEffect } from 'react'
import Game from './game/game';
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

  return (
    <>
     <Routes>
       <Route path="/admin" element={<Admin />} />
       <Route path="/" element={<Game/>}/>
       </Routes>
     
    </>
  )
}

export default App
