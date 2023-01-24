import React ,{useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { IComment } from "../models/model";
import { AppDispatch } from "../store";
import likeImage from '../images/like.jpg'

interface props{
    comment:IComment
    nowTime:number
}

const Replies:React.FC<props>=({comment,nowTime})=>{

    const[time,setTime]=useState<string>('')

    useEffect(()=>{
        diftime()
    },[])

    const diftime=()=>{
        var differrent:number=nowTime-comment.date
        differrent=Math.floor(differrent/1000);

        if(differrent<60){
            setTime('a second ago')
        }
        else if(differrent<120){
            setTime('a minute ago')
        }
        else if(differrent<3600){
            let diff=Math.floor(differrent/60);
            setTime(`${diff} minutes ago`)
        }
        else if(differrent<86400){
            let diff=Math.floor(differrent/3600);
            setTime(`${diff} hours ago`)
        }
        else if(differrent<2592000){
            let diff=Math.floor(differrent/86400);
            setTime(`${diff} days ago`)
        }
        else if(differrent<31104000){
            let diff=Math.floor(differrent/2592000);
            setTime(`${diff} months ago`)
        }
        else{
            let diff=Math.floor(differrent/31104000);
            setTime(`${diff} years ago`)
        }
    }

    const replaceAvatarName=(name:string)=>{
        let num=name.indexOf(" ");
        let character1=name.charAt(0)
        let character2=name.charAt(num+1)
        let avatarName=character1+character2
        return avatarName;
    }
    const likeMore=()=>{
        console.log("like")
    }

    return(
        <div className='replyCard'>
            <div className='div1'>
                <div className='divImage'>
                    {
                        comment.user.avatar
                            ? <img src={comment.user.avatar} className='avatar' />
                            : <div className='avatarName'><div className='textAvatar'>{replaceAvatarName(comment.user.name)}</div></div>
                    }
                </div>
            </div>
            <div className='div2'>
                <div className="div2-1">
                    <div className='user'>
                        {comment.user.name}
                    </div>
                    <div> </div>
                    <div className="time">
                        {time}
                    </div>
                </div>
                <div className='text'>
                    {comment.text}
                </div>
                <div className="div2-2" onClick={()=>likeMore()}>
                    <div><img className="likeImg" src={likeImage}></img></div>
                    <div className="likenumber">{comment.likes}</div>
                </div>
            </div>
        </div>
        
    )
}

export default Replies;