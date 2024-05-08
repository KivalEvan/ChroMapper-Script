// deno-lint-ignore-file no-explicit-any
import type { IWrapBPMEvent, IWrapBPMEventAttribute } from './bpmEvent.ts';
import type { IWrapRotationEvent, IWrapRotationEventAttribute } from './rotationEvent.ts';
import type { IWrapColorNote, IWrapColorNoteAttribute } from './colorNote.ts';
import type { IWrapBombNote, IWrapBombNoteAttribute } from './bombNote.ts';
import type { IWrapObstacle, IWrapObstacleAttribute } from './obstacle.ts';
import type { IWrapArc, IWrapArcAttribute } from './arc.ts';
import type { IWrapChain, IWrapChainAttribute } from './chain.ts';
import type { ICustomDataDifficulty } from './custom/difficulty.ts';
import type { IWrapBaseFile, IWrapBaseFileAttribute } from './baseFile.ts';

export interface IWrapDifficultyAttribute extends IWrapBaseFileAttribute {
   bpmEvents: IWrapBPMEventAttribute[];
   rotationEvents: IWrapRotationEventAttribute[];
   colorNotes: IWrapColorNoteAttribute[];
   bombNotes: IWrapBombNoteAttribute[];
   obstacles: IWrapObstacleAttribute[];
   arcs: IWrapArcAttribute[];
   chains: IWrapChainAttribute[];
   customData: ICustomDataDifficulty;
}

export interface IWrapDifficulty<
   T extends Record<string, any> = IWrapDifficultyAttribute,
> extends Omit<IWrapBaseFile<T>, 'customData'>, IWrapDifficultyAttribute {
   bpmEvents: IWrapBPMEvent[];
   rotationEvents: IWrapRotationEvent[];
   colorNotes: IWrapColorNote[];
   bombNotes: IWrapBombNote[];
   obstacles: IWrapObstacle[];
   arcs: IWrapArc[];
   chains: IWrapChain[];

   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute>[]): this;
   addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): this;
   addColorNotes(...data: Partial<IWrapColorNoteAttribute>[]): this;
   addBombNotes(...data: Partial<IWrapBombNoteAttribute>[]): this;
   addObstacles(...data: Partial<IWrapObstacleAttribute>[]): this;
   addArcs(...data: Partial<IWrapArcAttribute>[]): this;
   addChains(...data: Partial<IWrapChainAttribute>[]): this;
}
