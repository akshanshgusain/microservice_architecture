import axios from "axios";
import buildClient from "../api/build-client";

// const LandingPage = ({ currentUser }) => {
//   console.log(currentUser);
//   axios.get('/api/users/currentuser').catch((err) => {
//     console.log(err.message);
//   });

//   return <h1>Landing Page</h1>;
// };

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are Signed in</h1>
  ) : (
    <h1>Main - Index Changed 4</h1>
  );
};

// Not a Component
LandingPage.getInitialProps = async (context) => {
  // if (typeof window == "undefined") {
  //   // Server Side
  //   // Request should be made to: https://ingress-nginx.ingress-nginx-srv.auth-srv/asfasf
  //   const { data } = await axios.get(
  //     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
  //     {
  //       headers: req.headers,
  //     }
  //   );
  //   return data;
  // } else {
  //   // // Browser side
  //   const { data } = await axios.get("/api/users/currentuser");
  //   return data;
  // }

  const { data } = await buildClient(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
