import { useState } from "react"
import { languages } from "../assets/Language"
import {nanoid} from 'nanoid'
import {clsx} from 'clsx';
import {getFarewellText} from "../assets/FareWell"
import Confetti from 'react-confetti'
import { words } from "../assets/Words";


export default function Header(){


    const [word, setWord] = useState(()=>generateWord())
    const allLetter = "abcdefghijklmnopqrstuvwxyz"
    const [userGuess , setUserGuess] = useState([])


    function generateWord(){
     let random = Math.floor(Math.random() * words.length )
      return words[random]
         
    }
   

    const WrongGuescount =
      userGuess.filter(letter=> !word.includes(letter)).length
     
    const isGameWon = word.split('').every(letter => userGuess.includes(letter)) && WrongGuescount <=7
    // console.log(isGameWon);

     const isGameLost = WrongGuescount >= languages.length -1
     console.log(isGameLost);

    const isGameOver = isGameLost || isGameWon
        
    const lastGuessLetter = userGuess[userGuess.length-1];
    const islastGuessLetterIncorrect = lastGuessLetter && !word.includes(lastGuessLetter)
 
    // displaying if user have correctly guessed letter
    const wordElement = word.split("").map((itm)=>{
        const isGuessed = userGuess.includes(itm);
        const correctGuessed = isGuessed && word.includes(itm);
        const shouldLettterRevealed = correctGuessed || isGameOver;
        const missLetterClass = clsx( 
            isGameLost && !userGuess.includes(itm) && 'missed-letter'
         )
        return (
            shouldLettterRevealed ?  <span className={`input-word`} key={nanoid()}> {itm.toLocaleUpperCase()} </span> : <span className="input-word" key={nanoid()}> {""} </span>
        )
       
})

  

    // keyborad with buttons 
    const keyBoard = allLetter.split('').map((itm)=> 
        {
            const isGuessed = userGuess.includes(itm);
            const correctGuessed = isGuessed && word.includes(itm);
            const  wrongGuessed = isGuessed && !word.includes(itm)
            const className = clsx({
                correct : correctGuessed,
                wrong : wrongGuessed
            })

            return <button className= {`keyBoard ${className} `} 
            disabled = {isGameOver}
            key={itm}
            onClick={()=>btnClick(itm)}
            value={itm}
            > {itm.toLocaleUpperCase()} </button>
              
        }       
    )

    // button function of the keyboard updates userGuess in the array 
    function btnClick(letter){
        setUserGuess((prev)=>(
            userGuess.includes(letter) ? prev : [...prev,letter]
        ))

    }



    // language UI for 
    const langElement = languages.map((itm,index)=>{
        const styles = {background : itm.backgroundColor, color : itm.color}
        const isLostLanguage = index < WrongGuescount
        return <span style={styles}
         key={itm.name}
         className= { `chips ${isLostLanguage ? "lost" : ""} `}> 
         {itm.name} </span>
     })

     const gameStatusClass = clsx("status-section",{
        isWon : isGameWon,
        isLost : isGameLost
     })
    
     function renderGameStatus(){
        if(!isGameOver){
              if (islastGuessLetterIncorrect) {
                return <p className="incoreect-status">
                   {getFarewellText(languages[WrongGuescount-1].name)}
                </p>
              }
        }
      if(isGameOver){
        if(isGameWon){
            return <> 
             <Confetti/>
              <h1> You Won </h1>
              <p>well Done 🎈</p>
             </>
        }
        else{
            return <>
               <h1> You loss </h1> 
                &nbsp;&nbsp;&nbsp;
                <p>Better Luck Next Time 🍀</p>
            </>
        }
      }
      else {
        return null
      }
     }
     
     function newGame(){
        setUserGuess([])
        setWord(generateWord())
        wrongGuessed = 0;
        
     }
     console.log(word);
     console.log(words.length);
     
     
    return(
        <>
        
        <main className="header">
            <header>
            <h1> Assembly : <span>EndGame</span></h1>
            <p>Guess the word in uder 8 attemps to keep the programming world safe from Assembly !</p>

            <h4> Attempt Left :  { 8-WrongGuescount} </h4>
            </header>

            <section className={gameStatusClass} >
                {
                    
                renderGameStatus()
                  }
            </section>

            <section className={`lang`}>
            {langElement}
        </section>

             <section className="word-element">
                {wordElement}
             </section>

             <section className="keybord-section">
                {keyBoard}
             </section>

             {isGameOver ? <button className="game-btn" onClick={newGame}>New Game</button> : ""}
        </main>
        
        </>
    )
}