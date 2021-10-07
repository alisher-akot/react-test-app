import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../Button/MyButton";
import {AuthContext} from "../../../Context";

const Navbar = () => {

  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <div className="navbar">
      <MyButton onClick={logout}>
        Выйти
      </MyButton>
      <div className="navbar__links">
        <Link to="/about" className="link">О сайте</Link>
        <Link to="/posts" className="link">Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;