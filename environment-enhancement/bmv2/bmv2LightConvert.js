'use strict';
// WARNING: this script is meant to convert OG BMv2 lightshow to Chroma 2 Environment Enhancement
// if you want to only get environment use bmv2.js OR copy directly from bmv2.dat into difficult _customData
// alternatively, use lightConvert.js to convert your current lightshow to default preset of environment enhancement here
// you may still use this to convert your current lightshow but to your own risk

const fs = require('fs');

const INPUT_FILE = 'DIFFICULTY_FILE_INPUT.dat';
const OUTPUT_FILE = 'DIFFICULTY_FILE_OUTPUT.dat';

// lighting related
const BPM = 128; // set accordingly for proper fade timing
const fadeTimeSecond = 3; // how long it takes till fade out completely
const fadePrecision = 16; // use lower precision for less bloat; higher for better smoothing and response
const flashBrightness = 1.12; // this is alpha value; set at least 1 value
const fadeEasing = (x) => 1 - Math.pow(1 - x, 3); // easeOutCubic

// default color (for no chroma)
const defaultLeftLight = [0.85, 0.08499997, 0.08499997];
const defaultRightLight = [0.1882353, 0.675294, 1];
const defaultLeftLightBoost = [0.85, 0.08499997, 0.08499997];
const defaultRightLightBoost = [0.1882353, 0.675294, 1];

// environment related
const roadGap = 4; // how far between each gap of road
const roadCount = 5; // DO NOT CHANGE IF YOU'VE ALREADY SET LIGHTSHOW FOR THIS WITH PROPS
const roadRepeat = 4; // same as above

// beyond you're on your own
const ENVIRONMENT_PREFIX = 'BigMirrorEnvironment'; // shouldnt be touched, also set env to bigmirror if not

let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._events.sort((a, b) => a._time - b._time);
difficulty._customData = { _environment: [] };
let _events = difficulty._events;
const newEvents = [];
const _environment = difficulty._customData._environment;

if (defaultLeftLight.length < 4) {
    defaultLeftLight.push(1);
}
if (defaultRightLight.length < 4) {
    defaultRightLight.push(1);
}
if (defaultLeftLightBoost.length < 4) {
    defaultLeftLightBoost.push(1);
}
if (defaultRightLightBoost.length < 4) {
    defaultRightLightBoost.push(1);
}

const posAddX = (posArr, x) => {
    let arr = [...posArr];
    arr[0] += x;
    return arr;
};
const posAddY = (posArr, y) => {
    let arr = [...posArr];
    arr[1] += y;
    return arr;
};
const posAddZ = (posArr, z) => {
    let arr = [...posArr];
    arr[2] += z;
    return arr;
};
const posMirrorX = (posArr) => {
    let arr = [...posArr];
    arr[0] = -arr[0];
    return arr;
};

