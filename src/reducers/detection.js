import {
    DETECTION_LIST,
    DETECTION_COLLECT,
    DETECTION_COLLECT_CANCEL,
    DETECTION_COMMENT,
    DETECTION_COMMENT_CANCEL,
    DETECTION_DELETE,
    DETECTION_COLLECT_LIST,
    DETECTION_POST,
    DETECTION_IMAGE_LIST
} from '../canstants/detection';

const INITAL_STATE = {
    detectionList: [],
    postResult: {},
    detectionImageList: [],
    collectResult: 0,
    commentResult: 0,
    detectionCollectList: []
}

export default function detection(state = INITAL_STATE, action) {
    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case DETECTION_LIST:
            return {
                ...state,
                detectionList: payload,
            }
        case DETECTION_POST:
            return {
                ...state,
                postResult: payload,
            }
        case DETECTION_IMAGE_LIST:
            return {
                ...state,
                detectionImageList: payload,
            }
        case DETECTION_COLLECT:
            return {
                ...state,
                collectResult: 1,
            }
        case DETECTION_COLLECT_CANCEL:
            return {
                ...state,
                collectResult: 2,
            }
        case DETECTION_COMMENT:
            return {
                ...state,
                commentResult: 1,
            }
        case DETECTION_COMMENT_CANCEL:
            return {
                ...state,
                commentResult: 2,
            }
        case DETECTION_COLLECT_LIST:
            return {
                ...state,
                detectionCollectList: payload,
            }
        default:
            return state
    }
}