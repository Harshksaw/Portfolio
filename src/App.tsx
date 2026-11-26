import { lazy, Suspense } from "react";
import MainContainer from "./components/MainContainer";

const Resume = lazy(() => import("./components/Resume"));

const isResumeRoute = () =>
  typeof window !== "undefined" &&
  window.location.pathname.replace(/\/+$/, "") === "/resume";

const App = () => {
  if (isResumeRoute()) {
    return (
      <Suspense fallback={null}>
        <Resume />
      </Suspense>
    );
  }

  return <MainContainer />;
};

export default App;
