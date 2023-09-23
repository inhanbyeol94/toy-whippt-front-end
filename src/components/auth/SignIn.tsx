import { S } from "./signIn.style";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalStore } from "../../stores/global.store";
import { useEffect } from "react";

export const SignIn = () => {
  const { setSpin, setHeader } = useGlobalStore();

  useEffect(() => {
    setHeader(false);
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  }, []);

  /* Function */

  return (
    <>
      <S.Content>
        <S.Container>
          <S.LoginBox>
            <p>항해피티는 카카오 로그인 후 이용이 가능합니다.</p>
            <Link to={`${process.env.REACT_APP_SERVER}/auth/login/kakao`}>
              <img src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png" />
            </Link>
          </S.LoginBox>
        </S.Container>
      </S.Content>
    </>
  );
};
