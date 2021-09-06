

export enum ActionTypes {
	SetName = 'SET NAME',
	SetSurname = 'SET SURNAME',
	SetEmail = 'SET EMAIL',
	SetPassword = 'SET PASSWORD',
	SetRepeatPassword = 'SET REPEAT PASSWORD',
}

interface UserToRegister {
	name: string,
	surname: string,
	email: string,
	password: string,
	repeatPassword: string,
}

export const UserToRegisterTemplate = {
	name: '',
	surname: '',
	email: '',
	password: '',
	repeatPassword: '',
}

export type Action = {
	type: ActionTypes,
	payload: any,
}

export const registerReducer = (state: UserToRegister, action: Action) => {
	const { type, payload } = action;

	switch (type) {
		case ActionTypes.SetName:
			return {
				...state,
				name: payload,
			}
		case ActionTypes.SetSurname:
			return {
				...state,
				surname: payload,
			}
		case ActionTypes.SetEmail:
			return {
				...state,
				email: payload,
			}
		case ActionTypes.SetPassword:
			return {
				...state,
				password: payload,
			}
		case ActionTypes.SetRepeatPassword:
			return {
				...state,
				repeatPassword: payload,
			}
		default:
			return state
	}
}