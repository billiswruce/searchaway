export interface FavPic {
  user: string;
  favoritePics: {
    title: string;
    byteSize: number;
    url: string;
  }[];
}
