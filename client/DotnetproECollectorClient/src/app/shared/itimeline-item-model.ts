import { IFileModel } from './ifile-model';

export interface ITimelineItemModel {
    content: string;
    user: string;
    date: Date;
    type: string;
    files: IFileModel[];
    images: IFileModel[];
    audio: IFileModel;
    video: IFileModel;
}
