import { useState, useEffect } from "react";
import styles from "./Carousel.module.css";


export default function Carousel({data}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function carouselInfiniteScroll() {
    if (currentIndex === data.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      carouselInfiniteScroll();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.carousel_container}>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <img
              className={styles.carousel_item}
              src={item}
              alt={`the dog ${index}`}
              key={index}
              style={{ transform: `translate(-${currentIndex * 100}%)` }}
            ></img>
          </div>
        );
      })}
    </div>
  );
}
