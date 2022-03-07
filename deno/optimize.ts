import { InfoData } from './beatmap/shared/types/info.ts';
import { DifficultyData as DifficultyDataV2 } from './beatmap/v2/types/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from './beatmap/v3/types/difficulty.ts';
import {
    OptimizeOptions,
    OptimizeOptionsDifficulty,
    OptimizeOptionsInfo,
} from './types.ts';
import { round, Either } from './utils.ts';
import logger from './logger.ts';

// deno-lint-ignore ban-types
const tag = (func: Function) => {
    return `[optimize::${func.name}]`;
};

export const defaultOptionsInfo: Required<OptimizeOptionsInfo> = {
    enabled: true,
    floatTrim: 4,
    stringTrim: true,
    throwError: true,
    removeDuplicate: true,
};
export const defaultOptionsDifficulty: Required<OptimizeOptionsDifficulty> = {
    enabled: true,
    floatTrim: 4,
    stringTrim: true,
    throwError: true,
    optimiseLight: false,
    sort: true,
};

const ignoreRemove = [
    '_notes',
    '_sliders',
    '_events',
    '_obstacles',
    '_waypoints',
    '_difficultyBeatmapSets',
    'basicEventTypesWithKeywords',
];
export const deepClean = (
    // deno-lint-ignore no-explicit-any
    obj: { [key: string | number]: any } | any[],
    options: OptimizeOptions
) => {
    for (const k in obj) {
        // shorten number
        if (typeof obj[k] === 'number') {
            obj[k] = round(obj[k], options.floatTrim);
        }
        // trim that string space
        if (typeof obj[k] === 'string' && options.stringTrim) {
            obj[k] = obj[k].trim();
        }
        // recursion
        if ((typeof obj[k] === 'object' || Array.isArray(obj[k])) && obj[k] !== null) {
            deepClean(obj[k], options);
            // if it's lightID array, sort it
            if (
                k === '_lightID' &&
                Array.isArray(obj[k]) &&
                // deno-lint-ignore no-explicit-any
                obj[k].every((x: any) => typeof x === 'number')
            ) {
                obj[k] = obj[k].sort((a: number, b: number) => a - b);
            }
        }
        // remove empty array/object property
        if (
            !ignoreRemove.includes(k) &&
            ((Array.isArray(obj[k]) && !obj[k].length) ||
                (typeof obj[k] === 'object' &&
                    !Array.isArray(obj[k]) &&
                    JSON.stringify(obj[k]) === '{}'))
        ) {
            delete obj[k];
            continue;
        }
        // throw or remove null
        if (obj[k] === null) {
            if (options.throwError) {
                throw new Error(`null value found in object key ${obj} ${k}.`);
            } else {
                if (Array.isArray(obj)) {
                    logger.error(
                        tag(deepClean),
                        `null value found in array index ${obj} ${k}, defaulting to 0...`
                    );
                    obj[k] = 0;
                } else {
                    logger.error(
                        tag(deepClean),
                        `null value found in object key ${obj} ${k}, deleting property...`
                    );
                    delete obj[k];
                }
            }
        }
    }
};

export const performInfo = (
    info: InfoData,
    options: OptimizeOptionsInfo = { enabled: true }
) => {
    const opt: Required<OptimizeOptionsInfo> = {
        enabled: options.enabled,
        floatTrim: options.floatTrim ?? defaultOptionsInfo.floatTrim,
        stringTrim: options.stringTrim ?? defaultOptionsInfo.stringTrim,
        throwError: options.throwError ?? defaultOptionsInfo.throwError,
        removeDuplicate: options.removeDuplicate ?? defaultOptionsInfo.removeDuplicate,
    };

    if (!opt.enabled) {
        return info;
    }
    logger.info(tag(performInfo), `Optimising info data`);

    logger.debug(tag(performInfo), 'Applying deep clean');
    deepClean(info, opt);
    return info;
};

export const performDifficulty = (
    difficulty: Either<DifficultyDataV2, DifficultyDataV3>,
    options: OptimizeOptionsDifficulty = { enabled: true }
) => {
    const opt: Required<OptimizeOptionsDifficulty> = {
        enabled: options.enabled,
        floatTrim: options.floatTrim ?? defaultOptionsDifficulty.floatTrim,
        stringTrim: options.stringTrim ?? defaultOptionsDifficulty.stringTrim,
        throwError: options.throwError ?? defaultOptionsDifficulty.throwError,
        optimiseLight: options.optimiseLight ?? defaultOptionsDifficulty.optimiseLight,
        sort: options.sort ?? defaultOptionsDifficulty.sort,
    };

    if (!opt.enabled) {
        return difficulty;
    }
    logger.info(tag(performDifficulty), `Optimising difficulty data`);

    logger.debug(tag(performDifficulty), 'Applying deep clean');
    deepClean(difficulty, opt);

    if (opt.sort) {
        logger.debug(tag(performDifficulty), 'Sorting objects');
        const sortPrec = Math.pow(10, opt.floatTrim);
        difficulty.colorNotes?.sort(
            (a, b) =>
                Math.round((a.b + Number.EPSILON) * sortPrec) / sortPrec -
                    Math.round((b.b + Number.EPSILON) * sortPrec) / sortPrec ||
                a.x - b.x ||
                a.y - b.y
        );
        difficulty.obstacles?.sort((a, b) => a.b - b.b);
        difficulty.bpmEvents?.sort((a, b) => a.b - b.b);
    }

    return difficulty;
};
