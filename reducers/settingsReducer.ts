import produce from 'immer';

import { initialSettings } from '../constants/constants';
import { LanguageType } from '../types/general';

type SettingsAction = SetSettings | ChangeLanguage;

export interface SettingsReducerState {
    lang: LanguageType;
    error: any;
}

export enum SettingsActionType {
    SET_SETTINGS = 'SET_SETTINGS',
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
}

interface SetSettings {
    type: SettingsActionType.SET_SETTINGS;
    payload: Record<string, any>;
    error: any;
}

interface ChangeLanguage {
    type: SettingsActionType.CHANGE_LANGUAGE;
    payload: string;
    error: any;
}

export function setSettings(value: any, error?: any): SetSettings {
    return {
        type: SettingsActionType.SET_SETTINGS,
        payload: value,
        error,
    };
}

export function changeLanguage(language: string, error?: any): ChangeLanguage {
    return {
        type: SettingsActionType.CHANGE_LANGUAGE,
        payload: language,
        error,
    };
}

export const settingsReducer = (state: Record<string, any> = initialSettings, action: SettingsAction) =>
    produce(state, draft => {
        switch (action.type) {
        case SettingsActionType.SET_SETTINGS:
            for (const key in action.payload) {
                draft[key] = action.payload[key];
            }

            break;

        case SettingsActionType.CHANGE_LANGUAGE:
            draft.language = action.payload;
            break;
        }
    });
