export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    do {
        const m = Math.floor(lo + (hi - lo) / 2);
        const v = haystack[m]

        if (v === needle){
          return true
        } else if (v > needle){
          hi = m
        }else {
          lo = m + 1 // we add +1 because we assume that v !=== needle wich is v is not a mid point then we take 1 step
        }

    } while (lo < hi);

    return false;
}
