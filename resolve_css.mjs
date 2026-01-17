
import fs from 'fs';

const path = 'index.css';

try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split(/\r?\n/);
    const newLines = [];
    let state = 'normal'; // normal, head, incoming

    for (const line of lines) {
        if (line.trim().startsWith('<<<<<<< HEAD')) {
            state = 'head';
            continue;
        } else if (line.trim().startsWith('=======')) {
            state = 'incoming';
            continue;
        } else if (line.trim().startsWith('>>>>>>>')) {
            state = 'normal';
            continue;
        }

        if (state === 'normal' || state === 'head') {
            newLines.push(line);
        }
    }

    fs.writeFileSync(path, newLines.join('\n'), 'utf8');
    console.log("Resolved conflicts in index.css");
} catch (err) {
    console.error(err);
}
