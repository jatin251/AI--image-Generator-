import React, { useRef,useState } from 'react'
import'./ImageGenerator.css'
import default_image from'../Assets/image.svg'

export const ImageGenerator = () => {
  const[image_url,setImage_url]=useState("/");
  const[loading,setLoading]=useState(false);
  const inputRef=useRef(null);
  const imageGenerator = async() =>{
    if(inputRef.current.value===""){
      return ;
    }
    setLoading(true);
    try{
    const response= await fetch("https://api.openai.com/v1/images/generations ",
    {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization:"Bearer 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",
      },
      body:JSON.stringify({
        model:"dall-e-3",
        prompt:`${inputRef.current.value}`,
        n:1,
        size:"512x512"
      }),

    });
    if(!response.ok){
      throw new Error("Networking response is not okay");
    }
    const data =await response.json();
    const  data_array =data.data;
    if(Array.isArray(data_array)&&data_array.length>0&&data_array[0]?.url){
      setImage_url(data_array[0]?.url);
    }else{
      throw new Error("Invalid or empty response")
    }}
    catch(error){
      console.error("Error Fetching image",error);
    }
    finally{
  
    setLoading(false)}
  };
  return (
    <div className='ai-image-Generator'>
        <div className="header">Ai image <span>Generator</span></div>
        <div class="img-loading">
            <div className="image"> <img src={image_url==="/"?default_image:image_url} alt=" "/>
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
              <div className={loading?"loading-text":"display-none"}>wait for a few seconds</div>
            
            </div>
        </div>
        <div className='search-box'>
            <input type='text' ref={inputRef} className='search-input' placeholder='Search the Image You Want To Generate '></input>
            <div className='generate-btn' onClick={()=>{imageGenerator()}} ><span>Generate</span></div>
        </div>
        </div>
  );
  
  }
export default ImageGenerator;