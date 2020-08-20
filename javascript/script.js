function getRow(textarea) {
    const txts = textarea.value;
    const strings = txts.split("\n");
    const cursorPoint = textarea.selectionStart;
    let lineStart = 0;
    for (let i = 0; i < strings.length; i++) {
        let lineEnd = lineStart + strings[i].length + 1;
        if (lineStart <= cursorPoint && cursorPoint < lineEnd) {
            let lineIndex = i + 1;
            return lineIndex;
        } else {
            lineStart = lineEnd;
        }
    }
}