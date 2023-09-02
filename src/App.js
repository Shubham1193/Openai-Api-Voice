import React, { useState } from "react";
import axios from "axios";
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'



export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:8080/chat";

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => {
        setResponse(res.data);
        console.log(prompt);
      })
      .catch((error) => {
        console.log(error);
      });

    setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };


  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    
  }

  
  const stoptListening = () => SpeechRecognition.stopListening();

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
      return null
  }




  return (
    <div className="container container-sm p-1">
      {" "}
      <h1 className="title text-center text-darkGreen">ChatGPT API</h1>
      <form className="form" >
        <div className="form-group">
          <a href="">Link</a>
          <label htmlFor="">Ask questions</label>
          <input
            className="shadow-sm"
            type="text"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
          />
          <button onClick={handleSubmit}>ans</button>
        </div>{" "}
        {/* <button className="btn btn-accept w-100" type="submit">
          Go
        </button> */}
      </form>
      <div className="bg-darkGreen  mt-2 p-1 border-5">
        <p className="text-light">
          {response ? response : "Ask me anything..."}
        </p>
      </div>


      <button onClick={startListening}>start</button>
      <button onClick={stoptListening}>stop</button>
      <div style={{border:"2px solid black",height:"100px"}}>
        {transcript}
      </div>

    </div>
  );
}