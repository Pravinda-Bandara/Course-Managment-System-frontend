
const TableHeader = ({ columns }) => {
    return (
        <thead className="bg-gray-200 ">
        <tr>
            {columns.map((column, index) => (
                <th key={index} className="px-4 py-2 border">{column}</th>
            ))}
        </tr>
        </thead>
    );
};

export default TableHeader;
