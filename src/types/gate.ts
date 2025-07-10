export interface Gate {
  _id: string;
  name: string;
  cameras: {entry: string; exit: string};
  isOpen: boolean;
}