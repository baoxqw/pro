import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { history } from 'umi';
//import router from 'umi/router';
import { fakeAccountLogin,fakeAccountLoginB } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import storage from '@/utils/storage';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(fakeAccountLoginB, payload);
      console.log('登录结果',data)
      if (!data) return;
      const { sessionID, ...userinfo } = data;
      // 本地持久化 sessionID
      storage.set('sessionID', sessionID);
      storage.set('userinfo', userinfo);
      console.log('params',params)
const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
          return;
        }
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(
      state,
      {
        payload: { currentAuthority, ...rest },
      }
    ) {
      setAuthority(currentAuthority);
      return {
        ...state,
        ...rest,
      };
    },
  },
};
export default Model;
