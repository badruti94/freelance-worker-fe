import { Button, Card, CardBody, Table } from "reactstrap"
import ItemListTable from "../../components/itemListTable"
import PaginationComponent from "../../components/pagination"
import Layout from "../../components/layout"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { SwalLoading } from "../../utils/swal-fire"
import { API } from "../../config/api"
import { updatePage, updateTotalData } from "../../config/redux/action"

const Item = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const { page, perPage } = useSelector(state => state.paginationReducer)

  const getData = async () => {
    const Swal = SwalLoading()
    const result = await API.get(`/job?page=${page}perPage=${perPage}`)
    Swal.close()
    setJobs(result.data.data)
    dispatch(updateTotalData(parseInt(result.data.total_data)))
}

useEffect(() => {
    dispatch(updatePage(1))
}, [])

useEffect(() => {
    try {
        getData()
    } catch (error) {
        console.log(error);
    }
}, [page])

  return (
    <Layout>
      <Card
        className="mx-auto"
        style={{ width: '50rem' }}
      >
        <CardBody
        >

          <Button color="primary" onClick={() => navigate('/job/add')}>Add Job</Button>
          <Table
          >
            <thead>
              <tr>
                <th>
                  Title
                </th>
                <th>
                  Price
                </th>
                <th>
                  Status
                </th>
                <th className="text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {
                jobs
                &&
                jobs.map(job => <ItemListTable
                  key={job.id}
                  data={job}
                  getData={getData}
                />)
              }
            </tbody>
          </Table>
          <PaginationComponent />
        </CardBody>
      </Card>
    </Layout>
  )
}

export default Item