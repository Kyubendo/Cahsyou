import * as fs from 'fs';
import {exec} from "child_process";


export async function editTrace(num: number) {
    const file = fs.readFileSync(`./traces/trace${num}.json`, 'utf8');
    let newFile = JSON.stringify(file);
    newFile = "[" + newFile.replace('"{\\"traceEvents\\":[\\n', '\"')
        .split('],\\"metadata\\":\\n{')[0] + '\"]';
    let jsonFile = JSON.parse(newFile);
    jsonFile = '[' + jsonFile+']';
    fs.writeFileSync(`./traces/trace${num}S.json`, jsonFile);
    exec(`rm ./videos/video${num}.mp4`);
    exec(`devtools-to-video --hideClock -i \'./traces/trace${num}S.json\' -o \'./videos/video${num}.mp4\'`);
    exec(`rm traces/trace${num-1}.json traces/trace${num-1}S.json`);

    fs.writeFileSync(`./traces/input.txt`, `file ../videos/video${num}.mp4\n`, {flag:'a'});
}
export async function clearInputs() {
    fs.writeFileSync(`./traces/input.txt`, '')
}

export async function createFullVideo() {
    exec(`rm ./videos/full.mp4`);
    exec('ffmpeg -f concat -safe 0 -i ./traces/input.txt -vcodec copy -acodec copy ./videos/full.mp4');
}
