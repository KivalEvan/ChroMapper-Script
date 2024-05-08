// deno-lint-ignore-file no-explicit-any
import type { ICustomDataBase } from '../shared/custom/customData.ts';
import type { ISerializable } from '../shared/serializable.ts';

export interface IWrapBaseItemAttribute {
   /**
    * Custom data `<object>` of beatmap object.
    *
    * This has no type-safety for unsupported data.
    */
   customData: ICustomDataBase;
}

export interface IWrapBaseItem<
   T extends Record<string, any> = IWrapBaseItemAttribute,
> extends ISerializable<T>, IWrapBaseItemAttribute {
   setCustomData(value: this['customData']): this;
   resetCustomData(): this;
   removeCustomData(key: string): this;
   addCustomData(object: this['customData']): this;

   /**
    * Sort beatmap object(s) accordingly.
    *
    * Certain objects may not contain sortable array.
    */
   sort(fn?: (a: this, b: this) => number): this;

   /** Allow for advanced custom function. */
   func(fn: (object: this) => void): this;

   /**
    * Check if object is valid in vanilla game.
    * ```ts
    * if (obj.isValid()) {}
    * ```
    */
   isValid(): boolean;

   /**
    * Check if object has Chroma properties.
    * ```ts
    * if (obj.isChroma()) {}
    * ```
    */
   isChroma(): boolean;

   /**
    * Check if object has Noodle Extensions properties.
    * ```ts
    * if (obj.isNoodleExtensions()) {}
    * ```
    */
   isNoodleExtensions(): boolean;

   /**
    * Check if object has Mapping Extensions properties.
    * ```ts
    * if (obj.isMappingExtensions()) {}
    * ```
    */
   isMappingExtensions(): boolean;
}
