import type { ReactNode } from "react";

import { FreeMode } from "swiper/modules";
import { Swiper, type SwiperProps, SwiperSlide } from "swiper/react";

import "@/styles/swiper.css";

import styles from "./carousel.module.css";

type Props = {
  spaceBetween?: SwiperProps["spaceBetween"];
  children: ReactNode[];
};

export default function CarouselComponent({
  spaceBetween,
  children,
}: Props): ReactNode {
  return (
    <div className={styles.carousel}>
      <Swiper
        slidesPerView="auto"
        modules={[FreeMode]}
        spaceBetween={spaceBetween}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
