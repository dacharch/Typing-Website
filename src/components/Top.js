import React from 'react'
import styled from 'styled-components'

function Top({timeLeft,mistakes,WPM,CPM}) {
  return (
     <TopContainer>
        <H1>Test Your Typing Skills</H1>
        <BottomContainer>
           <SpanContainer>
               Time Left : <P>{timeLeft}s</P>
           </SpanContainer>
           <SpanContainer>
               Mistakes : <P>{mistakes}</P>

           </SpanContainer>
            <SpanContainer>
              WPM : <P>{WPM}</P>
            </SpanContainer>
           <SpanContainer>
              CPM :<P>{CPM}</P>
          </SpanContainer>
        </BottomContainer>
     </TopContainer>
  )
}

const TopContainer = styled.div`
    width:100% ;
    height:12rem ;
`;
const BottomContainer = styled.div`
     display:flex ;
     align-items:center ;
     justify-content:center ;
` ;
const H1 = styled.h1`
    color:#000 ;
    font-size:3rem ;
    font-weight:bold ;
    text-align:center ;
    margin-top:20px ;
`;
const SpanContainer = styled.span`
   color:black ;
   font-size:30px ;
   margin-top:3rem ;
   padding:30px ;

`
const P = styled.span`
    color:gray ;
    font-size:30px ;
`


export default Top