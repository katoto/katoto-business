import type { RequestConfig } from 'umi';
import type { I } from '@/types/project';
import { ErrorShowType } from 'umi';
import { message } from 'antd';

export const errorHandler: RequestConfig['errorHandler'] = (error) => {
  const { response, data } = error;

  // 业务报错
  if (error.name === 'BizError') {
    message.error(error.message);
  } else if (response && response.status) {
    const { status } = response;
    if (status === 401) {
      const { login_url } = (data as I.UnauthorizedData).meta;
      if (login_url) {
        window.location.href = login_url;
      }
    }
    message.error(response.statusText);
  }

  throw error;
};

interface ConvertResponse<T> {
  success?: (res: T) => boolean;
  errorMessage?: ((res: T) => string) | string;
}
export const errorAdaptor = (
  adaptor?: ConvertResponse<I.ResponseStructure>,
) => {
  // 默认判断接口返回 code:200 才是正常的响应数据
  const success =
    adaptor?.success ||
    ((res) => {
      return res.code === 200;
    });
  const errorMessage = adaptor?.errorMessage || '请求出错';
  return (response: I.ResponseStructure) => {
    return {
      ...adaptor,
      ...response,
      showType: ErrorShowType.ERROR_MESSAGE,
      success: success(response),
      errorMessage:
        typeof errorMessage === 'function'
          ? errorMessage(response)
          : errorMessage,
    };
  };
};
