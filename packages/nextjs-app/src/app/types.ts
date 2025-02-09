export interface Book {
    Title: string;
    Author: string;
    Year: string;
    ID: string;
    Extension?: string;
    Publisher?: string;
    Cover?: string;
    Direct_Download_Link?: string;
    [key: string]: string | undefined;
  } 