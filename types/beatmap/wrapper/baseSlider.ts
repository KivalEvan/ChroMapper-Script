// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseNote, IWrapBaseNoteAttribute } from './baseNote.ts';

export interface IWrapBaseSliderAttribute extends IWrapBaseNoteAttribute {
   /** Tail beat time `<float>` of base arc. */
   tailTime: number;
   /**
    * Tail position x `<int>` of base arc.
    * ```ts
    * 0 -> Outer Left
    * 1 -> Middle Left
    * 2 -> Middle Right
    * 3 -> Outer Right
    * ```
    *
    * **RANGE:** `none`
    */
   tailPosX: number;
   /**
    * Tail position y `<int>` of base arc.
    * ```ts
    * 0 -> Bottom row
    * 1 -> Middle row
    * 2 -> Top row
    * ```
    *
    * **RANGE:** `0-2`
    */
   tailPosY: number;
   /** V4 features only. */
   tailLaneRotation: number;
}

export interface IWrapBaseSlider<T extends { [key: string]: any } = IWrapBaseSliderAttribute>
   extends IWrapBaseNote<T>, IWrapBaseSliderAttribute {
   setDirection(value: number): this;
   setTailTime(value: number): this;
   setTailPosX(value: number): this;
   setTailPosY(value: number): this;
   setTailLaneRotation(value: number): this;
}
