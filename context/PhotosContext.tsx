import { ReactNode, createContext, useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";
/* Paris */
import PARIS_20231224_151938 from "../assets/images/photosAlbums/paris/20231224_151938.jpg";
import PARIS_20231224_153659 from "../assets/images/photosAlbums/paris/20231224_153659.jpg";
import PARIS_20231224_153746 from "../assets/images/photosAlbums/paris/20231224_153746.jpg";
import PARIS_20231224_153823 from "../assets/images/photosAlbums/paris/20231224_153823.jpg";
import PARIS_20231224_154008 from "../assets/images/photosAlbums/paris/20231224_154008.jpg";
import PARIS_20231224_185215 from "../assets/images/photosAlbums/paris/20231224_185215.jpg";
import PARIS_20231224_201612 from "../assets/images/photosAlbums/paris/20231224_201612.jpg";
import PARIS_20231224_1534500 from "../assets/images/photosAlbums/paris/20231224_1534500.jpg";
import PARIS_20231225_181634 from "../assets/images/photosAlbums/paris/20231225_181634.jpg";
import PARIS_20231225_201114 from "../assets/images/photosAlbums/paris/20231225_201114.jpg";
import PARIS_20231225_205120 from "../assets/images/photosAlbums/paris/20231225_205120.jpg";
import PARIS_20231225_205204 from "../assets/images/photosAlbums/paris/20231225_205204.jpg";
import PARIS_20231225_205252 from "../assets/images/photosAlbums/paris/20231225_205252.jpg";
import PARIS_20231225_205723 from "../assets/images/photosAlbums/paris/20231225_205723.jpg";
import PARIS_20231225_210747 from "../assets/images/photosAlbums/paris/20231225_210747.jpg";
import PARIS_20231225_210924 from "../assets/images/photosAlbums/paris/20231225_210924.jpg";
import PARIS_20231225_211237 from "../assets/images/photosAlbums/paris/20231225_211237.jpg";
import PARIS_20231225_211245 from "../assets/images/photosAlbums/paris/20231225_211245.jpg";
import PARIS_20231225_212543 from "../assets/images/photosAlbums/paris/20231225_212543.jpg";
import PARIS_20231226_171441 from "../assets/images/photosAlbums/paris/20231226_171441.jpg";
import PARIS_20231226_172142 from "../assets/images/photosAlbums/paris/20231226_172142.jpg";
import PARIS_20231226_173148 from "../assets/images/photosAlbums/paris/20231226_173148.jpg";
import PARIS_20231227_165850 from "../assets/images/photosAlbums/paris/20231227_165850.jpg";
import PARIS_20231227_172617 from "../assets/images/photosAlbums/paris/20231227_172617.jpg";
import PARIS_20231228_135047 from "../assets/images/photosAlbums/paris/20231228_135047.jpg";
import PARIS_20231228_135049 from "../assets/images/photosAlbums/paris/20231228_135049.jpg";
import PARIS_20231228_135227 from "../assets/images/photosAlbums/paris/20231228_135227.jpg";
import PARIS_20231228_152025 from "../assets/images/photosAlbums/paris/20231228_152025.jpg";
import PARIS_20231228_1559080 from "../assets/images/photosAlbums/paris/20231228_1559080.jpg";
import PARIS_20231228_170139 from "../assets/images/photosAlbums/paris/20231228_170139.jpg";
import PARIS_20231229_154321 from "../assets/images/photosAlbums/paris/20231229_154321.jpg";
/* Portugal */
import PORTUGAL_20230831_101301 from "../assets/images/photosAlbums/portugal/20230831_101301.jpg";
import PORTUGAL_20230831_101543 from "../assets/images/photosAlbums/portugal/20230831_101543.jpg";
import PORTUGAL_20230831_101701 from "../assets/images/photosAlbums/portugal/20230831_101701.jpg";
import PORTUGAL_20230831_180940 from "../assets/images/photosAlbums/portugal/20230831_180940.jpg";
import PORTUGAL_20230831_180942 from "../assets/images/photosAlbums/portugal/20230831_180942.jpg";
import PORTUGAL_20230831_202234 from "../assets/images/photosAlbums/portugal/20230831_202234.jpg";
import PORTUGAL_20230831_202254 from "../assets/images/photosAlbums/portugal/20230831_202254.jpg";
import PORTUGAL_20230831_232102 from "../assets/images/photosAlbums/portugal/20230831_232102.jpg";
import PORTUGAL_20230901_141223 from "../assets/images/photosAlbums/portugal/20230901_141223.jpg";
import PORTUGAL_20230901_141352 from "../assets/images/photosAlbums/portugal/20230901_141352.jpg";
import PORTUGAL_20230901_141540 from "../assets/images/photosAlbums/portugal/20230901_141540.jpg";
import PORTUGAL_20230901_141627 from "../assets/images/photosAlbums/portugal/20230901_141627.jpg";
import PORTUGAL_20230901_180639 from "../assets/images/photosAlbums/portugal/20230901_180639.jpg";
import PORTUGAL_20230901_214845 from "../assets/images/photosAlbums/portugal/20230901_214845.jpg";
import PORTUGAL_20230902_112524 from "../assets/images/photosAlbums/portugal/20230902_112524.jpg";
import PORTUGAL_20230902_112633 from "../assets/images/photosAlbums/portugal/20230902_112633.jpg";
import PORTUGAL_20230902_114554 from "../assets/images/photosAlbums/portugal/20230902_114554.jpg";
import PORTUGAL_20230902_164658 from "../assets/images/photosAlbums/portugal/20230902_164658.jpg";
import PORTUGAL_20230902_201603 from "../assets/images/photosAlbums/portugal/20230902_201603.jpg";
import PORTUGAL_20230903_113751 from "../assets/images/photosAlbums/portugal/20230903_113751.jpg";
import PORTUGAL_20230903_131031_001 from "../assets/images/photosAlbums/portugal/20230903_131031_001.jpg";
import PORTUGAL_20230903_131042_001 from "../assets/images/photosAlbums/portugal/20230903_131042_001.jpg";
import PORTUGAL_20230903_131044_001 from "../assets/images/photosAlbums/portugal/20230903_131044_001.jpg";
import PORTUGAL_20230903_153335 from "../assets/images/photosAlbums/portugal/20230903_153335.jpg";
import PORTUGAL_20230903_154025 from "../assets/images/photosAlbums/portugal/20230903_154025.jpg";
import PORTUGAL_20230903_180833 from "../assets/images/photosAlbums/portugal/20230903_180833.jpg";
import PORTUGAL_20230903_180839 from "../assets/images/photosAlbums/portugal/20230903_180839.jpg";
import PORTUGAL_20230903_203723 from "../assets/images/photosAlbums/portugal/20230903_203723.jpg";
import PORTUGAL_20230904_201258 from "../assets/images/photosAlbums/portugal/20230904_201258.jpg";
import PORTUGAL_20230905_094840 from "../assets/images/photosAlbums/portugal/20230905_094840.jpg";
import PORTUGAL_20230905_123133 from "../assets/images/photosAlbums/portugal/20230905_123133.jpg";
import PORTUGAL_20230905_123210 from "../assets/images/photosAlbums/portugal/20230905_123210.jpg";
import PORTUGAL_20230905_175908 from "../assets/images/photosAlbums/portugal/20230905_175908.jpg";
import PORTUGAL_20230905_180202 from "../assets/images/photosAlbums/portugal/20230905_180202.jpg";
import PORTUGAL_20230905_180330 from "../assets/images/photosAlbums/portugal/20230905_180330.jpg";
import PORTUGAL_20230905_191753 from "../assets/images/photosAlbums/portugal/20230905_191753.jpg";
import PORTUGAL_20230906_190126 from "../assets/images/photosAlbums/portugal/20230906_190126.jpg";
import PORTUGAL_20230906_190131 from "../assets/images/photosAlbums/portugal/20230906_190131.jpg";
import PORTUGAL_20230906_190427 from "../assets/images/photosAlbums/portugal/20230906_190427.jpg";
import PORTUGAL_20230906_195328 from "../assets/images/photosAlbums/portugal/20230906_195328.jpg";

export interface Album {
  id: string;
  index: number;
  title: string;
  photos: ImageSourcePropType[];
}
export type PhotosStateContext = {
  allPhotos: ImageSourcePropType[];
  albums: Album[];
};
export type PhotosContextProps = {
  children?: ReactNode;
};

const initialState: PhotosStateContext = {
  allPhotos: [
    PARIS_20231224_151938,
    PARIS_20231224_153659,
    PARIS_20231224_153746,
    PARIS_20231224_153823,
    PARIS_20231224_154008,
    PARIS_20231224_185215,
    PARIS_20231224_201612,
    PARIS_20231224_1534500,
    PARIS_20231225_181634,
    PARIS_20231225_201114,
    PARIS_20231225_205120,
    PARIS_20231225_205204,
    PARIS_20231225_205252,
    PARIS_20231225_205723,
    PARIS_20231225_210747,
    PARIS_20231225_210924,
    PARIS_20231225_211237,
    PARIS_20231225_211245,
    PARIS_20231225_212543,
    PARIS_20231226_171441,
    PARIS_20231226_172142,
    PARIS_20231226_173148,
    PARIS_20231227_165850,
    PARIS_20231227_172617,
    PARIS_20231228_135047,
    PARIS_20231228_135049,
    PARIS_20231228_135227,
    PARIS_20231228_152025,
    PARIS_20231228_1559080,
    PARIS_20231228_170139,
    PARIS_20231229_154321,
    PORTUGAL_20230831_101301,
    PORTUGAL_20230831_101543,
    PORTUGAL_20230831_101701,
    PORTUGAL_20230831_180940,
    PORTUGAL_20230831_180942,
    PORTUGAL_20230831_202234,
    PORTUGAL_20230831_202254,
    PORTUGAL_20230831_232102,
    PORTUGAL_20230901_141223,
    PORTUGAL_20230901_141352,
    PORTUGAL_20230901_141540,
    PORTUGAL_20230901_141627,
    PORTUGAL_20230901_180639,
    PORTUGAL_20230901_214845,
    PORTUGAL_20230902_112524,
    PORTUGAL_20230902_112633,
    PORTUGAL_20230902_114554,
    PORTUGAL_20230902_164658,
    PORTUGAL_20230902_201603,
    PORTUGAL_20230903_113751,
    PORTUGAL_20230903_131031_001,
    PORTUGAL_20230903_131042_001,
    PORTUGAL_20230903_131044_001,
    PORTUGAL_20230903_153335,
    PORTUGAL_20230903_154025,
    PORTUGAL_20230903_180833,
    PORTUGAL_20230903_180839,
    PORTUGAL_20230903_203723,
    PORTUGAL_20230904_201258,
    PORTUGAL_20230905_094840,
    PORTUGAL_20230905_123133,
    PORTUGAL_20230905_123210,
    PORTUGAL_20230905_175908,
    PORTUGAL_20230905_180202,
    PORTUGAL_20230905_180330,
    PORTUGAL_20230905_191753,
    PORTUGAL_20230906_190126,
    PORTUGAL_20230906_190131,
    PORTUGAL_20230906_190427,
    PORTUGAL_20230906_195328,
  ],
  albums: [
    {
      id: "portugal",
      index: 0,
      title: "Portugal\n(with my love ❤️)",
      photos: [
        PORTUGAL_20230831_101301,
        PORTUGAL_20230831_101543,
        PORTUGAL_20230831_101701,
        PORTUGAL_20230831_180940,
        PORTUGAL_20230831_180942,
        PORTUGAL_20230831_202234,
        PORTUGAL_20230831_202254,
        PORTUGAL_20230831_232102,
        PORTUGAL_20230901_141223,
        PORTUGAL_20230901_141352,
        PORTUGAL_20230901_141540,
        PORTUGAL_20230901_141627,
        PORTUGAL_20230901_180639,
        PORTUGAL_20230901_214845,
        PORTUGAL_20230902_112524,
        PORTUGAL_20230902_112633,
        PORTUGAL_20230902_114554,
        PORTUGAL_20230902_164658,
        PORTUGAL_20230902_201603,
        PORTUGAL_20230903_113751,
        PORTUGAL_20230903_131031_001,
        PORTUGAL_20230903_131042_001,
        PORTUGAL_20230903_131044_001,
        PORTUGAL_20230903_153335,
        PORTUGAL_20230903_154025,
        PORTUGAL_20230903_180833,
        PORTUGAL_20230903_180839,
        PORTUGAL_20230903_203723,
        PORTUGAL_20230904_201258,
        PORTUGAL_20230905_094840,
        PORTUGAL_20230905_123133,
        PORTUGAL_20230905_123210,
        PORTUGAL_20230905_175908,
        PORTUGAL_20230905_180202,
        PORTUGAL_20230905_180330,
        PORTUGAL_20230905_191753,
        PORTUGAL_20230906_190126,
        PORTUGAL_20230906_190131,
        PORTUGAL_20230906_190427,
        PORTUGAL_20230906_195328,
      ],
    },
    {
      id: "austria",
      index: 1,
      title: "Austria\n(with my love ❤️)",
      photos: [],
    },
    {
      id: "paris",
      index: 2,
      title: "Paris\n(❤️🗽 with my love 🗼🎄)",
      photos: [
        PARIS_20231224_151938,
        PARIS_20231224_153659,
        PARIS_20231224_153746,
        PARIS_20231224_153823,
        PARIS_20231224_154008,
        PARIS_20231224_185215,
        PARIS_20231224_201612,
        PARIS_20231224_1534500,
        PARIS_20231225_181634,
        PARIS_20231225_201114,
        PARIS_20231225_205120,
        PARIS_20231225_205204,
        PARIS_20231225_205252,
        PARIS_20231225_205723,
        PARIS_20231225_210747,
        PARIS_20231225_210924,
        PARIS_20231225_211237,
        PARIS_20231225_211245,
        PARIS_20231225_212543,
        PARIS_20231226_171441,
        PARIS_20231226_172142,
        PARIS_20231226_173148,
        PARIS_20231227_165850,
        PARIS_20231227_172617,
        PARIS_20231228_135047,
        PARIS_20231228_135049,
        PARIS_20231228_135227,
        PARIS_20231228_152025,
        PARIS_20231228_1559080,
        PARIS_20231228_170139,
        PARIS_20231229_154321,
      ],
    },
  ],
};

export const PhotosContext = createContext(initialState);

export function PhotosContextProvider({ children }: PhotosContextProps) {
  const [allPhotos, setAllPhotos] = useState<ImageSourcePropType[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    setAllPhotos(initialState.allPhotos);
    setAlbums(initialState.albums);
  }, []);

  return (
    <PhotosContext.Provider value={{ allPhotos, albums }}>
      {children}
    </PhotosContext.Provider>
  );
}
