import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import Layout from "../../components/layout"
import { useEffect, useState } from "react"
import { API, getConfig } from "../../config/api"
import { useNavigate, useParams } from "react-router-dom"
import { SwalLoading, SwalFire } from '../../utils/swal-fire'

const ItemAdd = () => {
  const navigate = useNavigate()

  const [job, setJob] = useState({
    name: '',
    description: '',
    fee: '',
    image: '',
  })
  const [imgPreview, setImgPreview] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const params = useParams()

  useEffect(() => {
    const getData = async () => {
      const Swal = SwalLoading()

      const result = await API.get('/job/' + id)
      Swal.close()

      setJob(result.data.data)
      setImgPreview(result.data.data.image)
    }
    const { id } = params
    if (id) {
      setIsEdit(true)
      getData()
    }
  }, [])

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value })
  }
  const handleChangeImage = (e) => {
    setJob({ ...job, image: e.target.files[0] })
    setImgPreview(URL.createObjectURL(e.target.files[0]))
  }
  const handleSubmit = async (e) => {
    const Swal = SwalLoading()
    try {
      e.preventDefault()

      const formData = new FormData()
      formData.append('name', job.name)
      formData.append('description', job.description)
      formData.append('fee', job.fee)
      formData.append('image', job.image)

      const config = await getConfig()

      let result;
      if (isEdit) {
        result = await API.put('/job/' + params.id, formData, config)
      } else {
        result = await API.post('/job', formData, config)
      }
      Swal.close()
      navigate('/job')

    } catch (error) {
      Swal.close()
      SwalFire('error', error.response.data.message)
      console.log(error);
    }
  }

  return (
    <Layout>
      <Card
        className="mx-auto"
        style={{ width: '50rem' }}
      >
        <CardBody
        >
          <p className="text-center pb-4 fs-3 fw-bold"
          >{isEdit ? 'Edit' : 'Add'} Job</p>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={job.name}
                onChange={handleChange}
                placeholder="Name"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label for="fee">
                Fee
              </Label>
              <Input
                id="fee"
                name="fee"
                value={job.fee}
                onChange={handleChange}
                placeholder="Fee"
                type="number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={job.description}
                onChange={handleChange}
                placeholder="Description"
                type="textarea"
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">
                Image
              </Label> <br />
              {imgPreview && <img
                alt="Sample"
                src={imgPreview}
                style={{ width: '300px' }}
                className="mx-auto"
              />}

              <Input
                id="image"
                name="image"
                onChange={handleChangeImage}
                placeholder="Image"
                type="file"
                className="mt-2"
              />
            </FormGroup>
            <Button color="primary">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>

    </Layout>
  )
}

export default ItemAdd