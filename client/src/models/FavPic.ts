export interface FavPic {
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
