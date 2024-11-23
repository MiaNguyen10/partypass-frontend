import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        {/* <Router /> */}
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
