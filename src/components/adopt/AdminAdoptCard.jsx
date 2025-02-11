import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import useAuthStore from '@/src/stores/AuthStore'
import { getRequestScore } from '@/src/apis/AdminReportApi'
import InfoModal from '../admin-components/AdoptRequestModal'


const AdminAdoptCard = ({ img, petName, name, phone, email, requestId, page, data }) => {
    const token = useAuthStore(state => state.token)
    const [load, setLoad] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = () => {
        console.log(data)
        setModalData(data);
        setIsModalOpen(true);
    };

    useEffect(() => {
        setDetail('')
        setScore('')
    }, [page])
    const [detail, setDetail] = useState('')
    const [score, setScore] = useState('')
    const hdlScore = async () => {
        try {
            setLoad(true)
            const resp = await getRequestScore(token, requestId)
            console.log(resp)
            setLoad(false)
            setDetail(resp?.data?.message?.shortDetail)
            setScore(resp?.data?.message?.score)

        } catch (err) {
            console.error('Error fetching score:', err)
        }
    }
    const hdlClear = () => {
        setDetail('')
        setScore('')
    }
    console.log('re render')
    console.log(data)
    return (
        <div className=' flex items-center'>
            <div className="h-[200px] border border-black rounded-xl p-3 m-2 flex-1">
                <div className='flex gap-3 items-center'>
                    <img
                        src={img}
                        alt="Card Image"
                        className='w-[100px] h-[100px] object-cover rounded-full'
                    />
                    <h3 className="font-bold">น้องชื่อ:</h3>
                    <p className="">{petName}</p>
                    <h3 className="font-bold">สถานะ:</h3>
                    <p className="">{data.status}</p>
                </div>
                <ul className="flex gap-2">
                    <li><strong>ชื่อผู้ขอรับเลี้ยง:  </strong>{name}</li>
                    <li><strong>อีเมล : </strong>{email}</li>
                    <li><strong>เบอร์โทร :</strong>{phone}</li>

                </ul>
                <div className='flex gap-2 items-center'>
                    <Button onClick={hdlScore}>ประเมินเบื้องต้นด้วย Ai</Button>
                    <Button onClick={handleOpenModal}>ดูข้อมูล</Button>
                    <InfoModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={data}
                        requestId ={requestId}
                    />
                    {score && <Button onClick={hdlClear}>clear</Button>}
                    {load && <p className=' self-center'>loading.......</p>}

                </div>

            </div>

            {score && <div className='flex-1'>
                <p><strong>คะแนน:</strong> {score} /100</p>
                <div>
                    <strong>รายละเอียด:</strong>
                    <p>{detail}</p>
                </div>
            </div>}

        </div>


    )
}

export default AdminAdoptCard