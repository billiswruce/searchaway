import React, { createContext, useContext, useState, ReactNode } from "react";

interface FavPic {
  title: string;
  byteSize: number;
  link: string;
}

interface FavPicsContextType {
  favPics: FavPic[];
  setFavPics: React.Dispatch<React.SetStateAction<FavPic[]>>;
}

const FavPicsContext = createContext<FavPicsContextType | undefined>(undefined);

export const FavPicsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favPics, setFavPics] = useState<FavPic[]>([]);

  return (
    <FavPicsContext.Provider value={{ favPics, setFavPics }}>
      {children}
    </FavPicsContext.Provider>
  );
};

export const useFavPics = () => {
  const context = useContext(FavPicsContext);
  if (context === undefined) {
    throw new Error("useFavPics must be used within a FavPicsProvider");
  }
  return context;
};
