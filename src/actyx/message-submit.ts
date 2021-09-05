import {pondPromise} from "./pond-provider.service";
import {Tag} from "@actyx/pond";
const { v4: uuidv4 } = require('uuid');

export const submitMessage = async (name: string, message: string): Promise<void> => {
    const id = uuidv4();
    const tag = MessageTag.withId(id)
        .and(UserTag.withId(name));
    const event: ChatMessageEvent = {
        eventType: ChatMessageEventType,
        id,
        name,
        message
    };
    return (await pondPromise).emit(tag, event).toPromise();
}

export const UserTag = Tag<ChatMessageEvent>("user-tag");
export const MessageTag = Tag<ChatMessageEvent>("message-tag");

export const ChatMessageEventType = "message-event";
export type ChatMessageEvent = {
    eventType: typeof ChatMessageEventType,
    id: string,
    name: string,
    message: string
}
