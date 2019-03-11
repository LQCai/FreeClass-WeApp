import {
    OPENID_EXIST
} from '../canstants/openId';

export const hasOpenId = (openIdCache) => {
    console.log(openIdCache);
    return {
        openIdCache,
        type: OPENID_EXIST
    }
}