//#region yeet
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Floor(\\.\\[\\d+\\]FloorSetDepth)?$`,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Construction$`,
        _lookupMethod: 'Regex',
        _position: [0, -1.25, -10],
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NearBuilding(Left|Right)$`,
        _lookupMethod: 'Regex',
        _active: false,
    }
);
//#endregion
//#region extra thicc ring
_environment.push({
    _id: `^GameCore\\.\\[\\d+\\]BigTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]NeonTubeBothSidesDirectional(.?\\(\\d+\\))?$`,
    _lookupMethod: 'Regex',
    _scale: [1, 2, 1],
});
//#endregion
//#region road
const centerRoadPos = [1.125, -2.890625, 8];
const centerRoadScale = [0.4375, 0.4375, 0.4375];
const farRoadPos = [3.5625, -2.25, 8];
const farRoadScale = [0.5, 0.265625, 0.5];
for (let i = 0; i < roadCount * roadRepeat; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: centerRoadScale,
            _position: posMirrorX(posAddZ(centerRoadPos, i * roadGap)),
            _rotation: [0, 0, -75],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: centerRoadScale,
            _position: posAddZ(centerRoadPos, i * roadGap),
            _rotation: [0, 0, 75],
        }
    );
}
for (let i = 0; i < roadCount * roadRepeat; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: farRoadScale,
            _position: posMirrorX(posAddZ(farRoadPos, i * roadGap)),
            _rotation: [0, 0, -120],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: farRoadScale,
            _position: posAddZ(farRoadPos, i * roadGap),
            _rotation: [0, 0, 120],
        }
    );
}
//#endregion
//#region road other lights
const farLaneLightPos = [4.4375, -1.625, 0];
const farLaneLightScale = [2, 1, 2];
const midLaneLightPos = [3.5, -2.21875, -255];
const midLaneLightScale = [2.5, 4, 2.5];
const botLaneLightPos = [2.875, -3.29375, -255];
const botLaneLightScale = [2, 4, 2];
const centerLaneLightPos = [1.125, -2.84375, -255];
const centerLaneLightScale = [2.5, 4, 2.5];
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: botLaneLightScale,
        _position: posMirrorX(botLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: botLaneLightScale,
        _position: botLaneLightPos,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLaneLightScale,
        _position: posMirrorX(centerLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLaneLightScale,
        _position: centerLaneLightPos,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _scale: midLaneLightScale,
        _position: posMirrorX(midLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _scale: midLaneLightScale,
        _position: midLaneLightPos,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalFL$`,
        _lookupMethod: 'Regex',
        _scale: farLaneLightScale,
        _position: posMirrorX(farLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalFR$`,
        _lookupMethod: 'Regex',
        _scale: farLaneLightScale,
        _position: farLaneLightPos,
    }
);
//#endregion
//#region yeet center light backtop thing
_environment.push({
    _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser(.?\\(\\d+\\))?.\\[\\d+\\](BottomBoxLight|BottomBakedBloom)$`,
    _lookupMethod: 'Regex',
    _active: false,
});
//#endregion
//#region replace with chad backtop thing
const backTopFarPos = [2.90625, -3.3125, 96];
const backTopFarScale = [1.5, 1, 1.5];
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: backTopFarScale,
            _position: posMirrorX(posAddZ(backTopFarPos, i * 16)),
            _rotation: [60 - i * 5, 0, 195 + i * 6],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: backTopFarScale,
            _position: posAddZ(backTopFarPos, i * 16),
            _rotation: [60 - i * 5, 0, 165 - i * 6],
        }
    );
}
//#endregion
//#region fabled extra light
const extraMirrorLightPos = [6.625, -1.625, 16];
const extraMirrorLightScale = [0.5, 0.5, 0.5];
const extraMirrorLightGap = 4;
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posMirrorX(
                posAddZ(extraMirrorLightPos, i * extraMirrorLightGap)
            ),
            _rotation: [5 + i * 1, 0, 330 + i * 10],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posMirrorX(
                posAddY(posAddZ(extraMirrorLightPos, i * extraMirrorLightGap), -2)
            ),
            _rotation: [-5 - i * 1, 0, 210 - i * 10],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posAddY(
                posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
                -2
            ),
            _rotation: [-5 - i * 1, 0, 150 + i * 10],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
            _rotation: [5 + i * 1, 0, 30 - i * 10],
        }
    );
}
//#endregion

//#region lighting
// convert chroma 1 to chroma 2
function ColorFromInt(rgb) {
    rgb = rgb - 2000000000;
    let red = (rgb >> 16) & 0x0ff;
    let green = (rgb >> 8) & 0x0ff;
    let blue = rgb & 0x0ff;
    return [red / 255, green / 255, blue / 255, 1];
}
let currentColor = {};
for (const ev of _events) {
    let noChromaColor = false;
    if (ev._value >= 2000000000) {
        currentColor[ev._type] = ColorFromInt(ev._value);
    }
    if (!currentColor[ev._type]) {
        noChromaColor = true;
        currentColor[ev._type] =
            ev._value >= 1 && ev._value <= 3 ? defaultRightLight : defaultLeftLight;
    }
    if (ev._value === 4) {
        ev.value = 0;
    }
    if (ev._value !== 0 && !(ev._value >= 2000000000)) {
        if (ev._customData && !ev._customData._color) {
            ev._customData = { _color: currentColor[ev._type] };
        }
        if (!ev._customData) {
            ev._customData = { _color: currentColor[ev._type] };
        }
    }
    if (!(ev._value >= 2000000000)) {
        newEvents.push(ev);
        if (noChromaColor) {
            currentColor[ev._type] = null;
        }
    }
}
difficulty._events = newEvents;

