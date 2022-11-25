import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Categories = () => {

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    })

    return (
        <section className='py-10 lg:py-32'>
            <div className="container">
                <div className="flex items-baseline">
                    <h2 className='text-2xl font-bold text-center mb-10 whitespace-nowrap'>Product Category</h2>
                    <hr className='w-full' />
                </div>
                <div className='grid lg:grid-cols-3 gap-5'>
                    {
                        categories.map(category =>
                            <Link key={category._id} className='card shadow-xl text-white hover:opacity-80' style={{ background: `${category.color}` }}>
                                <div className="card-body items-center text-center">
                                    <div className="font-bold card-title capitalize">{category.name}</div>
                                </div>
                            </Link>)
                    }

                </div>
            </div>
        </section>
    );
};

export default Categories;