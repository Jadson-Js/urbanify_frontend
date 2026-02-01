// LazyImageWithLoader.jsx
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import style from "./style.module.css";

const LazyImageWithLoader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={style.container}>
      {!loaded && <div className={style.skeleton} />}
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        afterLoad={() => setLoaded(true)}
        className={`${style.image} ${loaded ? style.visible : style.hidden}`}
      />
    </div>
  );
};

export default LazyImageWithLoader;
