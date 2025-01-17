import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet,apiPost } from "../services/client";
import moment from "moment";
import Loading from './Loading';
import 'datatables.net-buttons/js/dataTables.buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import jszip from 'jszip';
import pdfmake from 'pdfmake'
    
const AdminPackageReportsLayer = () => {
    const [data,setData] = useState([]); 
    const [loading,setLoading] = useState(false);
    const getData = async () => {
        setLoading(true);
        try {
            const res = await apiGet("superadmin/admin-package");
            if (res?.data?.status === true) {
                console.log(res?.data?.data);
                const newData = res?.data?.data;
                setData(newData);
                setTimeout(() => {
                    $("#dataTable").DataTable({
                        pageLength: 10,
                        dom: 'Bfrtip', 
                        buttons: [
                            {
                                extend: 'csv', // Download CSV
                                text: ' <img src="../assets/images/csv.png" alt="CSV" width="20" height="20" /> CSV',
                            },
                            {
                                extend: 'pdf', // PDF export
                                text: '<img src="../assets/images/pdf.png" alt="CSV" width="20" height="20" /> PDF',
                                orientation: 'landscape',
                                pageSize: 'A4',
                                title: 'Inactive Users',
                                exportOptions: {
                                    columns: ':visible', // Export only visible columns
                                },
                            },
                            {
                                extend: 'print', // Print table
                                text: '   <img src="../assets/images/print.png" alt="CSV" width="20" height="20" /> Print',
                            },
                        ],
                    });
                }, 0);
            } else {
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.log(e);
        }finally{
            setLoading( false)
        }
    };
    useEffect(() => {
        getData();
        return () => {
            if ($.fn.DataTable.isDataTable("#dataTable")) {
                $("#dataTable").DataTable().destroy(true);
            }
        };
    }, []);
    return (
        <div className="card basic-data-table">
            {loading? <Loading/>:<></>}
            <div className="card-header d-flex justify-content-between">
                Admin Membership
            </div>
            <div className="card-body">
                { data? 
                <table
                    className="table bordered-table mb-0"
                    id="dataTable"
                    data-page-length={10}
                >
                    <thead>
                        <tr>
                     
                            <th scope="col">Username</th>
                            <th scope="col">Package</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.username}</td>
                                <td>{item?.plan_name}</td>
                                <td>{moment(item?.date).format("MMMM Do YYYY")}</td>
                                <td>{moment(item?.expire_date).format("MMMM Do YYYY")}</td>
                                <td>{item?.amount}</td>
                                <td>
                                    {item?.status === "1" ? (
                                        <span className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white   ">Active</span>
                                    ) : (
                                        <span className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white ">Inactive</span>
                                    )}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table> :<></>

                    }
            </div>
        </div>

    )
}

export default AdminPackageReportsLayer



