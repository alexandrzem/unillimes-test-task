import { useEffect, useState } from "react";
import * as THREE from "three";

const useUpdatedTexture = (url, repeat) => {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    if (url) {
      const loader = new THREE.TextureLoader();
      loader.load(
        url,
        (loadedTexture) => {
          loadedTexture.wrapS = loadedTexture.wrapT = THREE.RepeatWrapping;
          loadedTexture.repeat.set(repeat[0], repeat[1]);
          setTexture(loadedTexture);
        },
        undefined,
        (error) => console.error("An error with loading the texture:", error)
      );
    } else {
      setTexture(null);
    }
  }, [url, repeat]);

  return texture;
};

export default useUpdatedTexture;
