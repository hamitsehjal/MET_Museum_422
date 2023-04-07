import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { getToken, removeToken } from '@/lib/authenticate';
import jwt_decode from 'jwt-decode'

export default function MainNav() {
    const [searchField, setsearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    const submitForm = async (e) => {

        e.preventDefault();
        setsearchField('')
        setIsExpanded(false);
        const queryString = `title=true&q=${searchField}`
        // setSearchHistory(current => [...current, queryString])
        setSearchHistory(await addToHistory(queryString))
        router.push(`/artwork?title=true&q=${searchField}`)

    }
    const token = getToken();
    let userName = ""
    if (token) {
        const decodedToken = jwt_decode(token)
        userName = decodedToken.userName
    }
    function logout() {
        setIsExpanded(false)
        removeToken();
        router.push("/login")
    }
    return (
        <>
            <Navbar className='fixed-top' variant='dark' bg="primary" expand="lg" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand >Hamit Sehjal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={(e) => setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link passHref legacyBehavior href='/'><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === '/'}>Home</Nav.Link></Link>
                            {token && <Link passHref legacyBehavior href='/search' ><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === '/search'}>Advanced Search</Nav.Link></Link>}


                        </Nav>
                        {!token &&
                            <Nav>
                                <Link passHref legacyBehavior href='/register'><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === '/register'}>Register</Nav.Link></Link>
                                <Link passHref legacyBehavior href='/login'><Nav.Link onClick={(e) => setIsExpanded(false)} active={router.pathname === '/login'}>Login</Nav.Link></Link>
                            </Nav>}
                        &nbsp;
                        {token &&
                            <Form className="d-flex" onSubmit={submitForm}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchField}
                                    onChange={(e) => setsearchField(e.target.value)}
                                />
                                <Button variant="success" type='submit'>Search</Button>
                            </Form>}
                        &nbsp;
                        {token && <Nav>
                            <NavDropdown title={userName} id="basic-nav-dropdown">

                                <Link passHref legacyBehavior href='/favourites' ><NavDropdown.Item onClick={(e) => setIsExpanded(false)} active={router.pathname === '/favourites' && token}>Favourites</NavDropdown.Item></Link>
                                <Link passHref legacyBehavior href='/history' ><NavDropdown.Item onClick={(e) => setIsExpanded(false)} active={router.pathname === '/history' && token}>Search History</NavDropdown.Item></Link>
                                {token && <Link passHref legacyBehavior href='/' ><NavDropdown.Item onClick={(e) => { setIsExpanded(false); logout() }} >Logout</NavDropdown.Item></Link>}

                            </NavDropdown>
                        </Nav>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            <br />
            <br />

        </>
    );
}
