import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Test=(prompt,photo)=>{
    console.log(prompt);
    console.log(photo);
}

const Card = ({ _id, name, prompt, photo }) => (
  Test(prompt,photo),
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={photo}
      alt={prompt}
    />
  </div>
  );

export default Card