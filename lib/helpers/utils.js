/**
 * Generates a Universally unique identifier of length 16.
 * @returns | string | The generated Uuid
 */
export function generateUuidv4() {
    return "xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


export function randIndex(max) {
        // unbiased random from 0..max-1
        const arr = new Uint32Array(1);
        let x;
        const limit = Math.floor(0xffffffff / max) * max;
        do {
            crypto.getRandomValues(arr);
            x = arr[0];
        } while (x >= limit);
        return x % max;
    }