import request from '@/utils/request';
import { stringify } from 'qs';

const baseUrl = '/wookong';
export async function fakeAccountLogin(params) {
  return request('/wxmplogin', {
    method: 'POST',
    data: params,
  });
}

export const fakeAccountLoginB = data => {
  console.log('--登录',data)
  let url = '/wxmplogin';
  data.loginType = 'P';
  data.tenantDomainHead = 'localhost';
  delete data.autoLogin

  const str = stringify(data);
  return request(`${baseUrl}${url}/3`, {
    method: 'POST',
    body: str,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
