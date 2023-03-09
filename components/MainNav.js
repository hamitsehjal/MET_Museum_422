import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function MainNav() {
    const [searchField, setsearchField] = useState('search');
    const router = useRouter();
    const submitForm = (e) => {
        e.preventDefault();
        // console.log(`/artwork?title=true&q=${searchField}`)
        router.push(`/artwork?title=true&q=${searchField}`)

    }
    return (
        <>
            <Navbar variant='dark' bg="primary" expand="lg">
                <Container fluid>
                    <Navbar.Brand >Hamit Sehjal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link passHref legacyBehavior href='/'><Nav.Link>Home</Nav.Link></Link>
                            <Link passHref legacyBehavior href='/search'><Nav.Link>Advanced Search</Nav.Link></Link>


                        </Nav>
                        <Form className="d-flex" onSubmit={submitForm}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchField}
                                onChange={(e) => setsearchField(e.target.value)}
                            />
                            <Button variant="outline-success" type='submit'>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
