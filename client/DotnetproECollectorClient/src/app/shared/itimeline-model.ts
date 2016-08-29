import { ITimelineItemModel } from './itimeline-item-model';

export interface ITimelineModel {
    items: ITimelineItemModel[];
    pageNumber: number;
    pageSize: number;
}
