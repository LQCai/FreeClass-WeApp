import {
    DETECTION_LIST,
    DETECTION_COLLECT,
    DETECTION_COLLECT_CANCEL,
    DETECTION_COMMENT,
    DETECTION_COMMENT_CANCEL,
    DETECTION_DELETE,
    DETECTION_DETAIL,
    DETECTION_POST,
    DETECTION_IMAGE_LIST
} from '../canstants/detection';

const INITAL_STATE = {
    detectionList: [],
    postResult: {},
    detectionImageList: []
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
        default:
            return state
    }
}