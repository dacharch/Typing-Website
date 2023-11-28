import React from 'react'
import styled   from 'styled-components'
import { useState,useEffect } from 'react';
import Top from './Top';


function TypingHere() {
  const paragraphs =  ["There are a variety of creatures that fall under the" +
  "category of animal. From domesticated pets like dogs and cats to wild animals"+ 
 " like lions and tigers, the term encompasses a wide range of species. Some animals are kept as "+
  "companions, while others are hunted for sport or used for"+
   "food and other resources. Regardless of their purpose, animals play an"+
   "important role in our world and should be treated with respect and care."];  
    
    const maxTime = 60 ;
    const [typingText,setTypingText] =useState('') ;
    const[inputFieldValue,setInputFieldValue] = useState('') ;
    const [timeLeft,setTimeLeft] = useState(maxTime) ;
    const [charIndex, setCharIndex] = useState(0); 
	  const [mistakes, setMistakes] = useState(0); 
  	const [isTyping, setIsTyping] = useState(false); 
	  const [WPM, setWPM] = useState(0); 
	  const [CPM, setCPM] = useState(0); 

  const loadParagraph = () => { 
		const ranIndex = Math.floor(Math.random() * paragraphs.length); 
		const inputField = document.getElementsByClassName('input-field')[0]; 
		document.addEventListener("keydown", () => inputField.focus()); 

		const content = Array.from(paragraphs[ranIndex]).map((letter, index) => ( 
        <span key={index} style={{ color: (letter !== ' ') ? 'black' : 'transparent' }} 
        className={`char ${index === 0 ? 'active' : ''}`}> 
				{(letter !== ' ') ? letter : '_'} 
			</span> 
		)); 

    // Initial States of the Our application
		setTypingText(content); 
		setInputFieldValue(''); 
		setCharIndex(0); 
		setMistakes(0); 
		setIsTyping(false); 
	}; 
  
    
    const initTyping = (event) => { 
      const characters = document.querySelectorAll('.char'); 
      let typedChar = event.target.value; 
      if (charIndex < characters.length && timeLeft > 0) { 
        let currentChar = characters[charIndex].innerText; 
        if (currentChar === '_') currentChar = ' '; 
        if (!isTyping) { 
          setIsTyping(true); 
        } 
        if (typedChar === currentChar) { 
          setCharIndex(charIndex + 1); 
      if (charIndex + 1 < characters.length) characters[charIndex + 1].classList.add('active'); 
          characters[charIndex].classList.remove('active'); 
          characters[charIndex].classList.add('correct'); 
        } else { 
          setCharIndex(charIndex + 1); 
          setMistakes(mistakes + 1); 
          characters[charIndex].classList.remove('active'); 
      if (charIndex + 1 < characters.length) characters[charIndex + 1].classList.add('active'); 
          characters[charIndex].classList.add('wrong'); 
        } 
  
        if (charIndex === characters.length - 1) setIsTyping(false); 
  
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60); 
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; 
        setWPM(wpm); 
  
        let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft)); 
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm; 
        setCPM(parseInt(cpm, 10)); 
      } else { 
        setIsTyping(false); 
      } 
    }; 

    function handleKeyDown(e){
       const characters = document.querySelectorAll('.char') ;
       if(e.key == 'Backspace' && charIndex > 0 
          && charIndex < characters.length 
          && timeLeft >0 
       ){

        if (characters[charIndex - 1].classList.contains('correct')) { 
          characters[charIndex - 1].classList.remove('correct'); 
        } 
        if (characters[charIndex - 1].classList.contains('wrong')) { 
          characters[charIndex - 1].classList.remove('wrong'); 
          setMistakes(mistakes - 1); 
        } 
        characters[charIndex].classList.remove('active'); 
		  	characters[charIndex - 1].classList.add('active'); 
			  setCharIndex(charIndex - 1); 
			  let cpm = (charIndex - mistakes - 1) * (60 / (maxTime - timeLeft)); 
			  cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm; 
			  setCPM(parseInt(cpm, 10)); 
			  let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60); 
			  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; 
			  setWPM(wpm); 

       }

    }

    useEffect(()=>{
      loadParagraph() ;
    },[])

    useEffect(() => { 
      let interval; 
      if (isTyping && timeLeft > 0) { 
        interval = setInterval(() => { 
          setTimeLeft(timeLeft - 1); 
          let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft)); 
          cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm; 
          setCPM(parseInt(cpm, 10)); 
          let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60); 
          wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; 
          setWPM(wpm); 
        }, 1000); 
      } else if (timeLeft === 0) { 
        clearInterval(interval); 
        setIsTyping(false); 
      } 
      return () => { 
        clearInterval(interval); 
      }; 
    }, [isTyping, timeLeft]); 
  
  return (

  
       <Container>
          <Top
            timeLeft={timeLeft}
            mistakes={mistakes}
            WPM={WPM}
            CPM={CPM}
          />
       
      
       <BottomContainer>       
           <Input
             className='input-field'
             type="text"
             value={inputFieldValue}
             onChange={initTyping}  
             onKeyDown={handleKeyDown}
           />
           <Para>
            {typingText}
           </Para>


       </BottomContainer>
       </Container> 
  )
}

const BottomContainer = styled.div`
    max-width:800px ;
    height:300px ;
    position:relative ;
    left:50% ;
    right:50% ;
    margin-top:10rem ;
    transform:translate(-50%,-50%) ;
    border-radius:15px ;
    box-shadow: 0 0 6px rgba(0,0,0,0.25); 
    background:#fff ;
    padding:10px ;
    overflow:auto ;


`;
const Input = styled.input`
    opacity:0 ;
    z-index:-999 ;
    position:absolute ;
   
`;

const Container = styled.div`
    height:100vh ;
    width:100% ;
    
`;
const Para= styled.p`
  word-break: break-all; 
  text-align: left;  
`;


export default TypingHere