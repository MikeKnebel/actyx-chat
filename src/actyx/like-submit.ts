import {pondPromise} from "./pond-provider.service";
import {Tag} from "@actyx/pond";
import {userData} from "../user-identifier";

export const submitLike = async (id: string): Promise<void> => {
    if(!id){
        return;
    }
    const event: LikeEvent = {
        eventType: LikeEventType,
        userName: userData.userName,
        id
    };
    return (await pondPromise).emit(LikeTag, event).toPromise();
}

export const LikeTag = Tag<LikeEvent>("like-tag");

export const LikeEventType = "like-event";
export type LikeEvent = {
    eventType: typeof LikeEventType,
    userName: string,
    id: string
}
