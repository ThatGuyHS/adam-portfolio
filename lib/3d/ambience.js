// Ambience with no audio files: the river is filtered noise with a slow sweep
// on the cutoff, and the birds are short pitch-bent sines. Synthesising it costs
// nothing to download and can't fail to load.

export function createAmbience() {
  const AudioContextClass =
    typeof window !== "undefined" &&
    (window.AudioContext || window.webkitAudioContext);
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);

  // --- river -----------------------------------------------------------
  const seconds = 4;
  const buffer = context.createBuffer(
    1,
    context.sampleRate * seconds,
    context.sampleRate
  );
  const channel = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < channel.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02; // brown-ish noise: closer to water
    channel[i] = last * 3.5;
  }

  const river = context.createBufferSource();
  river.buffer = buffer;
  river.loop = true;

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.6;

  const sweep = context.createOscillator();
  sweep.frequency.value = 0.07;
  const sweepDepth = context.createGain();
  sweepDepth.gain.value = 320;
  sweep.connect(sweepDepth).connect(filter.frequency);

  const riverGain = context.createGain();
  riverGain.gain.value = 0.5;

  river.connect(filter).connect(riverGain).connect(master);
  river.start();
  sweep.start();

  // --- birds -----------------------------------------------------------
  let birdTimer = null;
  const chirp = () => {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const base = 1500 + Math.random() * 1400;

    osc.type = "sine";
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.exponentialRampToValueAtTime(base * 1.7, now + 0.07);
    osc.frequency.exponentialRampToValueAtTime(base * 0.9, now + 0.16);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + 0.25);

    birdTimer = setTimeout(chirp, 2500 + Math.random() * 7000);
  };
  birdTimer = setTimeout(chirp, 3000);

  return {
    setMuted(muted) {
      if (!muted && context.state === "suspended") context.resume();
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(muted ? 0 : 0.32, now, 0.5);
    },
    dispose() {
      clearTimeout(birdTimer);
      try {
        river.stop();
        sweep.stop();
      } catch (error) {
        /* already stopped */
      }
      context.close();
    },
  };
}
