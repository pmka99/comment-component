import React, { useState } from 'react';
import { AppDispatch } from '../store';
import {useDispatch} from 'react-redux';
import { addComment } from '../store/commentSlices';
import myImage from '../images/myusericon.png';

//This Component help us to add a IComment to IComment[]
const Insert=()=>{
    const[text,setText]=useState<string>('Start a discussion');
    const[style1,setStyle1]=useState<object>({visibility:"hidden"})
    const[style2,setStyle2]=useState<object>({color:'gray'})
    const dispatch=useDispatch<AppDispatch>()

    //These functions help to style and get IComment text
    const changeInput=(value:string)=>{
        if(value!==""){
            setText(value)
            setStyle1({visibility:"visible"})
            setStyle2({color:'black'})
        }
        else{
            setStyle1({visibility:"hidden"})
            setText(value)
        }
    }
    const exitInput=(value:string)=>{
        if(text===""){
            setText('Start a discussion')
            setStyle2({color:'gray'})
            setStyle1({visibility:"hidden"})
        }
    }

    // This function send IComment data to redux
    const eventHandler=(e:React.FormEvent)=>{
        e.preventDefault();
        dispatch(addComment({
            id: Date.now(),
            date: Date.now(),
            user: {
                name: "mohmmad karimi",
                avatar:myImage
            },
            text,
            likes: 0,
            iLikedIt: false,
            replies: []
        }))
        setText('Start a discussion')
        setStyle2({color:'gray'})
        setStyle1({visibility:"hidden"})
    }
    
    
    return(
        <div className='insert'>
            <div className='div1'>
                <div className='divImage'>     
                    <img alt="user avatar" src={myImage} className='avatar' />    
                </div>
            </div>
            <div className='div2'>
                <form action="#" onSubmit={e=>eventHandler(e)}>
                    <input type="text" value={text} onChange={e=>changeInput(e.target.value)} onBlur={(e)=>exitInput(e.target.value)} onClick={()=>{if(text==='Start a discussion'){setText('')}}} className="input" style={style2}/>
                    <input type="submit" value="send" style={style1} className="submit" />
                </form>

            </div>
        </div>
    )
}

export default Insert;