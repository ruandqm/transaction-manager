import HeaderLink from "./components/HeaderLink"

export default function Header() {

    return (
        <header className="bg-indigo-900 flex justify-center p-3">
            <nav className="flex">
                <ul className="flex justify-between gap-3">
                    <HeaderLink title="Pessoas" link="/" />

                    <HeaderLink title="Contas" link="/contas" />

                    <HeaderLink title="Movimentações" link="/movimentacoes" />
                </ul>
            </nav>
        </header>
    )
}