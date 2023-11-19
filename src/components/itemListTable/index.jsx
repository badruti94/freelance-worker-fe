import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { API, getConfig } from "../../config/api"
import { confirmAlert } from 'react-confirm-alert';

const ItemListTable = ({ data, getData }) => {
    const navigate = useNavigate()

    const { id, name, fee, open } = data
    const handleEdit = async () => {
        try {
            navigate('/job/edit/' + id)
        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = async () => {
        try {
            const closeJob = async () => {
                const config = await getConfig()
                const result = await API.patch(`/job/${id}/close`, {}, config)
                getData()
            }

            const options = {
                title: 'Close Job',
                message: 'Are you sure want to close this job?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: closeJob
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
                keyCodeForClose: [8, 32],
                overlayClassName: "overlay-custom-class-name"
            };

            confirmAlert(options);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {
        try {
            const deleteItem = async () => {
                const config = await getConfig()
                const result = await API.delete('/job/' + id, config)
                getData()
            }

            const options = {
                title: 'Delete Item',
                message: 'Are you sure want to delete this item?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: deleteItem
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
                keyCodeForClose: [8, 32],
                overlayClassName: "overlay-custom-class-name"
            };

            confirmAlert(options);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDetail = async () => {
        try {
            navigate('/job/' + id)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                Rp {fee}
            </td>
            <td>
                {open ? 'Open' : 'Closed'}
            </td>
            <td className="text-center" >
                <Button onClick={handleEdit} className="me-2" color="warning" >Edit</Button>
                <Button onClick={handleDelete} className="me-2" color="danger">Delete</Button>
                <Button onClick={handleDetail} className="me-2" color="primary">Detail</Button>
                <Button onClick={handleClose} className="me-2" color="success">Close</Button>
            </td>
        </tr>
    )
}

export default ItemListTable