
import React, { useEffect, useRef } from 'react';

interface YouTubePlayer {
  destroy: () => void;
  setSize: (width: number, height: number) => void;
}

interface YouTubePlayerOptions {
  width?: number;
  height?: number;
  videoId: string;
  playerVars?: {
    autoplay?: number;
    controls?: number;
    rel?: number;
    enablejsapi?: number;
    origin?: string;
  };
  events?: {
    onStateChange?: (event: { data: number }) => void;
  };
}

interface YouTubeAPI {
  Player: new (
    element: HTMLElement,
    options: YouTubePlayerOptions
  ) => YouTubePlayer;
  PlayerState: {
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface VideoPlayerProps {
  videoUrl: string;
  onEnded?: () => void;
}

let youtubeApiPromise: Promise<YouTubeAPI> | null = null;

const loadYouTubeAPI = (): Promise<YouTubeAPI> => {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();

      if (window.YT?.Player) {
        resolve(window.YT);
      } else {
        youtubeApiPromise = null;
        reject(new Error('A API do YouTube não foi carregada.'));
      }
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;

      script.onerror = () => {
        youtubeApiPromise = null;
        reject(new Error('Não foi possível carregar a API do YouTube.'));
      };

      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onEnded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const onEndedRef = useRef(onEnded);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    const initializePlayer = async () => {
      const match = videoUrl.match(
        /(?:youtube\.com\/embed\/|youtu\.be\/)([^?&/]+)/
      );

      const videoId = match?.[1];
      const container = containerRef.current;

      if (!videoId || !container) return;

      try {
        const YT = await loadYouTubeAPI();

        if (cancelled || !containerRef.current) return;

        const playerElement = document.createElement('div');

        playerElement.style.width = '100%';
        playerElement.style.height = '100%';

        container.replaceChildren(playerElement);

        const width = Math.max(
          1,
          Math.round(container.clientWidth)
        );

        const height = Math.max(
          1,
          Math.round(container.clientHeight)
        );

        const player = new YT.Player(playerElement, {
          width,
          height,
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.ENDED) {
                onEndedRef.current?.();
              }
            },
          },
        });

        if (cancelled) {
          player.destroy();
          return;
        }

        playerRef.current = player;

        resizeObserver = new ResizeObserver(() => {
          if (!containerRef.current || !playerRef.current) return;

          const newWidth = Math.max(
            1,
            Math.round(containerRef.current.clientWidth)
          );

          const newHeight = Math.max(
            1,
            Math.round(containerRef.current.clientHeight)
          );

          playerRef.current.setSize(newWidth, newHeight);
        });

        resizeObserver.observe(container);
      } catch (error) {
        console.error('Erro ao carregar o player do YouTube:', error);

        if (!cancelled && containerRef.current) {
          containerRef.current.replaceChildren();

          const iframe = document.createElement('iframe');

          iframe.src = videoUrl;
          iframe.title = 'Player de vídeo do YouTube';
          iframe.allow =
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
          iframe.allowFullscreen = true;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = '0';

          containerRef.current.appendChild(iframe);
        }
      }
    };

    initializePlayer();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoUrl]);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};

export default VideoPlayer;
