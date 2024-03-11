export interface FavPic {
  link: string | undefined;
  title: string | undefined;
  user: string;
  favoritePics: {
    title: string;
    byteSize: number;
    url: string;
  }[];
}
