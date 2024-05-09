// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type {
   IWrapLightRotationEvent,
   IWrapLightRotationEventAttribute,
} from '../../types/beatmap/wrapper/lightRotationEvent.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseObject } from './abstract/baseObject.ts';

export class LightRotationEvent extends BaseObject implements IWrapLightRotationEvent {
   static schema: Record<
      number,
      ISchemaContainer<IWrapLightRotationEventAttribute>
   > = {};
   static defaultValue: IWrapLightRotationEventAttribute = {
      time: 0,
      easing: 0,
      loop: 0,
      direction: 0,
      previous: 0,
      rotation: 0,
      customData: {},
   };

   static create(
      ...data: Partial<IWrapLightRotationEventAttribute>[]
   ): LightRotationEvent[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapLightRotationEventAttribute> = {}) {
      super();
      this.time = data.time ?? LightRotationEvent.defaultValue.time;
      this.easing = data.easing ?? LightRotationEvent.defaultValue.easing;
      this.loop = data.loop ?? LightRotationEvent.defaultValue.loop;
      this.direction = data.direction ?? LightRotationEvent.defaultValue.direction;
      this.previous = data.previous ?? LightRotationEvent.defaultValue.previous;
      this.rotation = data.rotation ?? LightRotationEvent.defaultValue.rotation;
      this.customData = deepCopy(
         data.customData ?? LightRotationEvent.defaultValue.customData,
      );
   }
   static fromJSON(
      data: { [key: string]: any },
      version: number,
   ): LightRotationEvent {
      return new this(LightRotationEvent.schema[version]?.deserialize(data));
   }
   toSchema<T extends { [key: string]: any }>(version?: number): T {
      return (LightRotationEvent.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapLightRotationEventAttribute {
      return {
         time: this.time,
         easing: this.easing,
         loop: this.loop,
         direction: this.direction,
         previous: this.previous,
         rotation: this.rotation,
         customData: deepCopy(this.customData),
      };
   }

   previous: IWrapLightRotationEvent['previous'] = 0;
   easing: IWrapLightRotationEvent['easing'] = 0;
   loop: IWrapLightRotationEvent['loop'] = 0;
   rotation: IWrapLightRotationEvent['rotation'] = 0;
   direction: IWrapLightRotationEvent['direction'] = 0;

   setPrevious(value: this['previous']): this {
      this.previous = value;
      return this;
   }
   setEasing(value: this['easing']): this {
      this.easing = value;
      return this;
   }
   setLoop(value: this['loop']): this {
      this.loop = value;
      return this;
   }
   setRotation(value: this['rotation']): this {
      this.rotation = value;
      return this;
   }
   setDirection(value: this['direction']): this {
      this.direction = value;
      return this;
   }

   isValid(): boolean {
      return (
         (this.previous === 0 || this.previous === 1) &&
         this.easing >= -1 &&
         this.easing <= 103 &&
         (this.loop === 0 || this.loop === 1) &&
         this.direction >= 0 &&
         this.direction <= 2
      );
   }
}
