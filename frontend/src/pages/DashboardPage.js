import SubcategoryComponent from "../components/subcategory/ListSubCategoryComponent";
import CategoryComponent from "../components/category/List";
import DashboardComponent from "../components/DashboardComponent";
import DashboardLayout from "../layouts/DashboardLayout";
import { useLocation } from "react-router-dom";
import EditCategoryComponent from "../components/category/Edit";
import AddComponent from "../components/category/Add";
import AddSubcategory from "../components/subcategory/AddSubCategoryComponent";
import EditSubcategory from "../components/subcategory/EditSubCategoryComponent";
import UserProfileUpdate from "../components/profile/UserProfileComponent";
import LogoutComponent from "../components/auth/LogoutComponent";
import UserList from "../components/users/UserListComponent";
import UserEditComponent from "../components/users/UserEditComponent";

const DashboardPage = () => {
    const location = useLocation();
    const currentLocation = location.pathname.split('/')[1];
    console.log(currentLocation);
    const componentMapping = {
        dashboard: DashboardComponent,
        category: CategoryComponent,
        categoryadd: AddComponent,
        editcategory: EditCategoryComponent,
        subcategory: SubcategoryComponent,
        subcategoryadd: AddSubcategory,
        editsubcategory: EditSubcategory,
        users: UserList,
        userEdit: UserEditComponent,
        profile: UserProfileUpdate,
        logout: LogoutComponent,
    };
    const MyComponent = componentMapping[currentLocation];
    return (
        <DashboardLayout>
            <div style={{ marginTop: "80px" }}>
                <MyComponent />
            </div>
        </DashboardLayout>
    );
}
export default DashboardPage;