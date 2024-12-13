import { NextPage } from 'next';
import DataTable from '@/components/dataTable';

const Home: NextPage = () => {
    const data = [
        { id: 1, name: 'Item 1', description: 'Description of Item 1' },
        { id: 2, name: 'Item 2', description: 'Description of Item 2' },
        { id: 3, name: 'Item 3', description: 'Description of Item 3' },
        { id: 4, name: 'Item 4', description: 'Description of Item 4' },
        { id: 5, name: 'Item 5', description: 'Description of Item 5' },
        { id: 6, name: 'Item 6', description: 'Description of Item 6' },
        // Agrega más datos si es necesario
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Data Table with Modals</h1>
            <DataTable data={data} />
        </div>
    );
};

export default Home;
