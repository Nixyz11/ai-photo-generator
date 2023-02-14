import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, photo, prompt, name }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col mah-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#253c9696] m-2 p-4 rounded-md">
        <p className="text-white text-md prompt overflow-y-auto">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7  h-7 rounded-full bg-green-700 flex justify-center items-center text-white object-cover font-bold text-md">
              {name[0].toUpperCase()}
            </div>
            <p className="text-white text-sm ">{name}</p>
          </div>
          <button
            type="button"
            className="outine-none bg-transparent border-none"
            onClick={() => downloadImage(_id, photo)}
          >
            <img
              src={download}
              alt="download"
              className="invert h-6 w-6 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
