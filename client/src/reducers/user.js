//액션 타입
const SAVE_JWT = 'jwt/SAVE_JWT';

//액션 함수 생성
export const saveJwt = jwt => ({
  type: SAVE_JWT,
  jwt,
});

function jwt(state = [{ state: null }], action) {
  switch (action) {
    case SAVE_JWT:
      return {
        jwt: action.jwt,
      };
  }
}
