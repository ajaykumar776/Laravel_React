import Header from "../components/layout/HeaderComponent";
import Sidebar from "../components/layout/SidebarComponent";

const DashboardLayout = ({ children }) => {


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Header />
            <div style={{ flex: 1, padding: '20px' }}>
                {children}
            </div>
        </div>

    )
}
export default DashboardLayout;