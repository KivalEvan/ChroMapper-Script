import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { IWrapLightColorBaseAttribute } from '../../types/beatmap/wrapper/lightColorBase.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorBase } from '../wrapper/lightColorBase.ts';

/** Light color base beatmap v3 class object. */
export class LightColorBase extends WrapLightColorBase<Required<ILightColorBase>> {
    static default: ObjectReturnFn<Required<ILightColorBase>> = {
        b: 0,
        i: 0,
        c: 0,
        s: 1,
        f: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>);
    constructor(data: Partial<ILightColorBase>);
    constructor(
        data:
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>,
    );
    constructor(
        data:
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>> = {},
    ) {
        super();

        this._time = data.time ?? data.b ?? LightColorBase.default.b;
        this._transition = data.transition ?? data.i ?? LightColorBase.default.i;
        this._color = data.color ?? data.c ?? LightColorBase.default.c;
        this._brightness = data.brightness ?? data.s ?? LightColorBase.default.s;
        this._frequency = data.frequency ?? data.f ?? LightColorBase.default.f;
        this._customData = data.customData ?? LightColorBase.default.customData();
    }

    static create(): LightColorBase[];
    static create(
        ...data: Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>[]
    ): LightColorBase[];
    static create(...data: Partial<ILightColorBase>[]): LightColorBase[];
    static create(
        ...data: (
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>
        )[]
    ): LightColorBase[];
    static create(
        ...data: (
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>
        )[]
    ): LightColorBase[] {
        const result: LightColorBase[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightColorBase> {
        return {
            b: this.time,
            i: this.transition,
            c: this.color,
            s: this.brightness,
            f: this.frequency,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this._time;
    }
    set time(value: ILightColorBase['b']) {
        this._time = value;
    }

    get transition() {
        return this._transition;
    }
    set transition(value: ILightColorBase['i']) {
        this._transition = value;
    }

    get color() {
        return this._color;
    }
    set color(value: ILightColorBase['c']) {
        this._color = value;
    }

    get brightness() {
        return this._brightness;
    }
    set brightness(value: ILightColorBase['s']) {
        this._brightness = value;
    }

    get frequency() {
        return this._frequency;
    }
    set frequency(value: ILightColorBase['f']) {
        this._frequency = value;
    }

    get customData(): NonNullable<ILightColorBase['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<ILightColorBase['customData']>) {
        this._customData = value;
    }
}
