import { IProject } from "../../types/ModelTypes";

// helper function for ensuring the find function result never equals undefined
export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
      if (argument === undefined || argument === null) {
            throw new TypeError(message);
      }
    
      return argument;
}

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

export const bannerReducer = (state: IProject, action: Action) => {
	const {type, payload} = action;

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