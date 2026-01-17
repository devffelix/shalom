
const fs = require('fs');
const path = 'pages/Home.tsx';

try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split(/\r?\n/);
    const newLines = [];
    let state = 'normal'; // normal, head, incoming

    for (let line of lines) {
        if (line.startsWith('<<<<<<< HEAD')) {
            state = 'head';
            continue;
        } else if (line.startsWith('=======')) {
            state = 'incoming';
            continue;
        } else if (line.startsWith('>>>>>>>')) {
            state = 'normal';
            continue;
        }

        if (state === 'normal' || state === 'head') {
            newLines.push(line);
        }
    }

    fs.writeFileSync(path, newLines.join('\n'), 'utf8');
    console.log("Resolved conflicts in Home.tsx");
} catch (err) {
    console.error(err);
}
