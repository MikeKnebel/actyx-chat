import {Fish, FishId, Metadata} from "@actyx/pond";
import {ChatMessageEvent, ChatMessageEventType, MessageTag} from "./message-submit";
import {LikeEvent, LikeEventType, LikeTag} from "./like-submit";

export const KnownUsers: Fish<string[], ChatMessageEvent | LikeEvent> = {
    fishId: FishId.of("KnownUsers", `KnownUsers`, 0),
    initialState: [],
    where: MessageTag.or(LikeTag),
    onEvent: (state: string[], event: ChatMessageEvent | LikeEvent) => {
        let userName: string | undefined = undefined;
        if(event.eventType === ChatMessageEventType){
            userName = event.name;
        } else if (event.eventType === LikeEventType) {
            userName = event.userName;
        }

        if(userName && !state.includes(userName)){
            state.push(userName);
        }
        return state;
    }
};