import type { ReactNode } from "react";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "@/styles/swiper.css";

import styles from "./carousel.module.css";

type Props = {
  children: ReactNode[];
};

export default function CarouselComponent({ children }: Props): ReactNode {
  return (
    <div className={styles.carousel}>
      <Swiper slidesPerView="auto" modules={[FreeMode]}>
        {children.map((child, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
