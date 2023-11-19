import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import Layout from "../../components/layout"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API } from '../../config/api'
import { SwalLoading } from '../../utils/swal-fire'

const ItemDetail = () => {

  const [job, setJobs] = useState({})
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const getData = async () => {
      const Swal = SwalLoading()
      const result = await API.get('/job/' + id)
      Swal.close()
      setJobs(result.data.data)
    }
    getData()
    
  }, [])

  const contactSeller = () => {
    window.open(`https://wa.me/${job.user.phone_number}`, '_blank', 'noreferrer')
  }
  return (
    <Layout>
      <Card
        body
        className="mx-auto"
        style={{
          width: '1000px',
        }}
      >
        <img
          alt="Sample"
          src={job.image}
          style={{ width: '500px' }}
          className="mx-auto"
        />
        <CardBody className="py-5">
          <CardTitle tag="h5">
            {job.name}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Rp {job.fee}
          </CardSubtitle>
          <CardSubtitle
            className={`mb-2 text-${job.open ? 'success' : 'danger'} fs-4`}
            tag="h6"
          >
            {job.open ? 'Open' : 'Closed'}
          </CardSubtitle>
          <div className="button-wrapper">
            <Button
              onClick={contactSeller}
              color="success"
              className="mt-3 mx-2">
              Hubungi
            </Button>
          </div>
          <CardText className="mt-5">
            {job.description}
          </CardText>
        </CardBody>
      </Card>
    </Layout>
  )
}

export default ItemDetail