import React, { useState } from 'react'

function Scroll() {
// setting scrolling number
  const [scrollDigit, setScrollDigit] = useState(0);
//fetching element and incrementing scroll
 const scrollDown = () => {
   document.getElementById("allMatches").scrollTo(0, scrollDigit);
   setScrollDigit(scrollDigit => scrollDigit + 800);
   if (scrollDigit >= 59000){
     return(
      setScrollDigit(59000)
     )
   }
   console.log(scrollDigit)
}
//fetching element and decrementing scroll
 const scrollUp = () => {
   document.getElementById("allMatches").scrollTo(0, scrollDigit);
   setScrollDigit(scrollDigit => scrollDigit - 800);
   if (scrollDigit <= 800){
     return(
       setScrollDigit(0)
    )
   }
   console.log(scrollDigit)
}
return (
  <div>
    <button onClick={scrollUp}>Scroll Up</button>
    <button onClick={scrollDown}>Scroll Down</button>
  </div>
  );
 }
export default Scroll;