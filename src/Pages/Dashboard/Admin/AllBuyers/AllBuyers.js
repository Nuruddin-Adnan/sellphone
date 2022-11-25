import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {
    // Queries
    const { data: allBuyers = [], isLoading } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allBuyers`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json()
            return data
        }
    })
    return (
        <div>
            All Buyers {allBuyers.length}
        </div>
    );
};

export default AllBuyers;