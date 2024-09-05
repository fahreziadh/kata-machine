export default function two_crystal_balls(breaks: boolean[]): number {
    // find the jumpAmount or steps the index that we need to check (e.g if the length 144 then the jumpAmount is 12)
    const jmpAmount = Math.floor(Math.sqrt(breaks.length));

    // add initial start jumpAmount
    let i = jmpAmount;

    // find the index with for-loop that i+=jumpAmount (step)
    // when breaks[i] than stop the loop
    for (; i < breaks.length; i += jmpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    // linear search the nearest / shortest true breaks
    for (let j = i-jmpAmount; j < i; j++){
        if(breaks[j]){
           return j
        }
    }

   return -1
}
