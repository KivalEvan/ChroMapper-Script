// deno-lint-ignore-file no-unused-vars
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapEventAttribute } from '../../../types/beatmap/wrapper/event.ts';
import type { IBasicEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';

export const basicEvent: ISchemaContainer<
   IWrapEventAttribute,
   IBasicEventContainer
> = {
   defaultValue: {
      object: {
         b: 0,
         i: 0,
         customData: {},
      },
      data: {
         t: 0,
         i: 0,
         f: 0,
         customData: {},
      },
   } as DeepRequiredIgnore<IBasicEventContainer, 'customData'>,
   serialize(data: IWrapEventAttribute): IBasicEventContainer {
      return {
         object: {
            b: data.time,
            i: 0,
            customData: {},
         },
         data: {
            t: data.type,
            i: data.value,
            f: data.floatValue,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: DeepPartial<IBasicEventContainer> = {}
   ): DeepPartial<IWrapEventAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         type: data.data?.t ?? this.defaultValue.data.t,
         value: data.data?.i ?? this.defaultValue.data.i,
         floatValue: data.data?.f ?? this.defaultValue.data.f,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(data: IWrapEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapEventAttribute): boolean {
      if (data.isLightEvent()) {
         return (
            Array.isArray(data.customData.color) ||
            typeof data.customData.lightID === 'number' ||
            Array.isArray(data.customData.lightID) ||
            typeof data.customData.easing === 'string' ||
            typeof data.customData.lerpType === 'string'
         );
      }
      if (data.isRingEvent()) {
         return (
            typeof data.customData.nameFilter === 'string' ||
            typeof data.customData.rotation === 'number' ||
            typeof data.customData.step === 'number' ||
            typeof data.customData.prop === 'number' ||
            typeof data.customData.speed === 'number' ||
            typeof data.customData.direction === 'number'
         );
      }
      if (data.isLaserRotationEvent()) {
         return (
            typeof data.customData.lockRotation === 'boolean' ||
            typeof data.customData.speed === 'number' ||
            typeof data.customData.direction === 'number'
         );
      }
      return false;
   },
   isNoodleExtensions(data: IWrapEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapEventAttribute): boolean {
      return false;
   },
};
