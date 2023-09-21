import React, { Component, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import cookie from "react-cookies";
import { useAuthQueries } from "../../queries/auth.query";
import LoaderComponent from "../../components/utils/Loader.component";
import { useGlobalStore } from "../../stores/global.store";
import { Simulate } from "react-dom/test-utils";
import { Transition, TransitionGroup } from "react-transition-group";

const TIMEOUT = 300;
const getTransitionStyles = {
  entering: {
    position: "absolute",
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
};
export const PrivateRoute = () => {
  /* State */
  const [loading, setLoading] = useState(true);

  /* Query */
  const { isError, isLoading, userInfoData, isFetching, refetch } =
    useAuthQueries();

  const location = useLocation();

  /* Store */
  const { setUserInfo, resetUserInfo, setSpin } = useGlobalStore();

  useEffect(() => {
    userInfoData ? setUserInfo(userInfoData) : resetUserInfo();
    refetch();
  }, [location.pathname]);

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
      setSpin(true);
    } else {
      setTimeout(() => {
        setLoading(false);
        setSpin(false);
      }, 300);
    }
  }, [isFetching]);
  if (isLoading) return <LoaderComponent />;
  if (isError) return <Navigate to="/login" />;

  return (
    <TransitionGroup>
      <Transition timeout={TIMEOUT}>
        {(status) => (
          // @ts-ignore
          <div style={{ ...getTransitionStyles[status] }}>
            <Outlet />
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
};
