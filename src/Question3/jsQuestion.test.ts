import { transformValue } from "./jsQuestion"

it('transforms correctly', () => {
    const initialObject = {
        a: 123,
        b: 'abc',
        c: [1, 2, 3]
    }
    expect(transformValue(initialObject)).toEqual(
        {
            a: 124,
            b: 'abc AE',
            c: [2, 3, 4]
        }
    )
})