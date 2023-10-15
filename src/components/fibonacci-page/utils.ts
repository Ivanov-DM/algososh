export const fib = (n: number): Array<number> => {
    const fibSequence: Array<number> = [1, 1];
    for (let i = 2; i < n + 1; i++) {
        fibSequence.push(fibSequence[i - 2] + fibSequence[i - 1])
    }
    return fibSequence
}