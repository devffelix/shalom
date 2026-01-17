
import fs from 'fs';

const path = 'pages/Landing.tsx';

try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split(/\r?\n/);

    // We want to keep lines up to 1463 (which is index 1462)
    // and potentially the last closing line if needed, 
    // but the component logic before 1463 already has a return and closing brace.
    // Let's check lines 1460-1463 again in our thought process.
    // 1462:         </div>
    // 1463:     );
    // 1464:     const navigate = useNavigate();

    // I will truncate at 1463 and append a '};' and export.

    const newLines = lines.slice(0, 1463);
    newLines.push('};');
    newLines.push('');
    newLines.push('export default Landing;');

    fs.writeFileSync(path, newLines.join('\n'), 'utf8');
    console.log("Successfully removed redundant code block from Landing.tsx");
} catch (err) {
    console.error(err);
}
