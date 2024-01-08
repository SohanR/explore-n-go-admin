import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { baseUrl } from "../../utils/base";

function Order() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/orders`);
      console.log("taxi", res);
      setData(res.data);
    };
    datass();
  }, []);

  //   const handleDlt = (id) => {
  //     try {
  //       axios.delete(`${baseUrl}/taxi/${id}`);
  //       setData(data.filter((item) => item.id !== id));
  //       console.log(`deleted room ${id}`);
  //       window.location.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 310,
      renderCell: (param) => <div className="userr">{param.row._id}</div>,
    },
    {
        field: "customer",
        headerName: "customer Name",
        width: 310,
        renderCell: (param) => <div className="userr">{param.row.user.fullname}</div>,
      },
    {
      field: "orderType",
      headerName: "Order Type",
      width: 140,
      style: { color: "red" },
      renderCell: (param) => <div className="userr">{param.row.serviceType}</div>,
    },
    {
      field: "start Date",
      headerName: "start Date",
      width: 240,
      renderCell: (param) => (
        <div className="userr">{param.row.startDate}</div>
      ),
    },
    {
        field: "End Date",
        headerName: "End Date",
        width: 240,
        renderCell: (param) => (
          <div className="userr">{param.row.endDate}</div>
        ),
      },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      width: 140,
      renderCell: (param) => (
        <div className="userr">{param.row.totalPrice}</div>
      ),
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 160,
    //   renderCell: (params) => (
    //     <div className="actionn">
    //       <button
    //         type="button"
    //         className="delete_btn"
    //         onClick={() => handleDlt(params.row._id)}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="room_page">
      <Sidebar />

      <div className="room_page_main">
        <Navbar />

        <div className="room_page_table">
          <DataGrid
            className="data_grid"
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
