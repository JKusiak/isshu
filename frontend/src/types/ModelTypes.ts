// types for basic database models

export interface IUser {
      _id: string;
      name: string;
      surname: string;
      email: string;
      password: string;
      isAdmin: boolean;
      projects: [string];     // ref id
}

export interface IProject {
      _id: string;
      name: string;
      description: string;
      dateStart: Date;
      dateEnd: Date;
      creator: IUser;
}

export interface IBoard {
      _id: string;
      name: string;
      projectId: string;      // ref id
}

export interface IColumn {
      _id: string;
      name: string;
      boardId: string;        // ref id
}

export interface IIssue {
      _id: string;
      name: string;
      description: string;
      creator: string;        // ref id
      contributors: [string]; // ref id
      tags: [string];         // ref id
      messages: [string];
      steps: [string];
      columnId: string;       // ref id
}

export interface ITag {
      _id: string;
      name: string;
}


// types with nested subtypes for call on getNestedBoard
// that fetches all data of board and its children based on
// virtual properties to create nested object

export interface INestedUser {
      _id: string;
      name: string;
      surname: string;
}

export interface INestedBoard {
      _id: string;
      name: string;
      projectId: string;
      columns: [INestedColumn];
}

export interface INestedColumn {
      _id: string;
      name: string;
      boardId: string;
      issues: [INestedIssue];
}

export interface INestedIssue {
      _id: string;
      name: string;
      description: string;
      creator: INestedUser;
      columnId: string,
      messages: [string];
      steps: [string];
      tags: [ITag];
      contributors: [INestedUser];
}