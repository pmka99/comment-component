import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import { IComment,ReplaceAvatarName,CalculateDiffTime } from "../models/model";
import { AppDispatch } from "../store";
import likeImage from '../images/like.jpg'
import { likeReply } from "../store/commentSlices";

interface props{
    comment:IComment
    nowTime:number
}

// This Component get every IComment that was repleying to a based IComment , and show its information
const Replies:React.FC<props>=({comment,nowTime})=>{
    const[iLikedIt,setIlikedit]=useState<boolean>(comment.iLikedIt);
    const dispatch=useDispatch<AppDispatch>();

    // This function calculates differrent between time And set time some Expressions 
    const diftime:CalculateDiffTime=(timeNow,time)=>{
        var differrent:number=timeNow-time
        differrent=Math.floor(differrent/1000);

        if(differrent<60){
            return('a second ago')
        }
        else if(differrent<120){
            return('a minute ago')
        }
        else if(differrent<3600){
            let diff=Math.floor(differrent/60);
            return(`${diff} minutes ago`)
        }
        else if(differrent<86400){
            let diff=Math.floor(differrent/3600);
            return(`${diff} hours ago`)
        }
        else if(differrent<2592000){
            let diff=Math.floor(differrent/86400);
            return(`${diff} days ago`)
        }
        else if(differrent<31104000){
            let diff=Math.floor(differrent/2592000);
            return(`${diff} months ago`)
        }
        else{
            let diff=Math.floor(differrent/31104000);
            return(`${diff} years ago`)
        }
    }

    // This function get name of IUser and return it to avatarName if the IUser has no avatar
    const replaceAvatarName:ReplaceAvatarName=(name)=>{
        let num=name.indexOf(" ");
        let character1=name.charAt(0)
        let character2=name.charAt(num+1)
        let avatarName=character1+character2
        return avatarName;
    }

    // This function return styles
    const returnLikeStyle=()=>{
        if(iLikedIt){
            return {color:'white',backgroundColor:'#468cf4'}
        }
        else{
            return {color: '#468cf4',backgroundColor:'white'}  
        }
    }

    // this function add number of likes of every based IComent
    const likeMore=()=>{
        setIlikedit(!iLikedIt)
        dispatch(likeReply(comment.id))
    }

    return(
        <div className='replyCard'>
            <div className='div1'>
                <div className='divImage'>
                    {
                        comment.user.avatar
                            ? <img alt="user avatar" src={comment.user.avatar} className='avatar' />
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
                        {diftime(nowTime,comment.date)}
                    </div>
                </div>
                <div className='text'>
                    {comment.text}
                </div>
                <div style={returnLikeStyle()} className="div2-2" onClick={()=>likeMore()}>
                    <div><img alt="like icon" className="likeImg" src={likeImage}></img></div>
                    <div className="likenumber">{comment.likes}</div>
                </div>
            </div>
        </div>
        
    )
}

export default Replies;