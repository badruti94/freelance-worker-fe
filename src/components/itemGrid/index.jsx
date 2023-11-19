import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Col } from "reactstrap"

const ItemGrid = ({ data }) => {
    const { id, name, fee, open, image } = data
    const navigate = useNavigate()

    return (
        <Col>
            <Card>
                <CardImg
                    alt="Card image cap"
                    src={image}
                    top
                    width="100%"
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {name}
                    </CardTitle>
                    <CardSubtitle
                        className={`mb-2 text-${open ? 'success' : 'danger'}`}
                        tag="h6"
                    >
                        {open ? 'Open' : 'Closed'}
                    </CardSubtitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Rp {fee}
                    </CardSubtitle>
                    <Button
                        className="mt-4"
                        onClick={() => navigate('/job/' + id)}
                    >
                        Detail
                    </Button>
                </CardBody>
            </Card>
        </Col>
    )
}

export default ItemGrid