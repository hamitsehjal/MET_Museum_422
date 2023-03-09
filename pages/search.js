import { useRouter } from "next/router";
import { Row, Col, Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
export default function AdvancedSearch() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const submitForm = (data) => {
        const router = useRouter();
        let queryString = "";
        queryString + `${data.searchBy}=true`;
        if (data.geoLocation != undefined && data.geoLocation != null)
            queryString + `&geoLocation=${geoLocation}`

        if (data.medium != undefined && data.medium != null)
            queryString + `&medium=${medium}`


        queryString + `&isOnView=${data.isOnView}`;
        queryString + `&isHighlight=${data.isHighlight}`;
        queryString + `&q=${data.q}`;

        console.log(queryString)
        router.push(`/artwork?${queryString}`)
    }
    return (<>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control type="text" placeholder="" className={errors.q && "is-invalid"} {...register("q", { required: true })} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Label>Search By</Form.Label>
                    <Form.Select className="mb-3" {...register('searchBy')} >
                        <option value="title">Title</option>
                        <option value="tags">Tags</option>
                        <option value="artistOrCulture">Artist or Culture</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control type="text" placeholder="" {...register("geoLocation")} />
                        <Form.Text className="text-muted">
                            Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control type="text" placeholder="" {...register("medium")} />
                        <Form.Text className="text-muted">
                            Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Check
                        type="checkbox"
                        label="Highlighted"
                        {...register("isHighlight")}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Currently on View"
                        {...register("isOnView")}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form></>)
}