import { lazy, Suspense } from "react";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";

const MainContainer = lazy(() => import("./components/MainContainer"));
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

  return (
    <LoadingProvider>
      <Suspense>
        <MainContainer />
      </Suspense>
    </LoadingProvider>
  );
};

export default App;
