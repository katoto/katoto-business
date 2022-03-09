// 对数据进行一层包裹，模拟真实的 API 请求
function wrapData(data: unknown, status: number = 200, message: string = '') {
  return {
    code: status,
    data,
    message,
  };
}

export default {
  '/api/todos': wrapData([
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    },
  ]),

  // 默认是 GET 请求，手动添加 POST
  'POST /api/error': wrapData(null, 500, '模拟接口报错'),

  // 编程式
  '/api/unauthorized': (_: any, res: any) => {
    res
      .status(401)
      .json({
        meta: {
          login_url: '',
        },
      })
      .end();
  },
};
