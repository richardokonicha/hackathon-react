interface ValueProps {
    a: number;
    b: string;
    c: Array<number>
}

export const transformValue = (val: ValueProps): ValueProps => {
    const value = {
        a: val.a + 1,
        b: val.b + ' AE',
        c: val.c.map(x => x + 1)
    }
    return value;
}