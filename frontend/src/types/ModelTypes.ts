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
      boardId: string;       // ref id
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
      columnId: string;
}

export interface ITag {
      _id: string;
      name: string;
}