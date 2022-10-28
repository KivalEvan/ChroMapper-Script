import { IWrapEventTypesForKeywords } from './eventTypesForKeywords.ts';

export interface IWrapEventTypesWithKeywords {
    /** Data list of event types with keywords. */
    list: IWrapEventTypesForKeywords[];

    setData(value: IWrapEventTypesWithKeywords['list']): this;
    addData(value: IWrapEventTypesForKeywords): this;
    removeData(value: string): this;
}
