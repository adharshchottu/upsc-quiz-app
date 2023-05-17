import { DataSet } from "../data/dataset";
import seedrandom from 'seedrandom';

const Quizgenerator = (dataset: DataSet[], index: number) => {
    function shuffleArray(array: DataSet[]) {
        const seed = Math.floor(Date.now() / (10 * 60 * 1000)); // seed based on current time every 10 minutes
        const random = seedrandom(seed.toString()); // use seedrandom library for consistent random numbers

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1)); // use random number generator with seed
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    const dataSetWithIndex = dataset.map((d, i) => {
        return { ...d, index: i }
    })
        

    const shuffledDataSet = shuffleArray(dataSetWithIndex);
    const itemIndex = index;
    const generateRandomString = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const randomString = generateRandomString(6);
    const hashedOptions = shuffledDataSet[itemIndex].options.map(d => `${d}-${randomString}`)
    return { ...dataSetWithIndex[itemIndex], "randomString": randomString, "options": hashedOptions }
}

export default Quizgenerator