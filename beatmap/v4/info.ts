import { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import { IInfo, IInfoDifficulty } from '../../types/beatmap/v4/info.ts';
import { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import { WrapInfo, WrapInfoDifficulty } from '../wrapper/info.ts';
import { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import { LooseAutocomplete } from '../../types/utils.ts';
import { GenericFileName } from '../../types/beatmap/shared/filename.ts';
import { deepCopy } from '../../utils/misc.ts';
import {
   IWrapInfo,
   IWrapInfoAudio,
   IWrapInfoColorScheme,
   IWrapInfoDifficultyAttribute,
   IWrapInfoSong,
} from '../../types/beatmap/wrapper/info.ts';
import { hexToRgba, toColorObject } from '../../utils/colors.ts';
import { colorToHex } from '../../utils/colors.ts';

/** Difficulty beatmap class object. */
export class Info extends WrapInfo<IInfo> {
   readonly version = '4.0.0' as const;

   contentChecksum = '';
   song: IWrapInfoSong = {
      title: '',
      subTitle: '',
      author: '',
   };
   audio: IWrapInfoAudio = {
      checksum: '',
      filename: '',
      duration: 0,
      audioDataFilename: '',
      bpm: 0,
      previewStartTime: 0,
      previewDuration: 0,
   };
   songPreviewFilename = '';
   coverImageFilename = '';
   environmentNames: EnvironmentAllName[];
   colorSchemes: IWrapInfoColorScheme[];
   difficulties: InfoDifficulty[] = [];

   constructor(data: Partial<IInfo> = {}) {
      super();

      this.contentChecksum = data.contentChecksum || '';
      this.song.author = data.song?.author || '';
      this.song.title = data.song?.title || '';
      this.song.subTitle = data.song?.subTitle || '';

      this.audio.checksum = data.audio?.songChecksum || '';
      this.audio.filename = data.audio?.songFilename || '';
      this.audio.duration = data.audio?.songDuration || 0;
      this.audio.audioDataFilename = data.audio?.audioDataFilename || '';
      this.audio.bpm = data.audio?.bpm || 0;
      this.audio.previewStartTime = data.audio?.previewStartTime || 0;
      this.audio.previewDuration = data.audio?.previewDuration || 0;

      this.songPreviewFilename = data.songPreviewFilename || '';
      this.coverImageFilename = data.coverImageFilename || '';

      this.environmentNames = data.environmentNames?.map((e) => e) ?? [];
      this.colorSchemes = data.colorSchemes?.map((e) => {
         const scheme: IWrapInfoColorScheme = {
            useOverride: !!e.useOverride,
            name: e.colorSchemeName || '',
            saberLeftColor: toColorObject(hexToRgba(e.saberAColor), true),
            saberRightColor: toColorObject(hexToRgba(e.saberBColor), true),
            environment0Color: toColorObject(
               hexToRgba(e.environmentColor0),
               true,
            ),
            environment1Color: toColorObject(
               hexToRgba(e.environmentColor1),
               true,
            ),
            obstaclesColor: toColorObject(hexToRgba(e.obstaclesColor), true),
            environment0ColorBoost: toColorObject(
               hexToRgba(e.environmentColor0Boost),
               true,
            ),
            environment1ColorBoost: toColorObject(
               hexToRgba(e.environmentColor1Boost),
               true,
            ),
         };
         if (e.environmentColorW) {
            scheme.environmentWColor = toColorObject(
               hexToRgba(e.environmentColorW),
               true,
            );
         }
         if (e.environmentColorWBoost) {
            scheme.environmentWColorBoost = toColorObject(
               hexToRgba(e.environmentColorWBoost),
               true,
            );
         }
         return scheme;
      }) ?? [];
      this.customData = deepCopy(data.customData ?? {});

      this.difficulties = (data.difficultyBeatmaps ?? []).map(
         (d) => new InfoDifficulty(d),
      );
   }

   static create(data: Partial<IInfo> = {}): Info {
      return new this(data);
   }

   toJSON(): Required<IInfo> {
      return {
         version: this.version,
         contentChecksum: this.contentChecksum,
         song: {
            author: this.song.author,
            title: this.song.title,
            subTitle: this.song.subTitle,
         },
         audio: {
            songChecksum: this.audio.checksum,
            songFilename: this.audio.filename,
            songDuration: this.audio.duration,
            audioDataFilename: this.audio.audioDataFilename,
            bpm: this.audio.bpm,
            previewStartTime: this.audio.previewStartTime,
            previewDuration: this.audio.previewDuration,
         },
         songPreviewFilename: this.songPreviewFilename,
         coverImageFilename: this.coverImageFilename,
         environmentNames: this.environmentNames.map((e) => e),
         colorSchemes: this.colorSchemes.map((e) => {
            const cs: Required<IInfo>['colorSchemes'][number] = {
               useOverride: e.useOverride,
               colorSchemeName: e.name,
               saberAColor: colorToHex(e.saberLeftColor),
               saberBColor: colorToHex(e.saberRightColor),
               environmentColor0: colorToHex(e.environment0Color),
               environmentColor1: colorToHex(e.environment1Color),
               obstaclesColor: colorToHex(e.obstaclesColor),
               environmentColor0Boost: colorToHex(e.environment0ColorBoost),
               environmentColor1Boost: colorToHex(e.environment1ColorBoost),
            };
            if (e.environmentWColor) {
               cs.environmentColorW = colorToHex(e.environmentWColor);
            }
            if (e.environmentWColorBoost) {
               cs.environmentColorWBoost = colorToHex(e.environmentWColorBoost);
            }
            return cs;
         }),
         difficultyBeatmaps: this.difficulties.map((d) => d.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<IInfo['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IInfo['customData']>) {
      this._customData = value;
   }

   addMap(data: Partial<IInfoDifficulty>): this;
   addMap(data: Partial<IWrapInfoDifficultyAttribute>): this;
   addMap(
      data: Partial<IWrapInfoDifficultyAttribute> & Partial<IInfoDifficulty>,
   ): this {
      this.difficulties.push(new InfoDifficulty(data));
      return this;
   }

   listMap(): [CharacteristicName, InfoDifficulty][] {
      return super.listMap() as [CharacteristicName, InfoDifficulty][];
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}

export class InfoDifficulty extends WrapInfoDifficulty<IInfoDifficulty> {
   characteristic: CharacteristicName;
   difficulty: DifficultyName;
   filename: LooseAutocomplete<GenericFileName>;
   lightshowFilename: LooseAutocomplete<GenericFileName>;
   authors = { mappers: [], lighters: [] };
   njs: number;
   njsOffset: number;
   colorSchemeId: number;
   environmentId: number;

   constructor(data: Partial<IInfoDifficulty>) {
      super();

      this.characteristic = data.characteristic ?? 'Standard';
      this.difficulty = data.difficulty ?? 'Easy';
      this.filename = data.beatmapDataFilename ?? 'UnnamedFile.dat';
      this.lightshowFilename = data.lightshowDataFilename ?? 'UnnamedFile.dat';
      this.njs = data.noteJumpMovementSpeed ?? 0;
      this.njsOffset = data.noteJumpStartBeatOffset ?? 0;
      this.colorSchemeId = data.beatmapColorSchemeIdx ?? 0;
      this.environmentId = data.environmentNameIdx ?? 0;
      this.customData = deepCopy(data.customData ?? {});
   }

   static create(data: Partial<IInfoDifficulty>) {
      return new this(data);
   }

   toJSON(): Required<IInfoDifficulty> {
      return {
         characteristic: this.characteristic,
         difficulty: this.difficulty,
         beatmapAuthors: {
            mappers: [...this.authors.mappers],
            lighters: [...this.authors.lighters],
         },
         environmentNameIdx: this.environmentId,
         beatmapColorSchemeIdx: this.colorSchemeId,
         noteJumpMovementSpeed: this.njs,
         noteJumpStartBeatOffset: this.njsOffset,
         lightshowDataFilename: this.lightshowFilename,
         beatmapDataFilename: this.filename,
         customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<IInfoDifficulty['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IInfoDifficulty['customData']>) {
      this._customData = value;
   }

   copyColorScheme(id: number, info: IWrapInfo): this;
   copyColorScheme(colorScheme: IWrapInfoColorScheme): this;
   copyColorScheme(id: IWrapInfoColorScheme | number, info?: IWrapInfo): this {
      if (typeof id === 'number') {
         if (info!.colorSchemes.length < id) {
            return this;
         }
         const colorScheme = info!.colorSchemes[id];
         return this.copyColorScheme(colorScheme);
      }

      this.customData._colorLeft = Object.entries(id.saberLeftColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._colorRight = Object.entries(id.saberRightColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorLeft = Object.entries(
         id.environment0Color,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorRight = Object.entries(
         id.environment1Color,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorLeftBoost = Object.entries(
         id.environment0ColorBoost,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._envColorRightBoost = Object.entries(
         id.environment1ColorBoost,
      ).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      this.customData._obstacleColor = Object.entries(id.obstaclesColor).reduce(
         (p, v) => {
            if (v[0] !== 'a') p[v[0] as 'r'] = v[1];
            return p;
         },
         { r: 0, g: 0, b: 0 },
      );
      return this;
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}
