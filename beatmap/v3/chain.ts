import { ModType } from '../../types/beatmap/shared/modCheck.ts';
import { IChain } from '../../types/beatmap/v3/chain.ts';
import { IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc.ts';
import { isVector3 } from '../../utils/vector.ts';
import { WrapChain } from '../wrapper/chain.ts';

/** Chain beatmap v3 class object.
 *
 * Also known as burst slider internally.
 */
export class Chain extends WrapChain<Required<IChain>> {
    static default: ObjectReturnFn<Required<IChain>> = {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        tb: 0,
        tx: 0,
        ty: 0,
        sc: 1,
        s: 1,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapChainAttribute<Required<IChain>>>);
    constructor(data: Partial<IChain>);
    constructor(data: Partial<IChain> & Partial<IWrapChainAttribute<Required<IChain>>>);
    constructor(data: Partial<IChain> & Partial<IWrapChainAttribute<Required<IChain>>> = {}) {
        super({
            b: data.time ?? data.b ?? data.tb ?? Chain.default.b,
            c: data.color ?? data.c ?? Chain.default.c,
            x: data.posX ?? data.x ?? Chain.default.x,
            y: data.posY ?? data.y ?? Chain.default.y,
            d: data.direction ?? data.d ?? Chain.default.d,
            tb: data.tailTime ?? data.tb ?? data.b ?? Chain.default.tb,
            tx: data.tailPosX ?? data.tx ?? Chain.default.tx,
            ty: data.tailPosY ?? data.ty ?? Chain.default.ty,
            sc: data.sliceCount ?? data.sc ?? Chain.default.sc,
            s: data.squish ?? data.s ?? Chain.default.s,
            customData: data.customData ?? Chain.default.customData(),
        });
    }

    static create(): Chain[];
    static create(...data: Partial<IWrapChainAttribute<Required<IChain>>>[]): Chain[];
    static create(...data: Partial<IChain>[]): Chain[];
    static create(
        ...data: (Partial<IChain> & Partial<IWrapChainAttribute<Required<IChain>>>)[]
    ): Chain[];
    static create(
        ...data: (Partial<IChain> & Partial<IWrapChainAttribute<Required<IChain>>>)[]
    ): Chain[] {
        const result: Chain[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IChain> {
        return {
            b: this.time,
            c: this.color,
            x: this.posX,
            y: this.posY,
            d: this.direction,
            tb: this.tailTime,
            tx: this.tailPosX,
            ty: this.tailPosY,
            sc: this.sliceCount,
            s: this.squish,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: IChain['b']) {
        this.data.b = value;
    }

    get posX() {
        return this.data.x;
    }
    set posX(value: IChain['x']) {
        this.data.x = value;
    }

    get posY() {
        return this.data.y;
    }
    set posY(value: IChain['y']) {
        this.data.y = value;
    }

    get color() {
        return this.data.c;
    }
    set color(value: IChain['c']) {
        this.data.c = value;
    }

    get direction() {
        return this.data.d;
    }
    set direction(value: IChain['d']) {
        this.data.d = value;
    }

    get tailTime() {
        return this.data.tb;
    }
    set tailTime(value: IChain['tb']) {
        this.data.tb = value;
    }

    get tailPosX() {
        return this.data.tx;
    }
    set tailPosX(value: IChain['tx']) {
        this.data.tx = value;
    }

    get tailPosY() {
        return this.data.ty;
    }
    set tailPosY(value: IChain['ty']) {
        this.data.ty = value;
    }

    get sliceCount() {
        return this.data.sc;
    }
    set sliceCount(value: IChain['sc']) {
        this.data.sc = value;
    }

    get squish() {
        return this.data.s;
    }
    set squish(value: IChain['s']) {
        this.data.s = value;
    }

    get customData(): NonNullable<IChain['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IChain['customData']>) {
        this.data.customData = value;
    }

    mirror(flipColor = true) {
        if (this.customData.coordinates) {
            this.customData.coordinates[0] = -1 - this.customData.coordinates[0];
        }
        if (this.customData.flip) {
            this.customData.flip[0] = -1 - this.customData.flip[0];
        }
        if (this.customData.animation) {
            if (Array.isArray(this.customData.animation.definitePosition)) {
                if (isVector3(this.customData.animation.definitePosition)) {
                    this.customData.animation.definitePosition[0] = -this.customData.animation
                        .definitePosition[0];
                } else {
                    // deno-lint-ignore no-explicit-any
                    this.customData.animation.definitePosition.forEach((dp: any) => {
                        dp[0] = -dp[0];
                    });
                }
            }
            if (Array.isArray(this.customData.animation.offsetPosition)) {
                if (isVector3(this.customData.animation.offsetPosition)) {
                    this.customData.animation.offsetPosition[0] = -this.customData.animation
                        .offsetPosition[0];
                } else {
                    // deno-lint-ignore no-explicit-any
                    this.customData.animation.offsetPosition.forEach((op: any) => {
                        op[0] = -op[0];
                    });
                }
            }
        }
        return super.mirror(flipColor);
    }

    getPosition(type?: ModType): Vector2 {
        switch (type) {
            case 'vanilla':
                return super.getPosition();
            case 'ne':
                if (this.customData.coordinates) {
                    return [this.customData.coordinates[0], this.customData.coordinates[1]];
                }
            /** falls through */
            case 'me':
            default:
                return [
                    (this.posX <= -1000
                        ? this.posX / 1000
                        : this.posX >= 1000
                        ? this.posX / 1000
                        : this.posX) - 2,
                    this.posY <= -1000
                        ? this.posY / 1000
                        : this.posY >= 1000
                        ? this.posY / 1000
                        : this.posY,
                ];
        }
    }

    getAngle(type?: ModType) {
        switch (type) {
            case 'me':
                if (this.direction >= 1000) {
                    return Math.abs(((this.direction % 1000) % 360) - 360);
                }
            /* falls through */
            case 'vanilla':
            case 'ne':
            default:
                return super.getAngle();
        }
    }

    getTailPosition(type?: ModType): Vector2 {
        switch (type) {
            case 'vanilla':
                return super.getTailPosition();
            case 'ne':
                if (this.customData.tailCoordinates) {
                    return [this.customData.tailCoordinates[0], this.customData.tailCoordinates[1]];
                }
            /** falls through */
            case 'me':
            default:
                return [
                    (this.tailPosX <= -1000
                        ? this.tailPosX / 1000
                        : this.tailPosX >= 1000
                        ? this.tailPosX / 1000
                        : this.tailPosX) - 2,
                    this.tailPosY <= -1000
                        ? this.tailPosY / 1000
                        : this.tailPosY >= 1000
                        ? this.tailPosY / 1000
                        : this.tailPosY,
                ];
        }
    }

    isChroma(): boolean {
        return (
            Array.isArray(this.customData.color) ||
            typeof this.customData.spawnEffect === 'boolean' ||
            typeof this.customData.disableDebris === 'boolean'
        );
    }

    isNoodleExtensions(): boolean {
        return (
            Array.isArray(this.customData.animation) ||
            typeof this.customData.disableNoteGravity === 'boolean' ||
            typeof this.customData.disableNoteLook === 'boolean' ||
            typeof this.customData.disableBadCutDirection === 'boolean' ||
            typeof this.customData.disableBadCutSaberType === 'boolean' ||
            typeof this.customData.disableBadCutSpeed === 'boolean' ||
            Array.isArray(this.customData.flip) ||
            typeof this.customData.uninteractable === 'boolean' ||
            Array.isArray(this.customData.localRotation) ||
            typeof this.customData.noteJumpMovementSpeed === 'number' ||
            typeof this.customData.noteJumpStartBeatOffset === 'number' ||
            Array.isArray(this.customData.coordinates) ||
            Array.isArray(this.customData.tailCoordinates) ||
            Array.isArray(this.customData.worldRotation) ||
            typeof this.customData.worldRotation === 'number' ||
            typeof this.customData.link === 'string'
        );
    }
}