import { IFileModel } from './ifile-model';

export interface ITimelineItemModel {
    id: number;
    content: string;
    user: string;
    date: Date;
    link: string;
    documents: IFileModel[];
}
