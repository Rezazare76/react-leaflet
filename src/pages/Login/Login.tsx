import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Alert from "../../components/Alert/Alert";
import loadingImg from "../../assets/images/loading.svg";
import "./Login.scss";
const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setLoginState] = useState<string | null>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // handle error login
  const handleError = () => {
    setError("نام کاربری یا رمز عبور اشتباه است");
    setTimeout(() => {
      setError("");
    }, 2000);
  };
  // handle form submit
  const submit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://exam.pishgamanasia.com/webapi/Account/Login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: userName,
              password: password,
            }),
          }
        ).then((response) => response.json());
        if (response.status) {
          setLoginState(response.data.userToken);
          const expirationTime = new Date();
          // add 24 hour expire for user login it should handle in server but i don't have access
          expirationTime.setHours(expirationTime.getHours() + 24);
          localStorage.setItem(
            "token",
            JSON.stringify({
              token: response.data.userToken,
              expire: expirationTime.toString(),
            })
          );
          setIsLoading(false);
          navigate("/map-view");
        } else {
          handleError();
          setIsLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        handleError();
        setIsLoading(false);
      }
    },
    [navigate, password, userName]
  );

  return (
    <>
      <section className="login bg-secondary h-100 d-flex align-items-center justify-content-center ">
        <div
          className={`login-section d-flex align-items-center flex-column bg-secondary p-3  rounded-4 ${
            error && "error"
          }`}
        >
          <span className="text-primary">ورود</span>
          <form onSubmit={submit} className="w-100">
            <Input
              placeholder="نام کاربری"
              value={userName}
              setValue={setUserName}
              required={true}
              name="username"
            />
            <Input
              placeholder="کلمه عبور"
              value={password}
              setValue={setPassword}
              type="password"
              required={true}
              name="password"
            />
            <button
              className={`w-100 rounded-2 p-1 position-relative transition rounded-4 bg-warning ${
                userName.length > 0 && password.length > 0
                  ? " cursor-pointer"
                  : " cursor-none-drop  not-allow "
              }`}
              type="submit"
            >
              {isLoading && (
                <img
                  src={loadingImg}
                  alt="loading.svg"
                  width="30px"
                  className={`loading position-absolute ${isLoading}`}
                />
              )}
              {isLoading ? "درحال ورود..." : "ورود"}
            </button>
          </form>
        </div>
      </section>

      <Alert message={error} />
    </>
  );
};

export default Login;
