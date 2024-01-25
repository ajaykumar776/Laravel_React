const { Paper } = require("@mui/material")

const AuthLayout = ({ children }) => {

    return (
        <Paper elevation={3} style={{ padding: 20, maxWidth: 300, margin: 'auto', marginTop: 100 }}>
            {children}
        </Paper>
    )
}
export default AuthLayout;