let tempID = [];
for (let i = 0; i < roadRepeat; i++) {
    for (let j = 0; j < 2; j++) {
        tempID.push(17 + j + i * roadCount * 2);
    }
}

const switchType = {
    0: 0,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    10: 4,
    11: 4,
    14: 0,
    15: 0,
};
const typeLightIDMap = {
    0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    4: [11, 12, 13, 14, 15, 16],
    5: tempID,
    6: tempID.map((val) => val + 2),
    7: tempID.map((val) => val + 4),
    10: tempID.map((val) => val + 6),
    11: tempID.map((val) => val + 8),
    14: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
        (val) => val + 20
    ),
    15: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
        (val) => val + 20
    ),
};

function normalize(x, min, max) {
    return max - min > 0 ? (x - min) / (max - min) : 0;
}
function lerp(x, y, a) {
    return x + (y - x) * a;
}

const timeFromFade = (BPM * fadeTimeSecond) / 60;
const maxStep = Math.floor(timeFromFade * fadePrecision);
const isOn = [1, 5];
const isFlash = [2, 6];
const isFade = [3, 7];
const ignoreConversion = [1, 2, 3, 8, 9, 12, 13];
const newerEvents = [];

for (let type = 0; type < 16; type++) {
    for (let i = 0, len = newEvents.length; i < len; i++) {
        const currentEvent = newEvents[i];
        if (currentEvent._type !== type) {
            continue;
        }
        if (ignoreConversion.includes(type)) {
            newerEvents.push(currentEvent);
            continue;
        }
        currentEvent._type = switchType[type];
        if (currentEvent._customData) {
            currentEvent._customData._lightID = typeLightIDMap[type];
        } else {
            currentEvent._customData = { _lightID: typeLightIDMap[type] };
        }
        if (currentEvent._value === 0 || isOn.includes(currentEvent._value)) {
            newerEvents.push(currentEvent);
            continue;
        }
        let wasFlash;
        if (isFlash.includes(currentEvent._value)) {
            wasFlash = true;
            currentEvent._value = currentEvent._value === 2 ? 1 : 5;
        }
        if (isFade.includes(currentEvent._value)) {
            currentEvent._value = currentEvent._value === 3 ? 1 : 5;
        }
        let finalTime;
        for (let j = i + 1; j < len; j++) {
            if (newEvents[j]._type !== type) {
                continue;
            }
            finalTime = Math.min(currentEvent._time + timeFromFade, newEvents[j]._time);
            break;
        }
        const maxCount = Math.floor((finalTime - currentEvent._time) * fadePrecision);
        for (let j = 0; j <= maxCount; j++) {
            let currentColor = [...currentEvent._customData?._color];
            if (!currentColor) {
                newerEvents.push(currentEvent);
                break;
            }
            currentColor[3] = Math.max(
                lerp(flashBrightness, 0, fadeEasing(normalize(j, 0, maxStep))),
                0
            );
            currentEvent._customData._color = currentColor;
            if (j === 0) {
                newerEvents.push(currentEvent);
                continue;
            }
            let stoprightthere;
            if (currentColor[3] < 1 && wasFlash) {
                currentColor[3] = 1;
                stoprightthere = true;
            }
            if (currentColor[3] === 0) {
                currentColor[3] = 0;
                stoprightthere = true;
            }
            const temp = JSON.parse(JSON.stringify(currentEvent));
            temp._time += j / fadePrecision;
            newerEvents.push(temp);
            if (stoprightthere) {
                break;
            }
        }
    }
}

difficulty._events = newerEvents;
//#endregion

// save file
const precision = 4;
const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);
// recursion to deal with number formatting and delete null object but imma keep this name
function deeperDaddy(obj) {
    if (obj) {
        for (const key in obj) {
            if (obj[key] == null || JSON.stringify(obj[key]) === '{}') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] === 'number') {
                obj[key] = parseFloat(
                    Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP
                );
            }
        }
    }
}
deeperDaddy(difficulty);
difficulty._notes.sort(
    (a, b) =>
        parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
);
difficulty._obstacles.sort((a, b) => a._time - b._time);
difficulty._events.sort((a, b) => a._time - b._time);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log('environment enhancement + OG platform lightshow conversion completed');
