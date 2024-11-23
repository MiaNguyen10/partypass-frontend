import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import theme from "./theme";
import PermissionProvider from "./middlewares/PermissionProvider/PermissionProvider";

function App() {
  return (
    <PermissionProvider>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<CircularProgress />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </PermissionProvider>
  );
}

export default App;
