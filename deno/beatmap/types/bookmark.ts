import { ColorArray } from './colors.ts';

/**
 * Beatmap difficulty custom data interface for Bookmark.
 *
 *     _time: float,
 *     _name: string,
 */
export interface Bookmark {
    _time: number;
    _name: string;
    _color?: ColorArray;
}