export interface IPost {
  title: string;
  id: number;
  time: string;
  by: string;
  rating: number;
  descendants: number;
  kids: Array<number>;
  score: number;
  type: string;
  url: string;
  text: string;
  parent: number;
  deleted: boolean;
}