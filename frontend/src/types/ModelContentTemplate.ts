// templates used for state hooks to reduce boilerplate code
// as I don't know how to solve it with types 

import {
      IBoard,
      IColumn,
      IIssue,
      IMessage,
      INestedBoard,
      INestedColumn,
      INestedIssue,
      INestedMessage,
      INestedProject,
      INestedUser,
      IProject,
      IStep,
      ITag,
      IUser
} from "./ModelTypes";


export const UserTemplate: IUser = {
      _id: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      isAdmin: false,
      organizationId: '',
      projects: [''],
};

export const ProjectTemplate: IProject = {
      _id: '',
      name: '',
      description: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      creator: UserTemplate,
};


export const BoardTemplate: IBoard = {
      _id: '',
      name: '',
      projectId: '',
};


export const ColumnTemplate: IColumn = {
      _id: '',
      name: '',
      boardId: '',
};

export const TagTemplate: ITag = {
      _id: '',
      name: '',
};

export const MessageTemplate: IMessage = {
      _id: '',
      content: '',
      sender: '',
      addTime: new Date(),
}

export const StepTemplate: IStep = {
      _id: '',
      content: '',
      isCompleted: false,
}

export const IssueTemplate: IIssue = {
      _id: '',
      name: '',
      description: '',
      creator: '',
      contributors: [''],
      tags: [''],
      messages: [MessageTemplate],
      steps: [StepTemplate],
      columnId: '',
      isFinished: false,
};


// needed for providing initial value for BoardReducer

export const NestedUserTemplate: INestedUser = {
      _id: '',
      name: '',
      surname: '',
}

export const NestedMessageTemplate: INestedMessage = {
      _id: '',
      content: '',
      sender: NestedUserTemplate,
      addTime: new Date(),
}

export const NestedIssueTemplate: INestedIssue = {
      ...IssueTemplate,
      tags: [TagTemplate],
      contributors: [NestedUserTemplate],
      creator: NestedUserTemplate,
      messages: [NestedMessageTemplate],
}

export const NestedColumnTemplate: INestedColumn = {
      ...ColumnTemplate,
      issues:[NestedIssueTemplate],
}

export const NestedBoardTemplate: INestedBoard = {
      ...BoardTemplate,
      columns: [NestedColumnTemplate],
}

// needed for GetBoardsGallery and ProjectInfoBanner
export const NestedProjectTemplate: INestedProject = {
      _id: '',
      name: '',
      description: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      creator: NestedUserTemplate,
      boards: [{
            _id: '',
            name: '',
            projectId: '',
            totalIssues: 0,
            totalCompleted: 0,
      }]
}