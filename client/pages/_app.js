import "bootstrap/dist/css/bootstrap.css";
import { Fragment } from "react";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  console.log(currentUser);
  return (
    <Fragment>
      <Header currentUser={currentUser}></Header>
      <Component {...pageProps} />;
    </Fragment>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  // passing page props to explicitly invoke getInitialProps of LandingPage component
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
