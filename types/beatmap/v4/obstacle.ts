import { IGrid } from './grid.ts';
import { ICustomDataBase } from '../shared/custom/customData.ts';

export interface IObstacle extends IGrid {
   /** Duration `<float>` of obstacle.*/
   d?: number;
   /**
    * Width `<int>` of obstacle.
    *
    * **RANGE:** `none`
    */
   w?: number;
   /**
    * Height `<int>` of obstacle.
    * ```ts
    * 1 -> Short
    * 2 -> Moderate
    * 3 -> Crouch
    * 4 -> Tall
    * 5 -> Full
    * ```
    *
    * **RANGE:** `1-5`
    */
   h?: number;
   customData?: ICustomDataBase;
}