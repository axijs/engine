import type {TimeContext} from '@axi-engine/utils';

type TickerCallback = (ctx: TimeContext) => void;


export class Ticker {
  private lastTime = 0;
  private totalTimeMs = 0;
  private animationFrameId = 0;
  private isRunning = false;
  private targetFPS = 60;
  private readonly onTick: TickerCallback;

  public timeScale = 1.0;

  constructor(onTick: TickerCallback) {
    this.onTick = onTick;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
  }

  private loop = (currentTime: number) => {
    if (!this.isRunning) return;

    // time from last frame
    const rawDelta = currentTime - this.lastTime;
    this.lastTime = currentTime;

    const deltaMs = rawDelta * this.timeScale;

    // Scalar value, deltaTime: 1.0 = speed in 60 FPS (16.66ms)
    const deltaTime = deltaMs / (1000 / this.targetFPS);

    this.totalTimeMs += deltaMs;

    this.onTick({
      deltaMs,
      deltaTime,
      totalTime: this.totalTimeMs,
      timeScale: this.timeScale
    });

    this.animationFrameId = requestAnimationFrame(this.loop);
  }
}
