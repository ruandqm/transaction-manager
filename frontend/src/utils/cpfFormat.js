export default function cpfFormat(cpf) {

    const cpfString = JSON.stringify(cpf)

    const adapted = cpfString.replace(/\D/g, '');

    return adapted.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}