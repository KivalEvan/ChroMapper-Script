// deno-lint-ignore-file no-explicit-any
import type { IWrapWaypoint, IWrapWaypointAttribute } from './waypoint.ts';
import type { IWrapEvent, IWrapEventAttribute } from './event.ts';
import type { IWrapColorBoostEvent, IWrapColorBoostEventAttribute } from './colorBoostEvent.ts';
import type {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from './lightColorEventBoxGroup.ts';
import type {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from './lightRotationEventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from './lightTranslationEventBoxGroup.ts';
import type {
   IWrapEventTypesWithKeywords,
   IWrapEventTypesWithKeywordsAttribute,
} from './eventTypesWithKeywords.ts';
import type { DeepPartial } from '../../utils.ts';
import type { IWrapFxEventBoxGroup, IWrapFxEventBoxGroupAttribute } from './fxEventBoxGroup.ts';
import type { ICustomDataDifficulty } from './custom/difficulty.ts';
import type { IWrapBaseFile, IWrapBaseFileAttribute } from './baseFile.ts';

export interface IWrapLightshowAttribute extends IWrapBaseFileAttribute {
   waypoints: IWrapWaypointAttribute[];
   basicEvents: IWrapEventAttribute[];
   colorBoostEvents: IWrapColorBoostEventAttribute[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroupAttribute[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroupAttribute[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroupAttribute[];
   fxEventBoxGroups: IWrapFxEventBoxGroupAttribute[];
   eventTypesWithKeywords: IWrapEventTypesWithKeywordsAttribute;
   useNormalEventsAsCompatibleEvents: boolean;
   customData: ICustomDataDifficulty;
}

export interface IWrapLightshow<
   T extends Record<string, any> = IWrapLightshowAttribute,
> extends Omit<IWrapBaseFile<T>, 'customData'>, IWrapLightshowAttribute {
   waypoints: IWrapWaypoint[];
   basicEvents: IWrapEvent[];
   colorBoostEvents: IWrapColorBoostEvent[];
   lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   fxEventBoxGroups: IWrapFxEventBoxGroup[];
   eventTypesWithKeywords: IWrapEventTypesWithKeywords;

   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;

   addWaypoints(...data: Partial<IWrapWaypointAttribute>[]): this;
   addBasicEvents(...data: Partial<IWrapEventAttribute>[]): this;
   addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute>[]): this;
   addLightColorEventBoxGroups(
      ...data: DeepPartial<IWrapLightColorEventBoxGroupAttribute>[]
   ): this;
   addLightRotationEventBoxGroups(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute>[]
   ): this;
   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): this;
   addFxEventBoxGroups(
      ...data: DeepPartial<IWrapFxEventBoxGroupAttribute>[]
   ): this;
}
