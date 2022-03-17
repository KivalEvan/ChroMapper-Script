import { ColorArray } from '../shared/colors.ts';

/** Beatmap difficulty custom data interface for Bookmark.
 * ```ts
 * _time: float,
 * _name: string,
 * _color: ColorArray
 * ```
 */
export interface IBookmark {
    _time: number;
    _name: string;
    _color?: ColorArray;
}
