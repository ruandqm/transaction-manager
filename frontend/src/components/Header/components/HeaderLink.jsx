import { useNavigate } from "react-router-dom"
export default function HeaderLink({ title, link }) {

    const navigate = useNavigate()

    return (
        <li>
            <button
                className="bg-white px-4 py-2 rounded-lg hover:scale-105 duration-200"
                onClick={() => navigate(link)}
            >
                {title}
            </button>
        </li>
    )
}