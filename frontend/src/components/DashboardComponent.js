const DashboardComponent = () => {
    const name = localStorage.getItem('name');
    return (
        <h1>Welcome , {name}</h1>
    );
}
export default DashboardComponent;