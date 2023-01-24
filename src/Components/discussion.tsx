import React, { useEffect, useState } from 'react';
import { IDiscussion ,IComment} from '../models/model';
import Replies from './replies';
import Reply from './reply';
import likeImage from '../images/like.jpg'

interface props{
    discussion:IDiscussion
    nowTime:number
}

const Discussion:React.FC<props>=({discussion,nowTime})=>{
    const[style1,setStyle1]=useState<object>({display:"none"})
    const[style2,setStyle2]=useState<object>({display:"block"})
    const[time,setTime]=useState<string>('')

    useEffect(()=>{
        diftime()
    },[])

    const diftime=()=>{
        var differrent:number=nowTime-discussion.date
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

    const changeVisibility=()=>{
        setStyle1({display:"block"})
        setStyle2({display:"none"})
    }
    const likeMore=()=>{
        
    }

    
    return(
        <div className='card'>
            <div className='div1'>
                <div className='divImage'>
                    {
                        discussion.user.avatar
                            ? <img src={discussion.user.avatar} className='avatar' />
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
                        {time}
                    </div>
                </div>
                <div className='text'>
                    {discussion.text}
                </div>
                <div className="div2-2" onClick={()=>likeMore()}>
                    <div ><img className="likeImg" src={likeImage}></img></div>
                    <div className='likenumber'>{discussion.likes}</div>
                </div>
                <div>
                    {
                        discussion.replies.length!==0
                            ?   <div>
                                    <div style={style2} onClick={e=>changeVisibility()}><button onClick={e=>changeVisibility()} className="button1">show more</button></div> 
                                    <div style={style1}>{discussion.replies.map(item=><Replies nowTime={nowTime} comment={item}/>)}</div>
                                </div>
                            : <></>
                    }
                </div>

                <div>
                    <Reply />
                </div>
            </div>
        </div>
    )
}

export default Discussion;