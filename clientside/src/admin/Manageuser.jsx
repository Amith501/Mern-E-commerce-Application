
// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers,deleteuser } from "../Redux/Feature/authslice"
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// const Manageuser = () => {
//   const dispatch = useDispatch();
//   const { users, status } = useSelector((state) => state.users);


//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const columnDefs = useMemo(() => [
//     { headerName: 'Name', field: 'name', sortable: true, filter: true },
//     { headerName: 'Email', field: 'email', sortable: true, filter: true },
//     { headerName: 'Role', field: 'role', sortable: true, filter: true },
//     {
//       headerName: 'Actions',
//       field: 'actions',
//       cellRendererFramework: (params) => (
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleDelete(params.data._id)}
//             className="bg-red-500 text-white px-2 py-1 rounded"
//           >
//             Delete
//           </button>
//           <button
//             onClick={() => handleRoleToggle(params.data._id, params.data.role)}
//             className="bg-blue-500 text-white px-2 py-1 rounded"
//           >
//             Toggle Role
//           </button>
//         </div>
//       ),
//     },
//   ], []);

//   const handleDelete = async (userId) => {
//     // implement API call here
//     console.log('Delete user:', userId);
//   };

//   const handleRoleToggle = async (userId, currentRole) => {
//     // implement API call here
//     console.log('Toggle role:', userId, '->', currentRole === 'admin' ? 'user' : 'admin');
//   };

//   return (
//     <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
//       {status === 'loading' ? (
//         <p>Loading...</p>
//       ) : (
//         <AgGridReact
//           rowData={users}
//           columnDefs={columnDefs}
//           pagination={true}
//           paginationPageSize={10}
//           domLayout="autoHeight"
//         />
//       )}
//     </div>
//   );
// };

// export default Manageuser;


import React from 'react'

const Manageuser = () => {
  return (
    <div>Manageuser</div>
  )
}

export default Manageuser