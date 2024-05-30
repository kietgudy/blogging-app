import { ActionDelete, ActionEdit } from 'components/action';
import { LabelStatus } from 'components/label';
import { Table } from 'components/table';
import { db } from 'firebase-app/firebase-config';
import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { userRole, userStatus } from 'utils/constants';

const UserTable = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate(); 
    useEffect(() => {
        const colRef = collection(db, "users");
        onSnapshot(colRef, snapshot => {
            const results =[];
            snapshot.forEach(doc => {
                results.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setUserList(results);
        })
    },[]);
const renderLabelRole = (role) => {
    switch (role) {
        case userRole.AMIN:
            return "ADMIN"
        case userRole.MOD:
            return "MOD"
        case userRole.USER:
            return "USER"
        default:
            break;
    }
}

    const renderLabelStatus = (status) => {
        switch (status) {
            case userStatus.ACTIVE:
                return <LabelStatus type='success'>ACTIVE</LabelStatus>
            case userStatus.PENDING:
                return <LabelStatus type='warning'>PENDING</LabelStatus>
            case userStatus.BAN:
                return <LabelStatus type='danger'>REJECTED</LabelStatus>
        
            default:
                break;
        }
    };
    const handleDeleteUser = async (user) => {
        const colRef = doc(db, "users", user.id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await deleteDoc(colRef);
              await deleteDoc(colRef);
             await deleteUser(user);
             toast.success("Delete user successfully!")
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
    }
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Information</th>
                        <th>Username</th>
                        <th>Email address</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 && userList.map(user => (

                    <tr key={user.id}>
                        <td title={user.id}>
                            {user.id.slice(0, 5) + "..."}
                        </td>
                        <td className='whitespace-nowrap'>
                            <div className="flex items-center gap-x-3">
                                <img src={user?.avatar}
                                className='flex-shrink-0 object-cover w-10 h-10 rounded-full' alt="" />
                                <div className="flex-1">
                                    <h3>{user?.fullname}</h3>
                                    <time className='text-sm text-gray-500'>{new Date(user?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}</time>
                                </div>
                            </div>
                        </td>
                        <td>{user?.username}</td>
                        <td>{user?.email}</td>
                        <td>{renderLabelStatus(Number(user?.status))}</td>
                        <td>{renderLabelRole(Number(user?.role))}</td>
                        <td>
                        <div className="flex gap-5 text-gray-500">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete>
                  </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;