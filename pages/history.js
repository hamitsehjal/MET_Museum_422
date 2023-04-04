
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import { useRouter } from "next/router";
import ListGroup from 'react-bootstrap/ListGroup';
import { Card, ListGroupItem, Button } from "react-bootstrap";
import styles from '@/styles/History.module.css'
import { removeFromHistory } from "@/lib/userData";

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if (!searchHistory) return null;
    let parsedHistory = []

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    })

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`)
    }
    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        // setSearchHistory(current => {
        //     let x = [...current];
        //     x.splice(index, 1)
        //     return x;
        // });
        setSearchHistory(await removeFromHistory(searchHistory[index]))

    }
    return (<>

        {parsedHistory.length > 0 ? <ListGroup>{parsedHistory.map((historyItem, index) =>
            <ListGroupItem className={styles.historyListItem} key={index} onClick={e => historyClicked(e, index)}>
                {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                <Button className="float-end" variant="danger" size="sm"
                    onClick={e => removeHistoryClicked(e, index)}>&times;</Button>

            </ListGroupItem>)}
        </ListGroup> :
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Nothing Here</Card.Title>
                    <Card.Text>
                        Try searching for some artwork
                    </Card.Text>
                </Card.Body>
            </Card>
        }
    </>)
}