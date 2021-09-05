import {MessageBoxData} from "../components/MessageBox";
import {Fish, FishId, Metadata} from "@actyx/pond";
import {ChatMessageEvent, ChatMessageEventType, MessageTag} from "./message-submit";
import {LikeEvent, LikeEventType, LikeTag} from "./like-submit";

export const Last20Messages = (userName: string): Fish<MessageBoxData[], ChatMessageEvent | LikeEvent> => {
    return {
        // Note that name of the fish changed!
        fishId: FishId.of("Messages", `last20forUser${userName}`, 0),
        initialState: [],
        where: MessageTag.or(LikeTag),
        onEvent: (state: MessageBoxData[], event: ChatMessageEvent | LikeEvent, metadata: Metadata) => {

            if (event.eventType === ChatMessageEventType) {
                state.push({
                    id: event.id,
                    name: event.name,
                    message: event.message,
                    dateString: metadata.timestampAsDate().toLocaleTimeString('de-DE'),
                    likedFrom: [] as string[]
                });
                return state.splice(-20);
            } else if (event.eventType === LikeEventType) {
                const messageToLike = state.find((m) => m.id === event.id)
                if (messageToLike) {
                    if(!messageToLike.likedFrom.includes(event.userName)){
                        messageToLike.likedFrom.push(event.userName);
                    } else {
                        messageToLike.likedFrom = messageToLike.likedFrom.filter((l) => l !== event.userName);
                    }
                }
            }
            return state;
        }
    }
};