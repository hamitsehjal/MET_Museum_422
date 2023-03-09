import { useRouter } from "next/router";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import useSWR from 'swr'
const PER_PAGE = 12;
export default function Artwork() {
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);
    const router = useRouter();
    const finalQuery = router.asPath.split('?')[1];

    const previousPage = () => {
        if (page > 1)
            setPage(prev => prev - 1)
    }
    const nextPage = () => {
        if (page < artworkList.length)
            setPage(prev => prev + 1)

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
                {(artworkList.length > 0) ?
                    artworkList[page - 1].map((value) => { <Col lg={3} key={value.ObjectID}><ArtworkCard objectID={value.ObjectID} /></Col> }) :

                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Nothing Here</Card.Title>
                            <Card.Text>
                                Try searching for something else.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                }
            </Row>
            {artworkList.length > 0 && <Row>
                <Pagination.Prev onClick={previousPage}></Pagination.Prev>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}></Pagination.Next>
            </Row>}
        </>
    )



}

