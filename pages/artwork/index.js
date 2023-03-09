import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pagination, Row, Card, Col } from "react-bootstrap";
import useSWR from 'swr'
import ArtworkCard from "@/components/ArtworkCard";
const PER_PAGE = 12;
export default function Artwork() {
    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const finalQuery = router.asPath.split('?')[1];

    const previousPage = () => {
        console.log("Previous")
        console.log(page)
        if (page > 1)
            setPage(page => page - 1)
    }
    const nextPage = () => {
        console.log("next")
        console.log(page)
        console.log(artworkList.length)

        if (page < artworkList.length)
            setPage(page => page + 1)

    }

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    useEffect(() => {
        if (data != null && data != undefined) {
            let results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                let chunks = data?.objectIDs?.slice(i, i + PER_PAGE)
                results.push(chunks)
            }
            setArtworkList(results)
            setPage(1)

        }
    }, [data])

    if (error)
        return (<Error statusCode={404} />)

    if (!data)
        return null


    return (
        <>
            {/* Rendering a row of horizontal components with gap of 1.5 rem between components */}
            <Row className="gy-4">
                {artworkList.length > 0 ?
                    artworkList[page - 1].map((value) => (<Col lg={3} key={value}><ArtworkCard objectID={value} /></Col>)) :
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Nothing Here</Card.Title>
                                <Card.Text>
                                    Try searching for something else.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                }
            </Row>
            {artworkList.length > 0 && <Row className="gy-4 mt-4">
                <Col >
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>

                </Col>

            </Row>}
        </>
    )



}

