import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function MainNav() {
    const [searchField, setsearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const submitForm = (e) => {
        e.preventDefault();
        setIsExpanded(false);
        router.push(`/artwork?title=true&q=${searchField}`)

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
                            <Link passHref legacyBehavior href='/'><Nav.Link onClick={(e) => setIsExpanded(false)}>Home</Nav.Link></Link>
                            <Link passHref legacyBehavior href='/search' ><Nav.Link onClick={(e) => setIsExpanded(false)}>Advanced Search</Nav.Link></Link>


                        </Nav>
                        &nbsp;
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
                        </Form>
                        &nbsp;
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">

                                <Link passHref legacyBehavior href='/favourites' ><NavDropdown.Item onClick={(e) => setIsExpanded(false)}>Favourites</NavDropdown.Item></Link>

                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />

        </>
    );
}
