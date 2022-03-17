/** Beatmap difficulty custom data interface for BPM Change.
 * ```ts
 * _time: float,
 * _BPM: float,
 * _beatsPerBar: int,
 * _metronomeOffset: float
 * ```
 */
export interface IBPMChange {
    _time: number;
    _bpm?: never;
    _BPM: number;
    _beatsPerBar: number;
    _metronomeOffset: number;
}

/** Beatmap difficulty custom data interface for MediocreMapper BPM Change.
 * ```ts
 * _time: float,
 * _bpm: float,
 * _beatsPerBar: int,
 * _metronomeOffset: float
 * ```
 */
export interface IBPMChangeOld {
    _time: number;
    _bpm: number;
    _BPM: never;
    _beatsPerBar: number;
    _metronomeOffset: number;
}

/**
 * ```ts
 * _newTime: float
 * ```
 * @extends IBPMChange
 */
export interface IBPMChangeTime extends IBPMChange {
    _newTime: number;
}
