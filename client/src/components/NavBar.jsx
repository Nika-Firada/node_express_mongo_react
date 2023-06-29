import React, { useContext } from 'react'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }
    return (
        <Navbar bg='dark' variant='dark' >
            <Container>
                <Link style={{ color: 'white', textDecoration:'none' }} to={SHOP_ROUTE}>BuyBuy</Link>
                {user.isAuth ? (
                    <Nav className='ml-auto' style={{ color: "white", display: 'flex', gap: '15px'}}>
                        <Button
                            onClick={() => navigate(ADMIN_ROUTE)}
                            variant={'outline-light'}
                        >
                            Admin Panel
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                        >
                            Log Out
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
                    </Nav>
                )}
            </Container>
        </Navbar >
    );
});

export default NavBar