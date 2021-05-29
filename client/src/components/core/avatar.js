import React from 'react';
import { Avatar } from '@material-ui/core';

export const avatarStyle = (index) => {
  if (index % 5 === 0) {
    return {
      backgroundColor: '#FCF0EF',
      fontSize:"50px",
      textTransform:"capitalize",
      margin:"0px 3px 0px 3px",
      color: '#E66E68',
      borderRadius: "50%",
      width: "160px",
      height:"160px",
      objectFit: "cover",
    };
  } else if (index % 3 === 0) {
    return {
      backgroundColor: '#FFFABB',
      fontSize:"50px",
      textTransform:"capitalize",
      margin:"0px 3px 0px 3px",
      color: '#FFD502',
      borderRadius: "50%",
      width: "160px",
      height:"160px",
      objectFit: "cover",
    };
  } else if (index % 2 === 0) {
    return {
      backgroundColor: '#CAFFE6',
      fontSize:"50px",
      textTransform:"uppercase",
      margin:"0px 3px 0px 3px",
      color: '#34F89C',
      borderRadius: "50%",
      width: "160px",
      height:"160px",
      objectFit: "cover",
    };
  } else if (index % 1 === 0) {
    return {
      backgroundColor: '#CAF0FF',
      fontSize:"50px",
      margin:"0px 3px 0px 3px",
      textTransform:"capitalize",
      color: '#3BC8FF',
      borderRadius: "50%",
      width: "160px",
      height:"160px",
      objectFit: "cover",
    };
  }
};



const AvatarContainer = ({ name, src }) => {
  console.log(name, src)

  if(name){
    let naam = name.split(" ");
    return <>
            <Avatar style={avatarStyle(name.length)} variant="square" src={src}>
              {naam[0][0]}{naam[1][0]}
            </Avatar>
           </>
  }else{
    return <>
          </>
  }
  return <>
        </>

}

export default AvatarContainer;
