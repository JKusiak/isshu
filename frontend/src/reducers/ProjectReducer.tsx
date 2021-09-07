import { IProject } from "../types/ModelTypes";


export enum ActionTypes {
	FetchData = 'FETCH DATA',
	UpdateName = 'UPDATE NAME',
	UpdateDescription = 'UPDATE DESCRIPTION',
	UpdateDateStart = 'UPDATE DATE START',
	UpdateDateEnd = 'UPDATE DATE END',
}

export type Action = {
	type: ActionTypes,
	payload: any,
}

export const projectReducer = (state: IProject, action: Action) => {
	const { type, payload } = action;

	switch (type) {
		case ActionTypes.FetchData:
			return payload;
		case ActionTypes.UpdateName:
			return {
				...state,
				name: payload,
			}
		case ActionTypes.UpdateDescription:
			return {
				...state,
				description: payload,
			}
		case ActionTypes.UpdateDateStart:
			return {
				...state,
				dateStart: payload,
			}
		case ActionTypes.UpdateDateEnd:
			return {
				...state,
				dateEnd: payload,
			}
		default:
			return state
	}
}