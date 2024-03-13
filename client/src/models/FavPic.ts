export interface FavPic2 {
  // image: any;
  // link: string | undefined;
  // title: string | undefined;
  user: string;
  favoritePics: {
    title: string;
    byteSize: number;
    link: string;
  }[];
}

export interface FavPic {
  user: string;
  favoritePics: {
    title: string;
    link: string;
    image: {
      byteSize: number;
    };
  };
}
