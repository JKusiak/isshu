// templates used for state hooks to reduce boilerplate code
// as I don't know how to solve it with types 

import { INestedColumn, INestedIssue, ITag } from "./ModelTypes";

export const TagTemplate: {_id: string, name: string} = {
      _id: '',
      name: ''
};

export const IssueTemplate: {_id: string, description: string, creator: string, contributor: string, tags: [ITag]} = {
      _id: '',
      description: '',
      creator: '',
      contributor: '',
      tags: [TagTemplate]
};

export const ColumnTemplate: {_id: string, name: string, issues: [INestedIssue]} = {
      _id: '',
      name: '',
      issues: [IssueTemplate]
};

export const BoardTemplate: {_id: string, name: string, columns: [INestedColumn]} = {
      _id: '',
      name: '',
      columns: [ColumnTemplate]
};