const openBraces = ["{", "(", "["];
const closeBraces = ["}", ")", "]"];
function braces(values) {
    console.log("values", values);
    let result = [];
    values.map((arr) => {
        if (arr.length % 2 != 0) {
            result.push("NO");
        }
        else {
            let isSame = true;
            for (let i = 0; i < arr.length / 2; i++) {
                if (openBraces.includes(arr[i])) {
                    let index = openBraces.indexOf(arr[i]);
                    let closingBracket = closeBraces[index];
                    if (arr[i + 1] === closingBracket || arr[arr.length - i]) {
                        continue;
                    }
                    else {
                        isSame = false;
                        break;
                    }
                }
                if (isSame) {
                    result.push("YES");
                }
                else {
                    result.push("NO");
                }
            }
        }
    });
    console.log("result", result);
}
braces(["[]", "({[]})"]);
//# sourceMappingURL=index.js.map