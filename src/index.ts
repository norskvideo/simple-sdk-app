import {
  Norsk,
  selectVideo,
  selectAudio,
  VideoEncodeRung,
  selectVideoRendition,
} from "@norskvideo/norsk-sdk";

const ladderRungs: VideoEncodeRung[] = [
  {
    name: "ultra-low",
    width: 640,
    height: 320,
    codec: {
      type: 'x264',
      keyFrameIntervalMin: 50,
      keyFrameIntervalMax: 50,
      profile: 'main',
      level: 3.1
    },
  },
];

export async function main() {
  const norsk = await Norsk.connect();

  const encode = await norsk.processor.transform.videoEncode({
    id: `ladder`,
    rungs: ladderRungs,
  });
  const file = await norsk.output.fileTs({
    id: "output",
    fileName: "/mnt/output.ts"
  })

  let connected = false;
  const _srt = await norsk.input.srt({
    id: `input`,
    host: "0.0.0.0",
    port: 5001,
    sourceName: "source",
    mode: "listener",
    onConnection: () => {
      if (!connected) {
        connected = true;
        return { accept: true, sourceName: "source" }
      } else return { accept: false }
    },
    onConnectionStatusChange: (s) => {
      if (s == "disconnected") {
        connected = false;
      }
    },
    onCreate: async (node) => {
      encode.subscribe(
        [{ source: node, sourceSelector: selectVideo }]
      );
      file.subscribe([
        { source: encode, sourceSelector: selectVideoRendition("ultra-low") },
        { source: node, sourceSelector: selectAudio }
      ]);
    },
  });
}

main();
