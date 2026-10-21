/**
 * Audio Engine: Web Audio API Synthesizer & Speech Synthesis for Kids' English Learning
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmTimer: number | null = null;
  private isBgmPlaying: boolean = false;
  private bgmStep: number = 0;
  private sfxMuted: boolean = false;
  private bgmMuted: boolean = false;
  private currentVolume: number = 0.25;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.bgmGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.bgmGain.gain.setValueAtTime(this.bgmMuted ? 0 : this.currentVolume, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(this.sfxMuted ? 0 : 0.6, this.ctx.currentTime);

      this.bgmGain.connect(this.ctx.destination);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- Background Music: Cheerful Kid Marimba & Ukulele Arpeggios ---
  // A joyful C major pentatonic / diatonic pattern (C4, E4, G4, A4, C5, D5, E5)
  private playBgmNote(freq: number, duration: number, type: OscillatorType = 'triangle') {
    if (!this.ctx || !this.bgmGain || this.bgmMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft marimba-like attack & decay
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.35, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Audio node cleanup
    }
  }

  public toggleBgm(): boolean {
    this.initContext();
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public startBgm() {
    this.initContext();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // Upbeat, cute elementary melody sequence (Frequencies in Hz)
    // C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392.0, A4: 440.0, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3
    const melody = [
      { f: 523.3, bass: 261.6, dur: 0.22 }, // C5 + C4
      { f: 659.3, bass: 329.6, dur: 0.18 }, // E5
      { f: 587.3, bass: 261.6, dur: 0.22 }, // D5
      { f: 523.3, bass: 392.0, dur: 0.22 }, // C5 + G4
      { f: 440.0, bass: 220.0, dur: 0.25 }, // A4 + A3
      { f: 523.3, bass: 261.6, dur: 0.20 }, // C5
      { f: 392.0, bass: 196.0, dur: 0.35 }, // G4 + G3
      { f: 0,     bass: 0,     dur: 0.12 }, // rest
      { f: 440.0, bass: 220.0, dur: 0.22 }, // A4
      { f: 523.3, bass: 261.6, dur: 0.20 }, // C5
      { f: 587.3, bass: 293.7, dur: 0.22 }, // D5
      { f: 659.3, bass: 329.6, dur: 0.28 }, // E5
      { f: 587.3, bass: 392.0, dur: 0.22 }, // D5 + G4
      { f: 523.3, bass: 261.6, dur: 0.45 }, // C5 resolve
      { f: 0,     bass: 0,     dur: 0.20 }, // rest
    ];

    const tick = () => {
      if (!this.isBgmPlaying) return;
      const step = melody[this.bgmStep % melody.length];
      if (step.f > 0) {
        this.playBgmNote(step.f, step.dur, 'sine');
      }
      if (step.bass > 0) {
        this.playBgmNote(step.bass, step.dur * 1.2, 'triangle');
      }
      this.bgmStep++;
      const nextDelay = (step.dur + 0.08) * 1000;
      this.bgmTimer = window.setTimeout(tick, nextDelay);
    };

    tick();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public setBgmVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmMuted ? 0 : this.currentVolume, this.ctx.currentTime);
    }
  }

  public toggleMute(): { bgmMuted: boolean; sfxMuted: boolean } {
    this.bgmMuted = !this.bgmMuted;
    this.sfxMuted = this.bgmMuted;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmMuted ? 0 : this.currentVolume, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxMuted ? 0 : 0.6, this.ctx.currentTime);
    }
    return { bgmMuted: this.bgmMuted, sfxMuted: this.sfxMuted };
  }

  public getStatus() {
    return {
      isPlaying: this.isBgmPlaying,
      isMuted: this.bgmMuted,
      volume: this.currentVolume,
    };
  }

  // --- Sound Effects ---
  public playClick() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignored
    }
  }

  public playLetterSnap() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.07);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignored
    }
  }

  public playCorrect() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    // Joyful chime C5 -> E5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      window.setTimeout(() => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.36);
      }, i * 90);
    });
  }

  public playWrong() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    // Cartoon boing / descending pitch
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Ignored
    }
  }

  public playCardFlip() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignored
    }
  }

  public playVictoryFanfare() {
    if (this.sfxMuted) return;
    this.initContext();
    // Victory fanfare: C - G - C - E - G - C
    const melody = [
      { f: 523.25, d: 120 },
      { f: 659.25, d: 120 },
      { f: 783.99, d: 120 },
      { f: 1046.5, d: 450 },
    ];
    let offset = 0;
    melody.forEach((note) => {
      window.setTimeout(() => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now);

        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.d / 1000);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + (note.d / 1000) + 0.05);
      }, offset);
      offset += note.d + 30;
    });
  }

  public playTick() {
    if (this.sfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignored
    }
  }
}

export const sound = new SoundEngine();

// --- Speech Synthesis Phonics & Voice Tutor ---
export function speakWord(text: string, rate: number = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate; // slightly slower for young learners
    utterance.pitch = 1.05; // slightly friendly kid pitch

    const voices = window.speechSynthesis.getVoices();
    // Prefer warm natural English voice
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Samantha') ||
          v.name.includes('Daniel') ||
          v.name.includes('Google US English'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Elementary Phonics Breakdown:
 * Speeds through phonemes or letter blocks, then pronounces the final word
 */
export async function speakPhonicsSequence(phonics: string[], finalWord: string) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  for (let i = 0; i < phonics.length; i++) {
    const chunk = phonics[i];
    await speakWord(chunk, 0.9);
    sound.playLetterSnap();
    await new Promise((r) => setTimeout(r, 220));
  }

  await new Promise((r) => setTimeout(r, 200));
  await speakWord(finalWord, 0.82);
}
