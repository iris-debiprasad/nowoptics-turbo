import React from "react";
import { IUseTimelinerReturn, ProgressType } from "../../hooks/use-timeline";
import { formatVideoTime } from "../../video-player.utils";
import styles from "./timeline.module.scss";

const PERCENTAGE_CONVERTER_VALUE = 100;

interface Props extends IUseTimelinerReturn {
  videoElement: HTMLVideoElement;
  player: { isVideoPlaying: boolean; play: () => void };
}

/**
 * Progress bar component, known as timeline, this component allows the user to seek an specific part of an video,
 * display the video progress and the shadow (when hovering into the timeline, another bar appears to indicate where
 * the hover is, detecting the posible future progress of the video when clicked as well)
 */
export const Timeline = ({
  data,
  methods,
  player,
  videoElement,
}: Props): JSX.Element => {
  const [seek, setSeek] = React.useState<string | null>(null);
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  const getNewTimelinePercent = (clientX: number): number => {
    if (!progressBarRef.current) return 0;

    const progressRect: DOMRect =
      progressBarRef.current.getBoundingClientRect();
    const progressBarWidthReachedOnHover: number = clientX - progressRect.x;
    const progressBarMaxWidth: number = progressRect.right - progressRect.x;
    const timelinePercent: number =
      (progressBarWidthReachedOnHover / progressBarMaxWidth) *
      PERCENTAGE_CONVERTER_VALUE;
    // This will make sure that the values do not go beyond than 100 or below than 0
    const limitedTimelinePercent: number = Math.min(
      Math.max(0, timelinePercent),
      PERCENTAGE_CONVERTER_VALUE,
    );

    return limitedTimelinePercent;
  };

  const handleSeekTimePreview = (clientX: number): void => {
    const currentTimelinePosition =
      getNewTimelinePercent(clientX) / PERCENTAGE_CONVERTER_VALUE;
    const seekValue: string = (
      currentTimelinePosition * (videoElement.duration || 0)
    ).toFixed(2);
    setSeek(seekValue);
  };

  const setTimelineShadow = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    handleSeekTimePreview(event.clientX);
    const timelinePercent = getNewTimelinePercent(event.clientX);
    methods.updateProgress(ProgressType.SHADOW, timelinePercent);
  };

  const resetShadowProgress = (): void =>
    methods.updateProgress(ProgressType.SHADOW, 0);

  const updateTimeline = (): void => {
    const isSeeking: boolean = data.progress.shadow !== 0;
    if (!isSeeking) return;

    const currentVideoTime: number =
      (videoElement.duration * data.progress.shadow) /
      PERCENTAGE_CONVERTER_VALUE;
    videoElement.currentTime = currentVideoTime;

    player.isVideoPlaying && player.play(); // Sometimes, updating timeline could pause the video, this fixes the issue
    methods.updateProgress(ProgressType.ACTUAL, data.progress.shadow);
    setSeek(null);
    resetShadowProgress();
  };

  return (
    <section className={styles.container} aria-label="Timeline">
      <div className={styles.element} />

      <div
        className={styles.progressbar}
        onClick={updateTimeline}
        onMouseLeave={resetShadowProgress}
        onMouseMove={setTimelineShadow}
        ref={progressBarRef}
        role="progressbar"
        style={
          {
            "--video-actual-progress": data.progress.actual,
            "--video-shadow-progress": data.progress.shadow,
          } as React.CSSProperties
        }
      />

      {data.progress.shadow > 0 && (
        <span
          className={styles["time-preview"]}
          style={
            {
              "--video-shadow-progress": data.progress.shadow,
            } as React.CSSProperties
          }
        >
          {formatVideoTime(seek)}
        </span>
      )}
    </section>
  );
};
