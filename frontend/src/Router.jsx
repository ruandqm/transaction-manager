import { Routes, Route } from 'react-router-dom';
import Users from './pages/users';
import Accounts from './pages/accounts';
import Transactions from './pages/transactions';


export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Users />}>
            </Route>

            <Route path='/contas' element={<Accounts />}>
            </Route>

            <Route path='/movimentacoes' element={<Transactions />}>
            </Route>
        </Routes>
    )
}