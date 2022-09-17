import './app-info.css'

const AppInfo = ({employees, increased}) => {
    return (
        <div className="app-info">
            <h1>Облік працівників в компанію ЮЮЮ</h1>
            <h2>Загальна к-сть працівників: {employees} </h2>
            <h2>Премію отрумають: {increased}</h2>
        </div>
    )
}

export default AppInfo