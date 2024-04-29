        import React, { useEffect, useState } from 'react';
        import DataTable from 'react-data-table-component';
        import 'bootstrap/dist/css/bootstrap.min.css';

        const Products = () => {
        const [products, setProducts] = useState([]);
        const [filterText, setFilterText] = useState('');
        const [resetPaginationToggle] = useState(false);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        const filteredItems = products.filter((item) =>
        item.firstName && item.lastName.includes(filterText)
        );

        const columns = [
        {
        name: 'Id',
        selector: (row) => row.id,
        sortable: true,
        },
        {
            name: 'Customer Name',
            selector: (row) => `${row.firstName} ${row.lastName}`,
            sortable: true,
          },
        {
        name: 'Amount',
        selector: (row) => row.amount,
        sortable: true,
        },
        {
        name: 'Khmer Name',
        selector: (row) => row.firstNameInKhmer,
        sortable: true,
        },
        {
            name: 'Number Phone1',
            selector: (row) => row.phoneNumbers1,
            sortable: true,
            },
            {
                name: 'Number Phone2',
                selector: (row) => row.phoneNumbers2,
                sortable: true,
                },
                {
                    name: 'Identity',
                    selector: (row) => row.identityNo,
                    sortable: true,
                    },
        {
        name: 'Actions',
        cell: (row) => (
        <div>
        <button className='btn btn-primary mr-5'>Edit</button>
        <button className='btn btn-danger'>Delete</button>
        </div>
        ),
        },
        ];

        useEffect(() => {
        fetch('https://sc-mfi.onrender.com/api/v1/customers')
        .then((res) => res.json())
        .then((data) => {
        setProducts(data);
        setLoading(false);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
        });
        }, []);
        const subHeaderComponent = (
        <input
        onChange={(e) => setFilterText(e.target.value)}
        value={filterText}
        type='text'
        placeholder='Search'
        className='input input-bordered bg-gray-200 text-black w-full max-w-xs'
        />
        );

        if (loading) {
        return <div>Loading...</div>;
        }

        if (error) {
        return <div>{error}</div>;
        }

        return (
        <div>
        <DataTable title='List Of Product' columns={columns} data={filteredItems} pagination highlightOnHover paginationResetDefaultPage={resetPaginationToggle}
         subHeader subHeaderComponent={subHeaderComponent} selectableRows persistTableHead />
        </div>
        );
        };
        export default Products
