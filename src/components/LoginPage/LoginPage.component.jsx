import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={s.loginpage_container}>
      <form className={s.form_login}>
        <div className= {s.input_block}>
            <label for="login"> Login: </label>
            <input
            type={"text"}
            className={s.input}
            name="login"
            id="login"
            placeholder="Enter your login"
            />
        </div>

        <div className= {s.input_block}>
            <label for="password"> Password: </label>
            <input
            type={"password"}
            className={s.input}
            name="password"
            placeholder="Enter your password"
            />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
