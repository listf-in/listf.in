
export interface Boardtype {
  id: string;
  owner: User;
  name: string;
  members: User[];
  listItems: Boardtype[];
  home: Boolean;
}

export interface User {
    id: string;
    name: string;
    homeBoard: Boardtype;
    boardList: Boardtype[];
}
