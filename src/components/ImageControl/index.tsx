import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { CarType } from '../../../types';

type ImageControlProps = {
  item: CarType;
};

const ImageControl = (props: ImageControlProps) => {
  const { item } = props;
  const images = item.images.image;
  const size = Math.min(images.length, 4);

  const [carouselIndexes, setCarouselIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const touchDebounce = useRef(false);

  const currentIndex = carouselIndexes[item.unique_id] || 0;

  const handlePrev = (id: number, imagesLength: number) => {
    setCarouselIndexes((prev) => ({
      ...prev,
      [id]: prev[id]
        ? (prev[id] - 1 + imagesLength) % imagesLength
        : imagesLength - 1,
    }));
  };

  const handleNext = (id: number, imagesLength: number) => {
    setCarouselIndexes((prev) => ({
      ...prev,
      [id]:
        prev[id] !== undefined
          ? (prev[id] + 1) % imagesLength
          : 1 % imagesLength,
    }));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition(event.touches[0].clientX);
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>,
    id: number,
    imagesLength: number
  ) => {
    if (touchDebounce.current) return;

    const touchDown = touchPosition;
    if (touchDown === null) return;
    const currentTouch = event.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (Math.abs(diff) > 5) {
      touchDebounce.current = true;
      if (diff > 0) {
        handleNext(id, imagesLength);
      } else {
        handlePrev(id, imagesLength);
      }
      setTimeout(() => {
        touchDebounce.current = false;
      }, 500);
      setTouchPosition(null);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => handleTouchMove(e, item.unique_id, size)}
      className={styles.imageWrapper}
    >
      {Array.from({ length: size }).map((_, index) => (
        <div
          key={index}
          onMouseEnter={() =>
            setCarouselIndexes((prev) => ({ ...prev, [item.unique_id]: index }))
          }
          className={styles.carouselDot}
          style={{ width: `${100 / size}%`, left: `${(100 / size) * index}%` }}
        />
      ))}
      <Image
        alt={`${item.mark_id} ${item.folder_id}`}
        src={images[currentIndex]}
        priority={true}
        width={480}
        height={360}
        className={styles.image}
      />
    </div>
  );
};

export default ImageControl;
