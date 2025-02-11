import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { passwordRegExp } from "../../core/utils/regexFormat";
import { authenticate } from "../../core/thunk/authenticate";
import { useDispatch } from "react-redux";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      const username = data.get("username");
      const password = data.get("password");

      dispatch(authenticate({ email: username, password }))
        .unwrap()
        .then((response) => {
          sessionStorage.setItem("token", response.token);
          navigate("/");
        })
        .catch((error) => {
          //console.log("Login failed:", error);
          setErrorLogin(`Login failed. ${error.message}`);
        });
    }
  };

  const validateInputs = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let isValid = true;

    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter username");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password || !passwordRegExp.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must be at least 6 characters long, have at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                type="username"
                name="username"
                placeholder="Username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={usernameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="Password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            {errorLogin && (
              <Typography color="error" variant="body2">
                {errorLogin}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
