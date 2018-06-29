import update from 'react-addons-update';
import * as actionsTypes from '../actions/module';

export const initialState = {
    module_id: undefined,
    name: undefined,
    medals: undefined,
    uses_trophies: undefined,
    trophies: undefined,
    num_enrolled: undefined,
    trophies_awarded: undefined,
    members: [],
    quizzes: undefined,
    surveys: undefined,
    error: undefined,
    isFetchingModule: false,
    isFetchingMembers: false,
    isQuizOpen: false,
    isRemovingMember: false,
    isGeneratingShareId: false,
    importCode: '',
    isSubmittingImportCode: false,
    owner: undefined
};

export function module (state = initialState, action ) {

    switch (action.type) {

    case actionsTypes.OPEN_QUIZ:
        return update(state, {
            isQuizOpen: { $set: true }
        });

    case actionsTypes.CLOSE_QUIZ:
        return update(state, {
            isQuizOpen: { $set: false }
        });

    case actionsTypes.CLEAR_MODULE_STATE:
        return initialState;

    case actionsTypes.GET_MODULE_REQUEST:
        return update(state, {
            isFetchingModule: { $set: true }
        });

    case actionsTypes.GET_MODULE_SUCCESS:

        if (action.is_lecturer) {

            return update(state, {
                isFetchingModule: { $set: false },
                module_id: { $set: action.data.module_id },
                name: { $set: action.data.name },
                medals: { $set: action.data.medals },
                trophies: { $set: action.data.trophies },
                uses_trophies: { $set: action.data.uses_trophies },
                num_enrolled: { $set: action.data.num_enrolled },
                quizzes: { $set: action.data.quizzes },
                surveys: { $set: action.data.surveys },
                owner: { $set: action.data.owner }
            });
        }
        if (action.is_lecturer == false) {

            return update(state, {
                isFetchingModule: { $set: false },
                module_id: { $set: action.data.module_id },
                name: { $set: action.data.name },
                medals: { $set: action.data.medals },
                uses_trophies: { $set: action.data.uses_trophies },
                trophies_awarded: { $set: action.data.trophies_awarded },
                trophies: { $set: action.data.trophies }
            });
        }
        if (action.is_test) {
            return update(state, {
                trophies_awarded: { $set: action.data }
            });
        }

    case actionsTypes.GET_MODULE_FAILURE: //eslint-disable-line no-fallthrough
        return update(state, {
            isFetchingModule: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.GET_MODULE_MEMBERS_REQUEST:
        return update(state, {
            isFetchingMembers: { $set: true }
        });

    case actionsTypes.GET_MODULE_MEMBERS_SUCCESS:
        return update(state, {
            isFetchingMembers: { $set: false },
            members: { $set: action.data },
        });

    case actionsTypes.GET_MODULE_MEMBERS_FAILURE:
        return update(state, {
            isFetchingMembers: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.REMOVE_MODULE_MEMBER_REQUEST:
        return update(state, {
            isRemovingMember: { $set: true }
        });

    case actionsTypes.REMOVE_MODULE_MEMBER_SUCCESS:
        return update(state, {
            isRemovingMember: { $set: false }
        });

    case actionsTypes.REMOVE_MODULE_MEMBER_FAILURE:
        return update(state, {
            isRemovingMember: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.GENERATE_SHARE_ID_REQUEST:
        return update(state, {
            isGeneratingShareId: { $set: true }
        });

    case actionsTypes.GENERATE_SHARE_ID_SUCCESS:
        return update(state, {
            isGeneratingShareId: { $set: false }
        });

    case actionsTypes.GENERATE_SHARE_ID_FAILURE:
        return update(state, {
            isGeneratingShareId: { $set: false },
            error: { $set: action.error }
        });
    case actionsTypes.UPDATE_IMPORT_CODE:
        return update(state, {
            importCode: { $set: action.code }
        });
    case actionsTypes.SUBMIT_IMPORT_CODE_REQUEST:
        return update(state, {
            isSubmittingImportCode: { $set: true }
        });
    case actionsTypes.SUBMIT_IMPORT_CODE_SUCCESS:
        return update(state, {
            isSubmittingImportCode: { $set: false },
            importCode: { $set: '' }
        });
    case actionsTypes.SUBMIT_IMPORT_CODE_FAILURE:
        return update(state, {
            isSubmittingImportCode: { $set: false },
            error: { $set: action.error },
            importCode: { $set: '' }
        });
    case actionsTypes.CLEAR_ERROR_MESSAGE:
        return update(state, {
            error: { $set: undefined }
        });

    default:
        return state;
    }
}
