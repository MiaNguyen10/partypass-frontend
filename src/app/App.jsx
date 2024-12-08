import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { PermissionProvider } from "./middlewares/PermissionProvider/PermissionProvider";
import router from "./Router";
import theme from "./theme";
import { UserInfoProvider } from "./middlewares/UserInfoProvider/UserInfoProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PermissionProvider>
        <UserInfoProvider>
          <Suspense fallback={<CircularProgress />}>
            <RouterProvider router={router} />
          </Suspense>
        </UserInfoProvider>
      </PermissionProvider>
    </ThemeProvider>
  );
}

export default App;
