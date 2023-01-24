import React, { useState } from 'react';
import { AppDispatch } from '../store';
import {useDispatch} from 'react-redux'
import { addComment } from '../store/commentSlices';
import { IDiscussion } from '../models/model';

const Insert=()=>{
    const[text,setText]=useState<string>('Start a discussion');
    const[style1,setStyle1]=useState<object>({visibility:"hidden"})
    const[style2,setStyle2]=useState<object>({color:'gray'})

    const dispatch=useDispatch<AppDispatch>()

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
    const eventHandler=(e:React.FormEvent)=>{
        e.preventDefault();
        // dispatch(addComment({
        //     id: 1,
        //     date: Date.now(),
        //     user: {
        //         name: "mohmmad karimi"
        //     },
        //     text: "We have just published the first campaign. Let's see the results in the 5 days and we will iterate on this.",
        //     likes: 50,
        //     iLikedIt: true,
        //     replies: []
        // }))
        console.log(Date.now())
        setText('Start a discussion')
        setStyle2({color:'gray'})
        setStyle1({visibility:"hidden"})
    }
    const exitInput=(value:string)=>{
        if(text===""){
            setText('Start a discussion')
            setStyle2({color:'gray'})
            setStyle1({visibility:"hidden"})
        }
    }
    
    return(
        <div className='insert'>
            <div className='div1'>
                avatar
            </div>
            <div className='div2'>
                <form action="#" onSubmit={e=>eventHandler(e)}>
                    <input type="text" value={text} onChange={e=>changeInput(e.target.value)} onBlur={(e)=>exitInput(e.target.value)} onClick={()=>setText('')} className="input" style={style2}/>
                    <input type="submit" value="send" style={style1} className="submit" />
                </form>

            </div>
        </div>
    )
}

export default Insert;