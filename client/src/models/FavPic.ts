export interface FavPic {
  user: string;
  favoritePics: {
    title: string;
    link: string;
    image: {
      byteSize: number;
      contextLink: string;
      height: number;
      thumbnailHeight: number;
      thumbnailLink: string;
      thumbnailWidth: number;
      width: number;
    };
  };
}
