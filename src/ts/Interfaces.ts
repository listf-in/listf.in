export interface Boardtype {
  id: string;
  owner: User;
  name: string;
  members: User[];
  listItems: Ordertype[];
  home: boolean;
  parents?: number;
}

export interface Ordertype {
  id: string;
  index: number;
  board: Boardtype;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  homeBoard?: Boardtype;
  boardList?: Boardtype[];
}
