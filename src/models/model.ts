
interface IUser {
    name: string;
    avatar?: string;
}
interface IComment {
    id: number;
    date: number; 
    user: IUser;
    text: string;
    likes: number;
    iLikedIt: boolean;
}
interface IDiscussion extends IComment {
    replies: IComment[];
}
interface IProps {
    comments: IComment[];
}

type AddLike=(id:number,obj:IComment)=>IComment

type CalculateDiffTime=(nowtime:number,time:number)=>string
type ReplaceAvatarName=(name:string)=>string


export type {IComment,IDiscussion,IProps,IUser,CalculateDiffTime,ReplaceAvatarName,AddLike}