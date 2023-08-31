import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IoDownload } from 'react-icons/io5/index.js';
import { download } from 'fitool';

import styles from './index.module.scss';
import { ControlsWrapper } from '../ControlsWrapper/index.js';
import { Button } from '../Button/index.js';

interface ImagePreviewProps {
  file?: File;
}

interface Position {
  x: number;
  y: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const panOffsetRef = useRef<Position>({ x: 0, y: 0 });

  const [panning, setPanning] = useState(false);
  const [scale, setScale] = useState(1);
  const [imageOffset, setImageOffset] = useState<Position>({ x: 0, y: 0 });

  const resetScale = useCallback(() => {
    const wrapperRect = wrapperRef.current!.getBoundingClientRect();

    const height = imageRef.current!.naturalHeight;
    const width = imageRef.current!.naturalWidth;
    const scale = Math.max(
      Math.min(wrapperRect.width / width, wrapperRect.height / height, 1),
      0.5,
    );

    setImageOffset({
      x: (wrapperRect.width - width * scale) / 2,
      y: (wrapperRect.height - height * scale) / 2,
    });
    setScale(scale);
  }, [setScale, setImageOffset]);

  useEffect(() => {
    const onResize = () => {
      resetScale();
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [resetScale]);

  const url = useMemo(
    () => (file ? URL.createObjectURL(file) : undefined),
    [file],
  );

  if (!url || !file?.type.startsWith('image/')) {
    return null;
  }

  const zoom = (e: React.WheelEvent) => {
    const wrapperRect = wrapperRef.current!.getBoundingClientRect();
    const step = Math.sign(e.deltaY) * (scale * -0.1);

    let newScale = scale + step;
    if (newScale < 0.5) newScale = 0.5;
    if (newScale > 3) newScale = 3;

    const scaleRatio = newScale / scale;

    setImageOffset({
      x:
        (e.clientX - wrapperRect.left) * (1 - scaleRatio) +
        imageOffset.x * scaleRatio,
      y:
        (e.clientY - wrapperRect.top) * (1 - scaleRatio) +
        imageOffset.y * scaleRatio,
    });
    setScale(newScale);
  };

  const pan = (e: React.PointerEvent) => {
    if (!panning) return;

    setImageOffset({
      x: panOffsetRef.current.x + e.clientX,
      y: panOffsetRef.current.y + e.clientY,
    });
  };

  const endPanning = () => {
    setPanning(false);
  };

  return (
    <ControlsWrapper
      className={styles.flex}
      controls={
        <>
          {url && (
            <Button
              icon={<IoDownload />}
              title="Download"
              onClick={() => download(url, 'preview.jpg')}
            />
          )}
        </>
      }
    >
      <div
        className={styles.preview}
        ref={wrapperRef}
        onWheel={zoom}
        onPointerMove={pan}
        onPointerDown={e => {
          panOffsetRef.current = {
            x: imageOffset.x - e.clientX,
            y: imageOffset.y - e.clientY,
          };
          setPanning(true);
        }}
        onPointerUp={endPanning}
        onPointerLeave={endPanning}
        onDoubleClick={resetScale}
      >
        <img
          src={url}
          ref={imageRef}
          draggable={false}
          onLoad={() => {
            resetScale();
          }}
          style={{
            transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${scale}) `,
          }}
        />
      </div>
    </ControlsWrapper>
  );
};
