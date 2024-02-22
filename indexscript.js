const createTableCell = (value, isHeader) => {
    const cell = isHeader ? document.createElement('th') : document.createElement('td');
    cell.classList.add("border", "border-black-300", "p-2", "text-wrap");
    cell.textContent = value;
    return cell;
};

const createTableRow = (values, isHeader) => {
    const row = document.createElement('tr');
    values.forEach(value => {
        const cell = createTableCell(value, isHeader);
        row.appendChild(cell);
    });
    return row;
};

const generateTable = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const table = document.createElement('table');
    table.classList.add("border", "border-black-300", "w-full");

    table.appendChild(createTableRow(["ID", "Title", "Description", "Price", "Discount Percentage"], true));
    data.slice(startIndex, endIndex).forEach(product => {
        table.appendChild(createTableRow([product.id, product.title, product.description, product.price, product.discountPercentage]));
    });
    return table;
};

document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 10;
    let currentPage = 1;
    let data = [];

    const renderProductTable = (products) => {
        const table = generateTable(products, currentPage, itemsPerPage);
        document.getElementById('productTable').innerHTML = '';
        document.getElementById('productTable').appendChild(table);
    };

    const updatePaginationButtons = () => {
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === Math.ceil(data.length / itemsPerPage);
    };

    const fetchText2 = () => {
        fetch("https://dummyjson.com/products")
            .then(response => response.json())
            .then(result => {
                data = result.products;
                renderProductTable(data);
                updatePaginationButtons();
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProductTable(data);
            updatePaginationButtons();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            currentPage++;
            renderProductTable(data);
            updatePaginationButtons();
        }
    });

    fetchText2();
});