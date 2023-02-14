import React, { useState } from "react";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async ()=>{
    if(form.prompt){
      console.log(form.prompt)
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8070/api/v1/dalle',{
          method: 'POST',
          headers :{
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({prompt: form.prompt})
        })
        const data = await response.json();
        //console.log(data.value)
       
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);

      }finally{
        setGeneratingImg(false);
      }

    }else{
      alert('PLS ENTER A PROMPT');  
    }
  }
  const handleSubmit =async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try {
        console.log(form);
          const response = await fetch('http://localhost:8070/api/v1/post',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({...form})

          })
          console.log(response);
          await response.json();
          navigate('/');


      } catch (error) {
        alert(err)
      }finally{
        setLoading(false);
      }

    }else{
      alert('PLZ ENETER A PROMT ND GENERATE AN IMG PLZ')
    }
  };
  const handleChange= (e)=>{
    setForm({...form,[e.target.name]: e.target.value});

  };
  const handleSupriseMe=()=>{
    const randomPrompt  = getRandomPrompt(form.prompt);
    setForm({...form,prompt: randomPrompt})
  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create through a collection of imaginative visually stunning images
          generated by AI and share them
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
            <FormField
                labelName="Your Name"
                type="text"
                name="name"
                placeholder="John Gdoe"
                value={form.name}
                handleChange={handleChange}
            />
            <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
                value={form.prompt}
                handleChange={handleChange}
                isSupriseMe
                handleSupriseMe={handleSupriseMe}
            />
            <div className="relative bg-gray-50 border-gray-300 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 flex items-center justify-center h-64">
                {form.photo ? (
                    <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>

                ):(<img src={preview} alt="previes" className="w-9/12 h-9/12 object-contain opacity-40"/>)}

                {generatingImg &&(<div className="absolute items-center justify-center flex inset-0 z-0 bg-[rgba(0,0,0,0.5)]">
                    <Loader/>


                </div>)}
            </div>
        </div>
        <div className="mt-5 gap-5 flex">
                    <button type="button" onClick={generateImage} className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        {generatingImg ? 'Generating...':'Generated'}
                    </button>
        </div>
        <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">Once u have created img, u can share it</p>
            <button type="submit" className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {loading ? 'Sharing' : 'Share w EVERY1'}
            </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;