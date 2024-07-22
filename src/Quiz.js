import Datas from "./data.json"
import {useState,useEffect} from "react";
import "./App.css"


 function Quiz(){

    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [score,setScore] = useState(0)
    const [show,setShow] = useState(false)
    const [timer,setTimer] = useState(10)

    useEffect(()=>{

        let interval;

        if(timer > 0 && !show){

         interval = setInterval(()=>{
           setTimer((prevTime)=> prevTime -1)
         },1000)

        }else{
            
            clearInterval(interval)
            setShow(true)
        }

        return ()=>clearInterval(interval)
         
    },[timer])
  
    console.log(timer)

    const checkFunction = (correctValue)=>{

        if(Datas[currentQuestion].correctOption == correctValue){
            setScore((prevScore)=>prevScore+1)
       }
        
        if(currentQuestion < Datas.length-1){
            setCurrentQuestion(currentQuestion+1)
            setTimer(10)
        }else{
            setShow(true)
        }
     }


    const restartFunction = ()=>{
        setCurrentQuestion(0);
        setScore(0);
        setShow(false);
        setTimer(10)
    }

   
   return(

     <div className="Quiz-container">
        
       <div className="sub-1">
        <div className="heading">
        <div>Quiz-Game</div>
        </div>
       <div>Question : {Datas[currentQuestion].question}</div>
        <div className="options-container">
          <div>Options :</div>  
          <div className="options">
         {Datas[currentQuestion].options?.map((value)=>{
           return(
           
            <div >
            <button onClick={()=>checkFunction(value)}  disabled={show ? true : false} className="btns" >{value}</button> 
           </div>
          
           )
         })}
         </div>
        </div>
         <div>Time Remains : {timer} sec</div>
       </div>
      
       <div className="sub-2" style={show ? {display : "block"} : {display : "none"}}>
         
         <div style={{color:"red"}}>Game End</div>
         <div>Your Score : {score}/{Datas.length}</div>
         <div>
         <button className="restart-btn" onClick={restartFunction}>Restart</button>
         </div>
       </div>
     </div>
   )

 }
 export default Quiz;