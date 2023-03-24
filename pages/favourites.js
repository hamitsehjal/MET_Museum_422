import { useAtom } from "jotai";
import { favoriteAtom } from "@/store";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
export default function Favourites() {
    const [favouritesList] = useAtom(favoriteAtom);
    return (<>
        {/* Rendering a row of horizontal components with gap of 1.5 rem between components */}
        <Row className="gy-4 gx-2">
            {favouritesList.length > 0 ?
                favouritesList.map((value) => (<Col lg={3} key={value}><ArtworkCard objectID={value} /></Col>)) :
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Nothing Here</Card.Title>
                            <Card.Text>
                                Try adding some new artwork to the list.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            }
        </Row>


    </>)


}