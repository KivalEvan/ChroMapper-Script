import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';

/** Light color event box group beatmap v3 class object. */
export class LightColorEventBoxGroup extends WrapLightColorEventBoxGroup<
    Required<ILightColorEventBoxGroup>,
    Required<ILightColorEventBox>,
    Required<ILightColorBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightColorEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
                Required<ILightColorEventBoxGroup>,
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightColorEventBoxGroup>);
    constructor(
        data:
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super();

        this._time = data.time ?? data.b ?? LightColorEventBoxGroup.default.b;
        this._id = data.id ?? data.g ?? LightColorEventBoxGroup.default.g;
        this._boxes = (
            (data.boxes as ILightColorEventBox[]) ??
                (data.e as unknown as ILightColorEventBox[]) ??
                LightColorEventBoxGroup.default.e()
        ).map((obj) => new LightColorEventBox(obj));
        this._customData = data.customData ?? LightColorEventBoxGroup.default.customData();
    }

    static create(): LightColorEventBoxGroup[];
    static create(
        ...data: DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
                Required<ILightColorEventBoxGroup>,
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightColorEventBoxGroup[];
    static create(...data: DeepPartial<ILightColorEventBoxGroup>[]): LightColorEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightColorEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBoxGroup>
            & DeepPartial<
                IWrapLightColorEventBoxGroupAttribute<
                    Required<ILightColorEventBoxGroup>,
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightColorEventBoxGroup[] {
        const result: LightColorEventBoxGroup[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightColorEventBoxGroup> {
        return {
            b: this.time,
            g: this.id,
            e: this.boxes.map((e) => e.toJSON()),
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this._time;
    }
    set time(value: ILightColorEventBoxGroup['b']) {
        this._time = value;
    }

    get id() {
        return this._id;
    }
    set id(value: ILightColorEventBoxGroup['g']) {
        this._id = value;
    }

    get boxes() {
        return this._boxes as LightColorEventBox[];
    }
    set boxes(value: LightColorEventBox[]) {
        this._boxes = value;
    }

    get customData(): NonNullable<ILightColorEventBoxGroup['customData']> {
        return this.customData;
    }
    set customData(value: NonNullable<ILightColorEventBoxGroup['customData']>) {
        this.customData = value;
    }

    isValid(): boolean {
        return this.id >= 0;
    }
}
