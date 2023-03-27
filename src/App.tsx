import { useState } from 'react';
import './App.css'
import Mp4Uploader from './components/Mp4Uploader';
import useQuery from './hooks/useQuery';
import { Spin } from 'antd';
import VideoPlayer from './components/VideoPlayer';


function App() {
  const [refetch,setRefetch] = useState(0);
  const {data:imageUrls=[],isLoading:videoLoading,error:fetchError} = useQuery('/api/videos',refetch)
  return (
    <div style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <Mp4Uploader uploadUrl='/api/video' setRefetch={setRefetch}/>
      <div style={{display:'flex',flexWrap:'wrap',gap:'1em'}}>
        {videoLoading && (
          <Spin />
        )}
        {
          fetchError && imageUrls?.length === 0 && (
            <h1>No images found</h1>
          )
        }
        {
          imageUrls?.map((url) => <VideoPlayer url={url}/>)
        }
      </div>
    </div>
  )
}

export default App
