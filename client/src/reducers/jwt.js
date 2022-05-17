//액션 함수 생성
export const saveJwt = token => ({
  type: SET_TOKEN,
  token,
});

const initialState = {
  token: '',
};

export default function jwt(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        jwt: action.token,
      };

    default:
      return state;
  }
}
