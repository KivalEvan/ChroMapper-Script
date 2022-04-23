export interface ISwingCount {
    left: number[];
    right: number[];
}

export interface ISwingPerSecond {
    count: number;
    total: number;
    peak: number;
    median: number;
}

export interface ISwingAnalysis {
    red: ISwingPerSecond;
    blue: ISwingPerSecond;
    total: ISwingPerSecond;
}