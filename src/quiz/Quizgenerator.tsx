import { DataSet } from "../data/dataset";

const Quizgenerator = (dataset:DataSet[]) => {
    const randomIndex = Math.floor(Math.random() * dataset.length);
    const generateRandomString = (length:number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const randomString = generateRandomString(6);
    const hashedOptions = dataset[randomIndex].options.map(d => `${d}-${randomString}`)
    return { ...dataset[randomIndex], "randomString": randomString, "options": hashedOptions}
}

export default Quizgenerator