import produce from 'immer';

const initState: Record<string, any> = {};

type ConstantsAction = SetConstants;

export enum ConstantsActionType {
    SET_CONSTANTS = 'SET_CONSTANTS',
}

interface SetConstants {
    type: ConstantsActionType.SET_CONSTANTS;
    payload: Record<string, any>;
    error?: Error;
}

export function setConstants(value: any, error?: Error): SetConstants {
    return {
        type: ConstantsActionType.SET_CONSTANTS,
        payload: value,
        error,
    };
}

export const constantsReducer = (state: Record<string, any> = initState, action: ConstantsAction) =>
    produce(state, draft => {
        if (action.type === ConstantsActionType.SET_CONSTANTS && !action.error) {
            for (const key in action.payload) {
                draft[key] = action.payload[key];
            }
        }
    });
