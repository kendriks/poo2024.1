class Lead {
    private thickness: number;
    private hardness: string;
    private size: number;
    
    
    public constructor(thickness: number, hardness: string, size: number) {
        this.thickness = thickness;
        this.hardness = hardness;
        this.size = size;
    }

    public usagePerSheet(): number {
        if (this.hardness == "HB") {
            return 1;
        } else if (this.hardness == "2B") {
            return 2;
        } else if (this.hardness == "4B") {
            return 4;
        } else if (this.hardness == "6B") {
            return 6;
        } else {
            return 0;
        }
    }

    public toString(): string {
        return `${this.thickness}:${this.hardness}:${this.size}`;
    }
    
    public getThickness(): number {
        return this.thickness;
    }

    public getSize(): number {
        return this.size;
    }

    public getHardness(): string {
        return this.hardness;
    }

    public setSize(value: number): void {
         this.size = value;
    }

    public setHardness(value: string): void {
        this.hardness = value;
    }

    public setThickness(value: number): void {
        this.thickness = value;
    }
}

export { Lead };
