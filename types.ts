export type Column = {
    id: string;
    title: string;
  
}



export type Id = string | number;

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
}
