import { IDifficulty } from '../../types/beatmap/v4/difficulty.ts';
import { BombNote } from './bombNote.ts';
import { Chain } from './chain.ts';
import { ColorNote } from './colorNote.ts';
import { Obstacle } from './obstacle.ts';
import { Arc } from './arc.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import logger from '../../logger.ts';
import { DummySpecialEventsKeywordFilters } from './_specialEventsKeywordFilters.ts';
import { IBombNoteContainer } from '../../types/beatmap/v4/container.ts';
import { IObstacleContainer } from '../../types/beatmap/v4/container.ts';
import { IArcContainer } from '../../types/beatmap/v4/container.ts';
import { IColorNoteContainer } from '../../types/beatmap/v4/container.ts';
import { IChainContainer } from '../../types/beatmap/v4/container.ts';

function tag(name: string): string[] {
   return ['beatmap', 'v4', 'difficulty', name];
}

/** Difficulty beatmap v4 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   readonly version = '4.0.0';

   bpmEvents: never[] = [];
   rotationEvents: never[] = [];
   colorNotes: ColorNote[];
   bombNotes: BombNote[];
   obstacles: Obstacle[];
   arcs: Arc[];
   chains: Chain[];
   waypoints: never[] = [];
   basicEvents: never[] = [];
   colorBoostEvents: never[] = [];
   lightColorEventBoxGroups: never[] = [];
   lightRotationEventBoxGroups: never[] = [];
   lightTranslationEventBoxGroups: never[] = [];
   fxEventBoxGroups: never[] = [];
   eventTypesWithKeywords: DummySpecialEventsKeywordFilters =
      new DummySpecialEventsKeywordFilters();
   useNormalEventsAsCompatibleEvents = false;

   constructor(data: Partial<IDifficulty> = {}) {
      super();

      this.colorNotes = (data.content?.colorNotes ?? []).map(
         (obj) => new ColorNote(obj, data.content?.colorNotesData[obj.i || 0]),
      );
      this.bombNotes = (data.content?.bombNotes ?? []).map(
         (obj) => new BombNote(obj, data.content?.bombNotesData[obj.i || 0]),
      );
      this.obstacles = (data.content?.obstacles ?? []).map(
         (obj) => new Obstacle(obj, data.content?.obstaclesData[obj.i || 0]),
      );
      this.arcs = (data.content?.arcs ?? []).map(
         (obj) =>
            new Arc(
               obj,
               data.content?.arcsData[obj.ai || 0],
               data.content?.colorNotesData[obj.hi || 0],
               data.content?.colorNotesData[obj.ti || 0],
            ),
      );
      this.chains = (data.content?.chains ?? []).map(
         (obj) =>
            new Chain(
               obj,
               data.content?.colorNotesData[obj.i || 0],
               data.content?.chainsData[obj.ci || 0],
            ),
      );
      this.customData = deepCopy(data.content?.customData ?? {});
   }

   static create(data: Partial<IDifficulty> = {}): Difficulty {
      return new this(data);
   }

   toJSON(): Required<IDifficulty> {
      const json: Required<IDifficulty> = {
         version: this.version,
         contentChecksum: '',
         content: {
            colorNotes: [],
            bombNotes: [],
            obstacles: [],
            chains: [],
            arcs: [],
            colorNotesData: [],
            bombNotesData: [],
            obstaclesData: [],
            chainsData: [],
            arcsData: [],
            customData: deepCopy(this.customData),
         },
      };
      for (const obj of this.colorNotes) {
         const jsonObj = obj.toJSON();
         json.content.colorNotes.push(jsonObj.object);
         jsonObj.object.i = json.content.colorNotesData.length;
         json.content.colorNotesData.push(jsonObj.data);
      }
      for (const obj of this.bombNotes) {
         const jsonObj = obj.toJSON();
         json.content.bombNotes.push(jsonObj.object);
         jsonObj.object.i = json.content.bombNotesData.length;
         json.content.bombNotesData.push(jsonObj.data);
      }
      for (const obj of this.obstacles) {
         const jsonObj = obj.toJSON();
         json.content.obstacles.push(jsonObj.object);
         jsonObj.object.i = json.content.obstaclesData.length;
         json.content.obstaclesData.push(jsonObj.data);
      }
      for (const obj of this.arcs) {
         const jsonObj = obj.toJSON();
         json.content.arcs.push(jsonObj.object);
         jsonObj.object.ai = json.content.arcsData.length;
         json.content.arcsData.push(jsonObj.data);
         jsonObj.object.hi = json.content.colorNotesData.length;
         json.content.colorNotesData.push(jsonObj.headData);
         jsonObj.object.ti = json.content.colorNotesData.length;
         json.content.colorNotesData.push(jsonObj.tailData);
      }
      for (const obj of this.chains) {
         const jsonObj = obj.toJSON();
         json.content.chains.push(jsonObj.object);
         jsonObj.object.i = json.content.chainsData.length;
         json.content.chainsData.push(jsonObj.chainData);
      }
      return json;
   }

   get customData(): NonNullable<IDifficulty['content']['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IDifficulty['content']['customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): this {
      this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(ColorNote, obj, keepRef));
      this.bombNotes = this.bombNotes.map((obj) => this.createOrKeep(BombNote, obj, keepRef));
      this.arcs = this.arcs.map((obj) => this.createOrKeep(Arc, obj, keepRef));
      this.chains = this.chains.map((obj) => this.createOrKeep(Chain, obj, keepRef));
      this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));

      return this;
   }

   addBpmEvents(..._: never[]): this {
      logger.tWarn(
         tag('addBpmEvents'),
         'BPM Event does not exist in difficulty V4',
      );
      return this;
   }

   addRotationEvents(..._: never[]): this {
      logger.tWarn(
         tag('addRotationEvents'),
         'Rotation Event does not exist in difficulty V4',
      );
      return this;
   }

   addColorNotes(
      ...data: Partial<IWrapColorNoteAttribute<IColorNoteContainer>>[]
   ): this;
   addColorNotes(
      ...data: Partial<IWrapColorNoteAttribute<IColorNoteContainer>>[]
   ): this {
      for (const obj of data) this.colorNotes.push(new ColorNote(obj));
      return this;
   }

   addBombNotes(
      ...data: Partial<IWrapBombNoteAttribute<IBombNoteContainer>>[]
   ): this;
   addBombNotes(
      ...data: Partial<IWrapBombNoteAttribute<IBombNoteContainer>>[]
   ): this {
      for (const obj of data) this.bombNotes.push(new BombNote(obj));
      return this;
   }

   addObstacles(
      ...data: Partial<IWrapObstacleAttribute<IObstacleContainer>>[]
   ): this;
   addObstacles(
      ...data: Partial<IWrapObstacleAttribute<IObstacleContainer>>[]
   ): this {
      for (const obj of data) this.obstacles.push(new Obstacle(obj));
      return this;
   }

   addArcs(...data: Partial<IWrapArcAttribute<IArcContainer>>[]): this;
   addArcs(...data: Partial<IWrapArcAttribute<IArcContainer>>[]): this {
      for (const obj of data) this.arcs.push(new Arc(obj));
      return this;
   }

   addChains(...data: Partial<IWrapChainAttribute<IChainContainer>>[]): this;
   addChains(...data: Partial<IWrapChainAttribute<IChainContainer>>[]): this {
      for (const obj of data) this.chains.push(new Chain(obj));
      return this;
   }

   addWaypoints(..._: never[]): this {
      logger.tWarn(
         tag('addWaypoints'),
         'Waypoint does not exist in difficulty V4',
      );
      return this;
   }

   addBasicEvents(..._: never[]): this {
      logger.tWarn(
         tag('addBasicEvents'),
         'Basic Event does not exist in difficulty V4',
      );
      return this;
   }

   addColorBoostEvents(..._: never[]): this {
      logger.tWarn(
         tag('addColorBoostEvents'),
         'Color Boost Event does not exist in difficulty V4',
      );
      return this;
   }

   addLightColorEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightColorEventBoxGroups'),
         'Light Color Event Box Group does not exist in difficulty V4',
      );
      return this;
   }

   addLightRotationEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightRotationEventBoxGroups'),
         'Light Rotation Event Box Group does not exist in difficulty V4',
      );
      return this;
   }

   addLightTranslationEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightTranslationEventBoxGroups'),
         'Light Translation Event Box Group does not exist in difficulty V4',
      );
      return this;
   }

   addFxEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addFxEventBoxGroups'),
         'FX Event Box Group does not exist in difficulty V4',
      );
      return this;
   }

   isValid(): boolean {
      return (
         this.colorNotes.every((obj) => this.checkClass(ColorNote, obj)) ||
         this.bombNotes.every((obj) => this.checkClass(BombNote, obj)) ||
         this.arcs.every((obj) => this.checkClass(Arc, obj)) ||
         this.chains.every((obj) => this.checkClass(Chain, obj)) ||
         this.obstacles.every((obj) => this.checkClass(Obstacle, obj))
      );
   }
}