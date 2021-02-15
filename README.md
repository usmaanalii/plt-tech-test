# Coding Kata - Roman Numerals

The purpose of this exercise is not simply to solve the problem; instead, we are interested in how you approach the problem. Please explain your approach, assumptions made, or caveats to your solution.

We are particularly interested in the following:
- Code quality
- Code readability
- Testing

In **javascript** / **typescript** write a class that implements the following interface:

```typescript
interface RomanNumeralConverter {
  convert(n: number): string
}
```

For example, see the following sample inputs and outputs:

| In | Out |
|---:|:---:|
| 1 | “I”  |
| 2 | "II" |
| 3 | "III"|
| 4 | "IV" |
| 5 | “V”  |
| 6 | “VI” |
| 9 | “IX” |
| 10 | “X” |
| 20 | “XX” |
| 60 | “LX” |
| 90 | “XC” |
| 200 | “CC” |
| 3999 | “MMMCMXCIX” |

> Caveat: Only support numbers between 1 and 3999

## Reference Table

| Symbol | Value |
|---|---:|
|I|1|
|V|5|
|X|10|
|L|50|
|C|100|
|D|500|
|M|1000|

## Development notes

- The project is pre-configured to use `jest` but you may use any testing framework you like.
- To use the stock jest testing setup you can run `yarn test` to initiate jest in watch mode.
