import React from 'react';

const TableRow = ({ rowData }) => {
    return (
        <tr className="hover:bg-gray-100">
            {rowData.map((data, index) => (
                <td key={index} className="px-4 py-2 border">{data}</td>
            ))}
        </tr>
    );
};

export default TableRow;
