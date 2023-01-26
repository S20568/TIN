import {Link} from "react-router-dom";
import { getModelsApiCall } from '../../apiCalls/modelApiCalls'

function ModelList() {
    const modelList = getModelsApiCall()
    return (
        <main>
            <h2>Modele</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Producent</th>
                    <th>Skala</th>
                    <th>Cena</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {modelList.map( model => (
                    <tr key={model._id}>
                        <td>{model.modelName}</td>
                        <td>{model.modelManufacturer}</td>
                        <td>{model.modelScale}</td>
                        <td>{model.modelPrice}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`details/${model._id}`} className="list-actions-button-details">Szczegóły</Link> </li>
                                <li><Link to={`edit/${model._id}`} className="list-actions-button-edit">Edytuj</Link> </li>
                                <li><Link to={`delete/${model._id}`} className="list-actions-button-delete">Usuń</Link> </li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p><Link to="/models/add" className="button-add">Dodaj nowy model</Link></p>
        </main>
    )
}

export default ModelList