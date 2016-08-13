import {EventType} from "./eventtype.enum";
import {Participant} from "./participant.interface";
/**
 * Created by soldi on 31-07-16.
 */
export interface TimeEvent {
    id: string;
    title: string;
    description: string,
    type: EventType,
    participants: Array<Participant>,
    date: string
}
