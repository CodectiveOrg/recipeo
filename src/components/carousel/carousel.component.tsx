import type { ReactNode } from "react";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "@/styles/swiper.css";

import styles from "./carousel.module.css";

type Props = {
  slideBlockSize: string;
  slideInlineSize: string;
  children: ReactNode[];
};

export default function CarouselComponent({
  slideBlockSize,
  slideInlineSize,
  children,
}: Props): ReactNode {
  return (
    <div className={styles.carousel}>
      <Swiper slidesPerView="auto" spaceBetween={16} modules={[FreeMode]}>
        {children.map((child, index) => (
          <SwiperSlide
            key={index}
            style={{
              blockSize: slideBlockSize,
              inlineSize: slideInlineSize,
            }}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
