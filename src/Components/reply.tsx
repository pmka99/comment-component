import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import myImage from '../images/myusericon.png';
import { addReply } from "../store/commentSlices";

interface props{
    id:number
} 

// This Component help us to reply to a IComment
const Reply:React.FC<props>=({id})=>{
    const[text,setText]=useState<string>('Reply');
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
    const exitInput=()=>{
        if(text===""){
            setText('Reply')
            setStyle2({color:'gray'})
            setStyle1({visibility:"hidden"})
        }
    }

    // This function send IComment data to redux
    const eventHandler=(e:React.FormEvent)=>{
        e.preventDefault();
        dispatch(addReply({
            id,
            comment:{
                id:Date.now(),
                date:Date.now(),
                iLikedIt:false,
                likes:0,
                text,
                user:{
                    name:"mohammad karimi",
                    avatar:myImage
                }
            }
        }))
        setText('Reply')
        setStyle2({color:'gray'})
        setStyle1({visibility:"hidden"})
    }



    return(
        <div className='reply'>
            <div className="div1">
                <div className='divImage'>     
                    <img alt="user avatar" src={myImage} className='avatar' />  
                </div>
            </div>
            <div className='div2'>
                <form action="#" onSubmit={e=>eventHandler(e)}>
                    <input type="text" value={text} onChange={e=>changeInput(e.target.value)} onBlur={(e)=>exitInput()} onClick={()=>{if(text==='Reply'){setText('')}}} className="input" style={style2}/>
                    <input type="submit" value="send" style={style1} className="submit" />
                </form>
            </div>
        </div>
    )
    
}

export default Reply;