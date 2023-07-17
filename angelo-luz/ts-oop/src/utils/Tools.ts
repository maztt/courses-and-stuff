export class Tools { 
    public static randomize(minValue: number, maxValue: number): number {
        return minValue + Math.random() * (maxValue - minValue)
    }
}

// Static methods are available in the entire app