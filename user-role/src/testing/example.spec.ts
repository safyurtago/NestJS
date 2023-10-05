import { sum } from "./example"

test("adds 1+2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3)
})

test("1+2!=5", () => {
    expect(sum(1, 2)).not.toEqual(5)
})

// test('object assignment', () => {
//     const data = {}
//     // const data = {one: 1};
//     // data['two'] = 2;
//     expect(data).toBe({});
//   });



test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });


  test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });