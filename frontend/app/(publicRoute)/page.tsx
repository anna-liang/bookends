import { getUser } from '@/api/authService';
import ShelvesNames from '../(protected)/shelves/shelvesNames';
import Search from '../search/search';

export default async function Home() {
    const user = await getUser()

    return (<div className='flex min-h-screen items-center flex-col'>
        <Search />
        {!user ? null : <ShelvesNames />}
    </div>
    );
}
