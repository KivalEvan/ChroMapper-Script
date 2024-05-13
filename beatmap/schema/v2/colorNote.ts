import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { INote } from '../../../types/beatmap/v2/note.ts';
import type { IWrapColorNoteAttribute } from '../../../types/beatmap/wrapper/colorNote.ts';
import { deepCopy } from '../../../utils/misc.ts';

const defaultValue = {
   _time: 0,
   _lineIndex: 0,
   _lineLayer: 0,
   _type: 0,
   _cutDirection: 0,
   _customData: {},
} as Required<INote>;
export const colorNote: ISchemaContainer<IWrapColorNoteAttribute, INote> = {
   defaultValue,
   serialize(data: IWrapColorNoteAttribute): INote {
      return {
         _time: data.time,
         _type: data.color,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _cutDirection: data.direction,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<INote> = {}): Partial<IWrapColorNoteAttribute> {
      return {
         time: data._time ?? defaultValue._time,
         posX: data._lineIndex ?? defaultValue._lineIndex,
         posY: data._lineLayer ?? defaultValue._lineLayer,
         color: (data._type ?? defaultValue._type) as 0,
         direction: data._cutDirection ?? defaultValue._cutDirection,
         customData: deepCopy(
            data._customData ?? defaultValue._customData,
         ),
      };
   },
   isValid(_: IWrapColorNoteAttribute) {
      return true;
   },
   isChroma(data: IWrapColorNoteAttribute): boolean {
      return (
         Array.isArray(data.customData._color) ||
         typeof data.customData._disableSpawnEffect === 'boolean'
      );
   },
   isNoodleExtensions(data: IWrapColorNoteAttribute): boolean {
      return (
         Array.isArray(data.customData._animation) ||
         typeof data.customData._cutDirection === 'number' ||
         typeof data.customData._disableNoteGravity === 'boolean' ||
         typeof data.customData._disableNoteLook === 'boolean' ||
         typeof data.customData._fake === 'boolean' ||
         Array.isArray(data.customData._flip) ||
         typeof data.customData._interactable === 'boolean' ||
         Array.isArray(data.customData._localRotation) ||
         typeof data.customData._noteJumpMovementSpeed === 'number' ||
         typeof data.customData._noteJumpStartBeatOffset === 'number' ||
         Array.isArray(data.customData._position) ||
         Array.isArray(data.customData._rotation)
      );
   },
   isMappingExtensions(_: IWrapColorNoteAttribute) {
      return false;
   },
};