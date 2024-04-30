// deno-lint-ignore-file no-explicit-any
import type { ModType } from '../../types/beatmap/shared/modCheck.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type {
   IWrapObstacle,
   IWrapObstacleAttribute,
} from '../../types/beatmap/wrapper/obstacle.ts';
import type { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc.ts';
import { LINE_COUNT } from '../shared/constants.ts';
import { GridObject } from './abstract/gridObject.ts';

export class Obstacle extends GridObject implements IWrapObstacle {
   static schema: Record<number, ISchemaContainer<IWrapObstacleAttribute>> = {};
   static defaultValue: IWrapObstacleAttribute = {
      time: 0,
      posX: 0,
      posY: 0,
      width: 0,
      height: 0,
      duration: 0,
      laneRotation: 0,
      customData: {},
      _deprData: {},
   };

   static create(...data: Partial<IWrapObstacleAttribute>[]): Obstacle[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapObstacleAttribute> = {}) {
      super();
      this.time = data.time ?? Obstacle.defaultValue.time;
      this.posX = data.posX ?? Obstacle.defaultValue.posX;
      this.posY = data.posY ?? Obstacle.defaultValue.posY;
      this.width = data.width ?? Obstacle.defaultValue.width;
      this.height = data.height ?? Obstacle.defaultValue.height;
      this.duration = data.duration ?? Obstacle.defaultValue.duration;
      this.laneRotation = data.laneRotation ?? Obstacle.defaultValue.laneRotation;
      this.customData = deepCopy(data.customData ?? Obstacle.defaultValue.customData);
      this._deprData = deepCopy(data._deprData ?? Obstacle.defaultValue._deprData);
   }
   static fromJSON(data: Record<string, any>, version: number): Obstacle {
      return new this(Obstacle.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (Obstacle.schema[version || 0]?.serialize(this) || this.toJSON()) as T;
   }
   toJSON(): IWrapObstacleAttribute {
      return {
         time: this.time,
         posX: this.posX,
         posY: this.posY,
         width: this.width,
         height: this.height,
         duration: this.duration,
         laneRotation: this.laneRotation,
         customData: deepCopy(this.customData),
         _deprData: deepCopy(this._deprData),
      };
   }

   duration: IWrapObstacle['duration'] = 0;
   width: IWrapObstacle['width'] = 0;
   height: IWrapObstacle['height'] = 0;

   setDuration(value: this['duration']): this {
      this.duration = value;
      return this;
   }
   setWidth(value: this['width']): this {
      this.width = value;
      return this;
   }
   setHeight(value: this['height']): this {
      this.height = value;
      return this;
   }

   mirror(_flipAlt?: boolean, _flipNoodle?: boolean): this {
      this.posX = LINE_COUNT - 1 - (this.posX + this.width - 1);
      return this;
   }

   getPosition(_type?: ModType): Vector2 {
      return [this.posX - 2, this.posY - 0.5];
   }

   // FIXME: there are a lot more other variables
   isInteractive(_type?: ModType): boolean {
      return (
         (this.posX < 0 && this.width > 1 - this.posX) ||
         (this.posX === 0 && this.width > 1) ||
         this.posX === 1 ||
         this.posX === 2
      );
   }

   isLonger(compareTo: IWrapObstacle, prevOffset = 0, _type?: ModType): boolean {
      return this.time + this.duration > compareTo.time + compareTo.duration + prevOffset;
   }

   hasZero(): boolean {
      return this.duration === 0 || this.width === 0 || this.height === 0;
   }

   hasNegative(): boolean {
      return this.posY < 0 || this.duration < 0 || this.width < 0 || this.height < 0;
   }

   isValid(): boolean {
      return !this.isMappingExtensions() && !this.hasZero() && !this.hasNegative();
   }
}
