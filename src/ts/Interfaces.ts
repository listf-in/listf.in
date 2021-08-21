export interface Boardtype {
  id: string;
  owner: User;
  name: string;
  members: User[];
  listItems: Ordertype[];
  home: boolean;
}

export interface Ordertype {
  id: string;
  index: number;
  board: Boardtype;
}

export interface User {
  id: string;
  name: string;
  homeBoard?: Boardtype;
  boardList?: Boardtype[];
}
