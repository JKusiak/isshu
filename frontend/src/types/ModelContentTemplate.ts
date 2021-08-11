// templates used for state hooks to reduce boilerplate code
// as I don't know how to solve it with types 

import { IUser } from "./ModelTypes";

export const UserTemplate: {
      _id: string, 
      name: string, 
      surname: string, 
      email: string,
      password: string, 
      isAdmin: boolean,
      projects: [string]
} = {
      _id: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      isAdmin: false,
      projects: [''],
};

export const ProjectTemplate: {
      _id: string, 
      name: string, 
      description: string, 
      dateStart: Date, 
      dateEnd: Date, 
      creator: IUser, 
} = {
      _id: '',
      name: '',
      description: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      creator: UserTemplate,
};


export const BoardTemplate: {_id: string, name: string, projectId: string} = {
      _id: '',
      name: '',
      projectId: '',
};


export const ColumnTemplate: {_id: string, name: string, boardId: string} = {
      _id: '',
      name: '',
      boardId: '',
};


export const IssueTemplate: {
      _id: string, 
      name: string, 
      description:string, 
      creator: string, 
      contributors: [string], 
      tags: [string], 
      messages: [string], 
      steps: [string],
      columnId: string,
} = {
      _id: '',
      name: '',
      description: '',
      creator: '',
      contributors: [''],
      tags: [''],
      messages: [''],
      steps: [''],
      columnId: '',
};


export const TagTemplate: {_id: string, name: string} = {
      _id: '',
      name: '',
};


