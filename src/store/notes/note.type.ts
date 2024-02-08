export enum NotePriorities {
    LOW, MIDDLE, HIGH
}

export interface Note {
    id: string;
    tag: string[];
    priority: number;
    background: string;
    title: string;
    content: string;
    data: string;
    time: number;
    pinned: boolean;
}