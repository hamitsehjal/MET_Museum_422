import useSWR from 'swr'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Error from 'next/error'
export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error)
        return (<Error statusCode={404} />)

    if (!data)
        return null;


    return (<>

        <Card >
            {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
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

                    <b>Artist: </b>{data.artistDisplayName ?
                        <>
                            {data.artistDisplayName}&nbsp;
                            {data.artistWikidata_URL && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" ><mark>(wiki)</mark></a>}
                        </>
                        : "N/A"
                    }

                    <br />
                    <b>Credit Line: </b> {data.creditLine ? data.creditLine : "N/A"}
                    <br />

                    <b>Dimensions: </b> {data.dimensions ? data.dimensions : "N/A"}
                    <br />


                </Card.Text>


                {/* <Link href={`/artwork/${objectID}`} passHref legacyBehavior>

                    <Button variant="primary">{objectID}</Button>
                </Link> */}
            </Card.Body>
        </Card>

    </>)
}