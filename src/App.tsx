import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Authentication/LoginPage'
import ForgetPassword from './Authentication/ForgetPassword'
import ForgetPass_OTP from './Authentication/ForgetPass_OTP'
import NewPAssword from './Authentication/NewPAssword'
import 'react-toastify/dist/ReactToastify.css';

// import Sidebar from './Layout Components/Sidebar/Sidebar';
import MasterLayout from './MasterLayout/MasterLayout'
import Dashboard from './Pages/dashboard/Dashboard'
import InvoiceContainer from './Pages/invoice/invoiceContainer'
import Invoice from './Pages/invoice/mainInvoice/Invoice'
// import CustomersContainer from './Pages/Customerspage/CustomersContainer'
import CustomerView from './Pages/Customerspage/CustomerView/CustomerView'
import CustomerEdit from './Pages/Customerspage/CustomerEdit/CustomerEdit'
import { ToastContainer } from 'react-toastify';
import CustomerForm from './Pages/Customerspage/CustomerCreationForm/CustomerForm'
import ExpenseTable from './Pages/Expense/ExpenseTable/ExpenseTable'
import CreateExpense from './Pages/Expense/ExpenseCreation/CreateExpense'
import ExpenseView from './Pages/Expense/ExpenseCreation/ExpenseView'
import ExpenseEdit from './Pages/Expense/ExpenseCreation/ExpenseEdit'
import ItemsTable from './Pages/Items/ItemsTable/ItemsTable'
import AddnewItem from './Pages/Items/AddNewItems/AddnewItem'
import ViewItems from './Pages/Items/ItemsView/ViewItems'
import ItemsEdit from './Pages/Items/ItemsEdit/ItemsEdit'
import CustomersTable from './Pages/Customerspage/CustomerTable/CustomersTable'
import InvoiceView from './Pages/invoice/InvoiceView/InvoiceView'
import InvoiceEdit from './Pages/invoice/InvoiceEdit/InvoiceEdit'
import SettingsMain from './Pages/Setings/SettingsMain'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/forgetpassword' element={<ForgetPassword />}></Route>
        <Route path='/setotp' element={<ForgetPass_OTP />}></Route>
        <Route path='/setpassword' element={<NewPAssword />}></Route>


        {/* <Route path='/sidebar' element={<Sidebar/>}></Route> */}
        <Route path='/masterLayout' element={<MasterLayout><Dashboard /></MasterLayout>}></Route>
        <Route path='/dashboard' element={<MasterLayout><Dashboard /></MasterLayout>}></Route>

        {/*--------------------------Invoice-page-routes----------------------------------*/}
        <Route path='/invoice' element={<MasterLayout> <InvoiceContainer /></MasterLayout>}></Route>
        <Route path='/createInvoice' element={<MasterLayout><Invoice /></MasterLayout>}></Route>
        <Route path='/viewInvoice/:id' element={<MasterLayout><InvoiceView/></MasterLayout>}></Route>
        <Route path='/Editinvoice/:id' element={<MasterLayout><InvoiceEdit/></MasterLayout>}></Route>

        {/*-------------------------------------expenses-page-routes------------------------------- */}
        <Route path='/expenses' element={<MasterLayout><ExpenseTable /></MasterLayout>}></Route>
        <Route path='/expensesAdd' element={<MasterLayout><CreateExpense /></MasterLayout>}></Route>
        <Route path='/expensesView/:id' element={<MasterLayout><ExpenseView /></MasterLayout>}></Route>
        <Route path='/expensesEdit/:id' element={<MasterLayout><ExpenseEdit /></MasterLayout>}></Route>


        {/*--------------------------Customers-page-routes----------------------------------*/}
        {/* <Route path='/customers' element={<MasterLayout><CustomersContainer /></MasterLayout>}></Route> */}
        <Route path='/customers' element={<MasterLayout><CustomersTable /></MasterLayout>}></Route> 
        <Route path="/customersAdd" element={<MasterLayout><CustomerForm /></MasterLayout>}></Route>
        <Route path='/customersView/:id' element={<MasterLayout><CustomerView /></MasterLayout>}></Route>
        <Route path='/customersEdit/:id' element={<MasterLayout><CustomerEdit /></MasterLayout>}></Route>

        {/**------------------------Items-page-routes--------------------------------------- */}
        <Route path='/Items' element={<MasterLayout><ItemsTable /></MasterLayout>}></Route>
        <Route path='/ItemsAdd' element={<MasterLayout><AddnewItem /></MasterLayout>}></Route>
        <Route path='/ItemsView/:id' element={<MasterLayout><ViewItems /></MasterLayout>}></Route>
        <Route path='/ItemsEdit/:id/' element={<MasterLayout><ItemsEdit /></MasterLayout>}></Route>

        {/**-------------------------------------Invoice-Settings-Page------------------------------------------- */}
        <Route path="/settings" element={<MasterLayout><SettingsMain /></MasterLayout>}></Route>

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
