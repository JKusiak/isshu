// templates used for state hooks to reduce boilerplate code
// as I don't know how to solve it with types 
import { INestedColumn, INestedIssue, ITag, IUser } from "./ModelTypes";

export const UserTemplate: {_id: string, name: string, surname: string, email: string, password: string, isAdmin: boolean, projects: [string]} = {
      _id: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      isAdmin: false,
      projects: [''],
};

export const ProjectTemplate: {_id: string, name: string, description: string, dateStart: Date, dateEnd: Date, creator: IUser, boards: [string]} = {
      _id: '',
      name: '',
      description: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      creator: UserTemplate,
      boards: [''],
};


export const BoardTemplate: {_id: string, name: string, columns: [string]} = {
      _id: '',
      name: '',
      columns: [''],
};


export const ColumnTemplate: {_id: string, name: string, issues: [string]} = {
      _id: '',
      name: '',
      issues: [''],
};


export const IssueTemplate: {_id: string, name: string, creator: string, contributor: string, tags: [string]} = {
      _id: '',
      name: '',
      creator: '',
      contributor: '',
      tags: [''],
};


export const TagTemplate: {_id: string, name: string} = {
      _id: '',
      name: '',
};


export const NestedTagTemplate: {_id: string, name: string} = {
      _id: '',
      name: ''
};


export const NestedIssueTemplate: {_id: string, name: string, creator: string, contributor: string, tags: [ITag]} = {
      _id: '',
      name: '',
      creator: '',
      contributor: '',
      tags: [NestedTagTemplate]
};


export const NestedColumnTemplate: {_id: string, name: string, issues: [INestedIssue]} = {
      _id: '',
      name: '',
      issues: [NestedIssueTemplate]
};


export const NestedBoardTemplate: {_id: string, name: string, columns: [INestedColumn]} = {
      _id: '',
      name: '',
      columns: [NestedColumnTemplate]
};

