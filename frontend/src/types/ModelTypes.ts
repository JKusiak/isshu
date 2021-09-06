// type for JWT token
export interface JWTTokenUser {
	_id: string,
	email: string;
	name: string;
	surname: string;
	organizationId: string;
}

// types for basic database models

export interface IOrganization {
	_id: string;
	name: string;
	archivedIssues: [];
}

export interface IUser {
	_id: string;
	name: string;
	surname: string;
	email: string;
	password: string;
	isAdmin: boolean;
	organizationId: string; // ref id
	projects: [string];     // ref id
	invitations: [string]   // ref id
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
	columnId: string;       // ref id
	isFinished: boolean;
	attachments: [IAttachment];
	messages: [IMessage];
	steps: [IStep];
	tags: [string];         // ref id
	contributors: [string]; // ref id
}

export interface ITag {
	_id: string;
	name: string;
	organizationId: string;
}

export interface IMessage {
	_id: string;
	content: string;
	sender: string;
	addTime: Date;
}

export interface IStep {
	_id: string;
	content: string;
	isCompleted: boolean;
}

export interface IAttachment {
	_id: string;
	name: string;
}

// types with nested subtypes for call on getNestedBoard
// that fetches all data of board and its children based on
// virtual properties to create nested object

export interface INestedMessage {
	_id: string;
	content: string;
	sender: INestedUser;
	addTime: Date;
}

export interface INestedUser {
	_id: string;
	name: string;
	surname: string;
	organizationId: string;
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
	columnId: string;
	isFinished: boolean;
	attachments: [IAttachment];
	messages: [INestedMessage];
	steps: [IStep];
	tags: [ITag];
	contributors: [INestedUser];
}

// types with nested subtypes for GetBoardsGallery and ProjectInfoBanner
export interface INestedProject {
	_id: string;
	name: string;
	description: string;
	dateStart: Date;
	dateEnd: Date;
	creator: INestedUser;
	boards: [{
		_id: string;
		name: string;
		projectId: string;
		totalIssues: number;
		totalCompleted: number;
	}]
}