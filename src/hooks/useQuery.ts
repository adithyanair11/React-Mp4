import axios from 'axios';
import React,{useState,useEffect} from 'react';


const useQuery = (url:string,refetch:number) => {
    const [state,setState] = useState({
        data:null,
        isLoading:true,
        error:''
    })
    useEffect(() => {
        const fetch = async() => {axios.get(url)
        .then(({data}:any) => setState({data,isLoading:false,error:''}))
        .catch((error) => setState({data:null,isLoading:false,error:error.message}))
        }
        fetch();
    },[url,refetch]);
    return state;
}

export default useQuery
