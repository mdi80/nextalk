

export default function UsernameValidator(text: string): "valid" | string {

    const regex = /^[A-Za-z0-9@.+\-_]+$/;
    if (text === "") return "valid"
    if (!regex.test(text)) {
        return "This username is not Valid!"
    }

    return "valid"

}