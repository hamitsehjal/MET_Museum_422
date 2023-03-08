import useSWR from 'swr'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error)
        return (<Error statusCode={404} />)

    if (!data)
        return null;
    return (<>

        <Card style={{ width: '18rem' }}>
            {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
            <Card.Body>
                <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>


                <Card.Text>
                    {data.objectDate ? data.objectDate : "N/A"}
                    <br />
                    {data.classification ? data.classification : "N/A"}
                    <br />

                    {data.medium ? data.medium : "N/A"}
                    <br />
                    <br />

                    {data.artistDisplayName ?
                        <>
                            {data.artistDisplayName}
                            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>
                        </>
                        : "N/A"
                    }

                    <br />
                    {data.creditLine ? data.creditLine : "N/A"}
                    <br />

                    {data.dimensions ? data.dimensions : "N/A"}
                    <br />


                </Card.Text>


                <Link href={`/artwork/${objectID}`} passHref legacyBehavior>

                    <Button variant="primary">{objectID}</Button>
                </Link>
            </Card.Body>
        </Card>

    </>)
}