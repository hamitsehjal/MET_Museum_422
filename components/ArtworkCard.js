import useSWR from 'swr'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Error from 'next/error';
export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error)
        return (<Error statusCode={404} />)

    if (!data)
        return null;
    return (<>

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} style={{ height: '10rem', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>


                <Card.Text>
                    <b>Date: </b>{data.objectDate ? data.objectDate : "N/A"}
                    <br />
                    <b>classification: </b>{data.classification ? data.classification : "N/A"}
                    <br />

                    <b>Medium: </b>{data.medium ? data.medium : "N/A"}
                    <br />
                    <br />

                </Card.Text>


                <Link href={`/artwork/${objectID}`} passHref legacyBehavior>

                    <Button variant="primary">{objectID}</Button>
                </Link>
            </Card.Body>
        </Card>

    </>)
}