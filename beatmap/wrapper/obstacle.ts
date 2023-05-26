import { ModType } from '../../types/beatmap/shared/modCheck.ts';
import { IWrapObstacle } from '../../types/beatmap/wrapper/obstacle.ts';
import { Vector2 } from '../../types/vector.ts';
import { LINE_COUNT } from '../shared/constants.ts';
import { WrapGridObject } from './gridObject.ts';

/** Obstacle beatmap class object. */
export abstract class WrapObstacle<T extends Record<keyof T, unknown>> extends WrapGridObject<T>
    implements IWrapObstacle<T> {
    protected _duration!: IWrapObstacle['duration'];
    protected _width!: IWrapObstacle['width'];
    protected _height!: IWrapObstacle['height'];

    abstract get duration(): IWrapObstacle['duration'];
    abstract set duration(value: IWrapObstacle['duration']);
    abstract get width(): IWrapObstacle['width'];
    abstract set width(value: IWrapObstacle['width']);
    abstract get height(): IWrapObstacle['height'];
    abstract set height(value: IWrapObstacle['height']);

    setDuration(value: IWrapObstacle['duration']) {
        this.duration = value;
        return this;
    }
    setWidth(value: IWrapObstacle['width']) {
        this.width = value;
        return this;
    }
    setHeight(value: IWrapObstacle['height']) {
        this.height = value;
        return this;
    }

    mirror() {
        this.posX = LINE_COUNT - 1 - (this.posX + this.width - 1);
        return this;
    }

    getPosition(_type?: ModType): Vector2 {
        return [this.posX - 2, this.posY - 0.5];
    }

    // FIXME: there are a lot more other variables
    isInteractive() {
        return (
            (this.posX < 0 && this.width > 1 - this.posX) ||
            (this.posX === 0 && this.width > 1) ||
            this.posX === 1 ||
            this.posX === 2
        );
    }

    isLonger(compareTo: IWrapObstacle, prevOffset = 0): boolean {
        return this.time + this.duration > compareTo.time + compareTo.duration + prevOffset;
    }

    hasZero() {
        return this.duration === 0 || this.width === 0 || this.height === 0;
    }

    hasNegative() {
        return this.posY < 0 || this.duration < 0 || this.width < 0 || this.height < 0;
    }

    isValid(): boolean {
        return !this.isMappingExtensions() && !this.hasZero() && !this.hasNegative();
    }
}
