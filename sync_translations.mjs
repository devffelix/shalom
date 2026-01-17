
import fs from 'fs';

const ptPath = 'i18n/pt.ts';
const enPath = 'i18n/en.ts';
const esPath = 'i18n/es.ts';

function extractObject(content, varName) {
    const regex = new RegExp(`const ${varName} = ({[\\s\\S]*?});`, 'm');
    const match = content.match(regex);
    if (!match) return null;
    try {
        // Simple extraction of keys by looking for "key: value" or "key: ["
        const objText = match[1];
        return objText;
    } catch (e) {
        return null;
    }
}

function syncObj(ptObjText, targetObjText) {
    // This is a naive sync: find keys in pt that aren't in target and add them.
    // Better: split by lines, look for keys.
    const ptKeys = [];
    const ptLines = ptObjText.split('\n');
    const targetLines = targetObjText.split('\n');

    const keyRegex = /^\s*([a-zA-Z0-9]+):\s*/;

    const ptKeyMap = {};
    ptLines.forEach(line => {
        const m = line.match(keyRegex);
        if (m) ptKeyMap[m[1]] = line;
    });

    const targetKeyMap = {};
    targetLines.forEach(line => {
        const m = line.match(keyRegex);
        if (m) targetKeyMap[m[1]] = line;
    });

    // We want to reconstruct targetObjText keeping existing translations but adding missing keys from PT
    const resultLines = [];
    let indent = '  ';

    // We follow PT order for simplicity or just append? 
    // Let's follow PT order to ensure structure matches.
    ptLines.forEach(line => {
        const m = line.match(keyRegex);
        if (m) {
            const key = m[1];
            if (targetKeyMap[key]) {
                resultLines.push(targetKeyMap[key]);
            } else {
                // Missing key! Add PT line (maybe with a TODO or just the PT text)
                resultLines.push(line + ' // TODO: Translate');
            }
        } else {
            // Braces, comments, empty lines
            if (line.trim() === '{' || line.trim() === '};' || line.trim() === '}') {
                resultLines.push(line);
            }
        }
    });

    return resultLines.join('\n');
}

function processFile(targetPath, ptContent, targetContent) {
    const vars = ['Landing', 'Home', 'Worship', 'Journey', 'Trails', 'Settings', 'Kids'];
    let newContent = targetContent;

    const ptPrefix = 'pt';
    const targetPrefix = targetPath.includes('en.ts') ? 'en' : 'es';

    vars.forEach(v => {
        const ptVar = ptPrefix + v;
        const targetVar = targetPrefix + v;

        const ptObj = extractObject(ptContent, ptVar);
        const targetObj = extractObject(targetContent, targetVar);

        if (ptObj && targetObj) {
            const synced = syncObj(ptObj, targetObj);
            const regex = new RegExp(`const ${targetVar} = {[\\s\\S]*?};`, 'm');
            newContent = newContent.replace(regex, `const ${targetVar} = ${synced};`);
        }
    });

    // Also handle the main export object if it has missing keys
    const ptExport = extractObject(ptContent, 'pt');
    const targetExportName = targetPath.includes('en.ts') ? 'en' : 'es';
    const targetExport = extractObject(targetContent, targetExportName);

    if (ptExport && targetExport) {
        const synced = syncObj(ptExport, targetExport);
        const regex = new RegExp(`export const ${targetExportName} = {[\\s\\S]*?};`, 'm');
        newContent = newContent.replace(regex, `export const ${targetExportName} = ${synced};`);
    }

    fs.writeFileSync(targetPath, newContent, 'utf8');
}

try {
    const ptContent = fs.readFileSync(ptPath, 'utf8');
    const enContent = fs.readFileSync(enPath, 'utf8');
    const esContent = fs.readFileSync(esPath, 'utf8');

    processFile(enPath, ptContent, enContent);
    processFile(esPath, ptContent, esContent);

    console.log("Successfully synced translation files.");
} catch (err) {
    console.error(err);
}
