import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacleContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { DeepPartial } from '../../../types/utils.ts';

export const obstacle: ISchemaContainer<
   IWrapObstacleAttribute,
   IObstacleContainer
> = {
   defaultValue: {
      object: {
         b: 0,
         i: 0,
         r: 0,
         customData: {},
      },
      data: {
         x: 0,
         y: 0,
         d: 0,
         w: 0,
         h: 0,
         customData: {},
      },
   } as DeepRequiredIgnore<IObstacleContainer, 'customData'>,
   serialize(data: IWrapObstacleAttribute): IObstacleContainer {
      return {
         object: {
            b: data.time,
            i: 0,
            r: data.laneRotation,
            customData: {},
         },
         data: {
            x: data.posX,
            y: data.posY,
            d: data.duration,
            w: data.width,
            h: data.height,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: DeepPartial<IObstacleContainer> = {}
   ): Partial<IWrapObstacleAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         laneRotation: data.object?.r ?? this.defaultValue.object.r,
         posX: data.data?.x ?? this.defaultValue.data.x,
         posY: data.data?.y ?? this.defaultValue.data.y,
         duration: data.data?.d ?? this.defaultValue.data.d,
         width: data.data?.w ?? this.defaultValue.data.w,
         height: data.data?.h ?? this.defaultValue.data.h,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(data: IWrapObstacleAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapObstacleAttribute): boolean {
      return Array.isArray(data.customData.color);
   },
   isNoodleExtensions(data: IWrapObstacleAttribute): boolean {
      return (
         Array.isArray(data.customData.animation) ||
         typeof data.customData.uninteractable === 'boolean' ||
         Array.isArray(data.customData.localRotation) ||
         typeof data.customData.noteJumpMovementSpeed === 'number' ||
         typeof data.customData.noteJumpStartBeatOffset === 'number' ||
         Array.isArray(data.customData.coordinates) ||
         Array.isArray(data.customData.worldRotation) ||
         Array.isArray(data.customData.size)
      );
   },
   isMappingExtensions(data: IWrapObstacleAttribute): boolean {
      return (
         data.posY < 0 ||
         data.posY > 2 ||
         data.posX <= -1000 ||
         data.posX >= 1000 ||
         data.width <= -1000 ||
         data.width >= 1000 ||
         data.height <= -1000 ||
         data.height >= 1000
      );
   },
};
