import React from 'react';
import { IDiscussion } from '../models/model';

interface props{
    discussion:IDiscussion
}

const Discussion:React.FC<props>=({discussion})=>{

    const like=()=>{
        
    }

    return(
        <div>
            <div>
                {discussion.user.name}
            </div>
            <div>
                {discussion.date}
            </div>
            <div>
                {discussion.text}
            </div>
            <div>
                {discussion.likes}
            </div>
            <div>
                ""
            </div>
        </div>
    )
}

export default Discussion;