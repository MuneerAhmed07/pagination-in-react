import { useState, useEffect } from 'react';
import axios from 'axios';
import PaginationControls from './PaginationControls';

const PaginationList = () => {

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    console.log(items);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setItems(response.data);
                setTotalItems(response.data.length);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchItems();
    }, []);

    const lastIndex = currentPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentItems = items.slice(firstIndex, lastIndex);

    console.log(lastIndex);
    console.log(firstIndex);
    console.log(currentItems);

    return (
        <div className='paginated-list'>
            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <ul>
                            {
                                currentItems.map((item) => (
                                    <li key={item.id}>
                                        <h3>{item.title}</h3>
                                        <p>{item.body}</p>
                                    </li>
                                ))
                            }
                        </ul>
                        </>
                )
            }
            <PaginationControls
                currentPage = {currentPage}
                itemsPerPage = {itemPerPage}
                totalItems = {totalItems}
                onPageChange= {setCurrentPage}
            />
        </div>
    )
}

export default PaginationList;
