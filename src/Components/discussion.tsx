import React, {  useState } from 'react';
import { IDiscussion , CalculateDiffTime, ReplaceAvatarName} from '../models/model';
import Replies from './replies';
import Reply from './reply';
import likeImage from '../images/like.jpg'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { like } from '../store/commentSlices';


interface props{
    discussion:IDiscussion
    nowTime:number
}


// This Component show every IDiscussion :
// first show based IComment and if IComment replyed show all of IComment By pass to Replies(Component) 

const Discussion:React.FC<props>=({discussion,nowTime})=>{
    const[style1,setStyle1]=useState<object>({display:"none"});
    const[style2,setStyle2]=useState<object>({display:"block"});
    const[iLikedIt,setIlikedit]=useState<boolean>(discussion.iLikedIt)
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

    // This functions change and return styles
    const returnLikeStyle=()=>{
        if(iLikedIt){
            return {color:'white',backgroundColor:'#468cf4'}
        }
        else{
            return {color: '#468cf4',backgroundColor:'white'}
        }
    }
    const changeVisibility=()=>{
        setStyle1({display:"block"})
        setStyle2({display:"none"})
    }

    // this function add number of likes of every based IComent
    const likeMore=()=>{
        setIlikedit(!iLikedIt)
        dispatch(like(discussion.id))
    }

    
    return(
        <div className='card'>
            <div className='div1'>
                <div className='divImage'>
                    {
                        discussion.user.avatar
                            ? <img alt='user avatar' src={discussion.user.avatar} className='avatar' />
                            : <div className='avatarName'><div className='textAvatar'>{replaceAvatarName(discussion.user.name)}</div></div>
                    }
                </div>
                <div className='div-dropdown' style={style1}></div>
            </div>
            <div className='div2'>
                <div className='div2-1'>
                    <div className='user'>
                        {discussion.user.name}
                    </div>
                    <div className="time">
                        {diftime(nowTime,discussion.date)}
                    </div>
                </div>
                <div className='text'>
                    {discussion.text}
                </div>
                <div style={returnLikeStyle()} className="div2-2" onClick={()=>likeMore()}>
                    <div><img alt='like icon' className="likeImg" src={likeImage}></img></div>
                    <div className='likenumber'>{discussion.likes}</div>
                </div>
                <div>
                    {
                        discussion.replies.length!==0
                            ?   <div>
                                    <div style={style2} onClick={e=>changeVisibility()}><button onClick={e=>changeVisibility()} className="button1">show more</button></div> 
                                    <div style={style1}>{discussion.replies.map(item=><Replies key={item.id} nowTime={nowTime} comment={item}/>)}</div>
                                </div>
                            : <></>
                    }
                </div>
                <div>
                    <Reply id={discussion.id} />
                </div>
            </div>
        </div>
    )
}

export default Discussion;