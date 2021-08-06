// types for basic database models
export interface IUser {
      _id: string;
      name: string;
      surname: string;
      email: string;
      password: string;
      isAdmin: boolean;
      projects: [''];
}

export interface IProject {
      _id: string;
      name: string;
      description: string;
      dateStart: Date;
      dateEnd: Date;
      creator: IUser | string;
      boards: [''];
}

export interface IBoard {
      _id: string;
      name: string;
      columns: [''];
}

export interface IColumn {
      _id: string;
      name: string;
      issues: [''];
}

export interface IIssue {
      _id: string;
      description: string;
      creator: string;
      contributor:string;
      tags: [''];
}

export interface ITag {
      _id: string;
      name: string;
}


// types with nested subtypes for call on BoardContent
// that fetches all data of board and children at once
export interface INestedBoard {
      _id: string;
      name: string;
      columns: [INestedColumn]
}

export interface INestedColumn {
      _id: string;
      name: string;
      issues: [INestedIssue]
}

export interface INestedIssue {
      _id: string;
      description: string;
      creator: string;
      contributor:string;
      tags: [ITag]
}