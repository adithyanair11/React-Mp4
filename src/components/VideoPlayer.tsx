import React, { useRef } from 'react'
import { Player } from 'video-react';

interface VideoProps {
    url:string
}

const VideoPlayer = (props:VideoProps) => {
    const {url} = props;
   
  return (
    <div style={{width:'200px',height:'200px'}}>
     <Player>
      <source src={url} />
    </Player>
    </div>
  )
}

export default VideoPlayer
