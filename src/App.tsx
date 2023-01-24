import React, { useEffect } from 'react';
import Insert from './Components/insert';
import {useSelector} from 'react-redux';
import { RootState } from './store';
import { IDiscussion } from './models/model';
import Discussion from './Components/discussion'

function App() {
  const discussions=useSelector((state:RootState)=>state.comment)
  useEffect(()=>{
    const nowTime=Date.now();
  },[])
  const nowTime=Date.now();
  return (
    <div className="app">
      <div style={{color:'red',margin:'5px',fontSize:'larger'}}>
        <b>   Comments</b>
      </div>
      
      <Insert />
      <div>
        {discussions.map((item:IDiscussion)=><Discussion nowTime={nowTime} discussion={item} key={item.id} />)}
      </div>
    </div>
  );
}

export default App;
