import useSWR from 'swr'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Error from 'next/error'
import { useAtom } from 'jotai';
import { favoriteAtom } from '@/store';
import { useEffect, useState } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCardDetail({ objectID }) {
    const [favouritesList, setFavouritesList] = useAtom(favoriteAtom);
    const [showAdded, setShowAdded] = useState(false)

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])




    const favouritesClicked = async () => {
        if (showAdded) {

            // setFavouritesList(current => current.filter(fav => fav != objectID));
            setFavouritesList(await removeFromFavourites(objectID))
            // setShowAdded(false);
        }
        else {
            // setFavouritesList(current => [...current, objectID])
            setFavouritesList(await addToFavourites(objectID))
            // setShowAdded(true)
        }
    }

    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)

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
                    <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>{showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>


                </Card.Text>


            </Card.Body>
        </Card>

    </>)
}