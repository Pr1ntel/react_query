import {
    QueryClient,
    QueryClientProvider,
    useQuery, useQueryClient,
} from 'react-query';
import {useState} from "react";

const queryClient = new QueryClient();

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);
const httpNameDefault = 'http://localhost:8080/api/v1/main';
function Example() {
    const { isLoading, error, data: dataUsers } = useQuery(
        'users',
        () =>
            fetch(
                httpNameDefault + '/all-users'
            ).then((response) => response.json())
    );


    const [getUsers, setGetUsers] = useState([]);
    const query = useQuery('users', getUsers);
    const queryClient = useQueryClient();

    if (isLoading) return <p>Загрузка...</p>;

    if (error) return <p>Ошибка: {error.message}</p>;
    console.log(dataUsers)
    return (
        <div>
            <ul>
                {query.data.map((data) => (
                    <li key={data.id}>
                        <p>Имя: {data.firstName} | Фамилия: {data.lastName} | Отчество: {data.patronymicName} </p>

                        <p> Логин: {data.login} | Возраст: {data.age} | Пароль:{data.password}</p>
                    </li>
                ))}
            </ul>


        </div>
    );
}